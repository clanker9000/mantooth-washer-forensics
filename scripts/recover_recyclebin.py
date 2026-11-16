"""Parse Recycle Bin $I metadata (original name, size, deletion time) and identify $R content.

Usage: python -I recover_recyclebin.py <image.E01>
"""
import struct
import sys
from datetime import datetime, timezone
from pathlib import Path

from dissect.evidence import EWF
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else None


def open_vol(image):
    fh = EWF(image).open()
    fh.seek(0)
    s0 = fh.read(512)
    if s0[3:11] == b"NTFS    ":
        return NTFS(fh)
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]
        lba, cnt = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                return NTFS(RangeStream(fh, lba * 512, cnt * 512))
    raise RuntimeError("no NTFS")


def ft(v):
    try:
        return datetime.fromtimestamp((v - 116444736000000000) / 1e7, tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return ""


def kind(data):
    if data[:2] == b"MZ":
        # PE: find subsystem / look for common strings
        return "PE executable"
    if data[:4] == b"PK\x03\x04":
        return "ZIP"
    if data[:4] == b"\xd0\xcf\x11\xe0":
        return "OLE"
    if data[:3] == b"\xff\xd8\xff":
        return "JPEG"
    return data[:4].hex()


ntfs = open_vol(sys.argv[1])
# walk all $Recycle.Bin entries
for rec in ntfs.mft.segments():
    try:
        if not (rec.header.Flags & 1):
            continue
        path = rec.full_path() or ""
    except Exception:
        continue
    name = Path(path.replace("\\", "/")).name
    if "$Recycle.Bin" not in path:
        continue
    if name.startswith("$I"):
        try:
            data = rec.open().read()
            size = struct.unpack_from("<Q", data, 8)[0]
            deleted = ft(struct.unpack_from("<Q", data, 16)[0])
            # Vista: name at 24 (UTF-16, null-term). Win10: has 4-byte version+namelen at 24, name at 28
            ver = struct.unpack_from("<I", data, 0)[0]
            off = 28 if ver >= 2 else 24
            orig = data[off:].split(b"\x00\x00")[0].decode("utf-16le", "replace").rstrip("\x00")
            print(f"{name}  original={orig!r}  size={size:,}  deleted={deleted}")
        except Exception as exc:
            print(f"{name}: $I parse error {exc}")
    elif name.startswith("$R"):
        try:
            data = rec.open().read()
            k = kind(data)
            extra = ""
            if data[:2] == b"MZ":
                # pull printable product/company strings from the PE
                import re
                strings = re.findall(rb"[\x20-\x7e]{6,}", data)
                interesting = [s.decode() for s in strings if re.search(
                    rb"CameraShy|camoufl|stegan|trojan|keylog|\.exe|Product|Company|Copyright|Original", s, re.I)]
                extra = " | ".join(dict.fromkeys(interesting[:6]))
            print(f"{name}  {k}  {len(data):,} bytes  {extra}")
            if OUT:
                (OUT / name).write_bytes(data)
        except Exception as exc:
            print(f"{name}: $R read error {exc}")
