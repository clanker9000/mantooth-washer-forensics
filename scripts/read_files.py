"""Read specific files (by path or MFT segment) from an NTFS E01, print text / hex, note EFS.

Usage: python -I read_files.py <image.E01> [path_or_#segment ...]
"""
import struct
import sys

from dissect.evidence import EWF
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
fh = EWF(sys.argv[1]).open()
fh.seek(0)
s0 = fh.read(512)
if s0[3:11] == b"NTFS    ":
    ntfs = NTFS(fh)
else:
    ntfs = None
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]
        lba, cnt = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                ntfs = NTFS(RangeStream(fh, lba * 512, cnt * 512))
                break
    if ntfs is None:
        raise SystemExit("no NTFS volume found")

for target in sys.argv[2:]:
    try:
        rec = ntfs.mft.get(int(target[1:])) if target.startswith("#") else ntfs.mft.get(target)
    except Exception as exc:  # noqa: BLE001
        print(f"\n### {target}: NOT FOUND ({exc})")
        continue
    try:
        path = rec.full_path()
    except Exception:
        path = target
    si = next(iter(rec.attributes[ATTRIBUTE_TYPE_CODE.STANDARD_INFORMATION]), None)
    flags = si.file_attributes if si else 0
    efs = " [EFS-ENCRYPTED]" if flags & 0x4000 else ""
    streams = sorted({a.name for a in rec.attributes[ATTRIBUTE_TYPE_CODE.DATA]})
    print(f"\n{'=' * 80}\n{path}  (seg {rec.segment}, in_use={bool(rec.header.Flags & 1)}){efs}")
    for s in streams:
        try:
            data = rec.open(s).read()
        except Exception as exc:  # noqa: BLE001
            print(f"  :{s or '(default)'} read error {exc}")
            continue
        printable = sum(1 for b in data[:400] if 9 <= b < 127) / max(1, len(data[:400]))
        label = s or "(default)"
        if data[:3] == b"\xff\xd8\xff":
            kind = "JPEG"
        elif data[:4] == b"PK\x03\x04":
            kind = "ZIP"
        elif data[:4] == b"\xd0\xcf\x11\xe0":
            kind = "OLE(doc/xls)"
        elif printable > 0.85:
            kind = "text"
        else:
            kind = "binary"
        print(f"  :{label} ({len(data)} bytes, {kind})")
        if kind == "text":
            print("    ----")
            for line in data.decode("latin-1", "replace").splitlines():
                print("    " + line)
            print("    ----")
        elif kind == "OLE(doc/xls)":
            import re
            t = b"".join(re.findall(rb"(?:[\x20-\x7e]\x00){4,}", data)).decode("utf-16le", "replace")
            t += " " + " ".join(x.decode("latin-1") for x in re.findall(rb"[\x20-\x7e]{6,}", data))
            print("    text preview:", re.sub(r"\s+", " ", t)[:500])
