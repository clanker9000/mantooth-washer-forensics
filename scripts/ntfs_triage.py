"""NTFS triage: full MFT listing (allocated + deleted), ADS detection, recovery and hashing.

Reads the image read-only. Every base MFT record becomes one CSV row per data stream.
File content is exported under <extract_dir>/{allocated,deleted}/ so originals are never touched.

Usage: python -I ntfs_triage.py <image> <tag> <csv_dir> <extract_dir> [--no-extract-over MB]
"""
import csv
import hashlib
import re
import struct
import sys
from pathlib import Path

from dissect.evidence import EWF
from dissect.hypervisor.disk.vhd import VHD
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream

SAFE = re.compile(r'[<>:"|?*\x00-\x1f]')
MAX_EXTRACT = 1024 * 1024 * 1024


def open_image(path):
    path = Path(path)
    if path.suffix.lower() == ".e01":
        return EWF(path).open()
    if path.suffix.lower() == ".vhd":
        return VHD(path.open("rb"))
    return path.open("rb")


def ntfs_volumes(fh):
    """Yield (label, offset, size) for every NTFS volume in the image."""
    fh.seek(0)
    s0 = fh.read(512)
    if s0[3:11] == b"NTFS    ":
        yield "vol", 0, fh.size
        return
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]
        lba, count = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                yield f"p{i}", lba * 512, count * 512


def fmt(dt):
    try:
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except Exception:  # noqa: BLE001
        return ""


def first(coll):
    for a in coll:
        return a
    return None


def main():
    image, tag, csv_dir, extract_dir = sys.argv[1:5]
    fh = open_image(image)
    for label, off, size in ntfs_volumes(fh):
        vol = RangeStream(fh, off, size)
        ntfs = NTFS(vol)
        out_csv = Path(csv_dir) / f"{tag}_{label}_mft.csv"
        ex_root = Path(extract_dir) / tag / label
        n = dict(records=0, in_use=0, deleted=0, dirs=0, ads=0, extracted=0, errors=0)
        print(f"== {tag} {label}: offset={off} size={size:,d} cluster={ntfs.cluster_size} "
              f"serial={ntfs.serial:#x} name={ntfs.volume_name!r}", flush=True)
        with open(out_csv, "w", newline="", encoding="utf-8") as out:
            w = csv.writer(out)
            w.writerow(["mft_record", "sequence", "in_use", "is_dir", "path", "stream", "size", "resident",
                        "si_created", "si_modified", "si_mft_changed", "si_accessed",
                        "fn_created", "fn_modified", "fn_mft_changed", "fn_accessed",
                        "si_attr_flags", "encrypted", "compressed", "md5", "sha1", "sha256", "header_hex",
                        "extracted_to", "note"])
            for rec in ntfs.mft.segments():
                try:
                    hdr = rec.header
                    base = hdr.BaseFileRecordSegment
                    if base.SegmentNumberLowPart or base.SegmentNumberHighPart:
                        continue  # extension record, handled via its base record
                    n["records"] += 1
                    in_use = bool(hdr.Flags & 0x1)
                    is_dir = bool(hdr.Flags & 0x2)
                    n["in_use" if in_use else "deleted"] += 1
                    n["dirs"] += is_dir
                    try:
                        path = rec.full_path(ignore_dos=True) or rec.full_path() or ""
                    except Exception:  # noqa: BLE001
                        path = ""
                    if not path:
                        try:
                            path = "<orphan>\\" + (rec.filename or "")
                        except Exception:  # noqa: BLE001
                            path = "<unnamed>"
                    si = first(rec.attributes[ATTRIBUTE_TYPE_CODE.STANDARD_INFORMATION])
                    fn = None
                    for a in rec.attributes[ATTRIBUTE_TYPE_CODE.FILE_NAME]:
                        if fn is None or a.flags != 2:
                            fn = a
                    si_flags = si.file_attributes if si else 0
                    times = [fmt(si.creation_time), fmt(si.last_modification_time), fmt(si.last_change_time),
                             fmt(si.last_access_time)] if si else ["", "", "", ""]
                    times += [fmt(fn.creation_time), fmt(fn.last_modification_time), fmt(fn.last_change_time),
                              fmt(fn.last_access_time)] if fn else ["", "", "", ""]
                    common = [rec.segment, hdr.SequenceNumber, "Y" if in_use else "N", "Y" if is_dir else ""]
                    streams = sorted({a.name for a in rec.attributes[ATTRIBUTE_TYPE_CODE.DATA]})
                    if is_dir and not streams:
                        w.writerow(common + [path, "", "", ""] + times + [f"{si_flags:#x}", "", "", "", "", "", "",
                                                                         "", ""])
                        continue
                    if not streams:
                        streams = [None]
                    for s in streams:
                        row_note = []
                        md5 = sha1 = sha256 = head = dest_rel = ""
                        size_s = resident = enc = comp = ""
                        if s is not None:
                            attrs = rec.attributes.find(s, ATTRIBUTE_TYPE_CODE.DATA)
                            a0 = first(attrs)
                            flags = a0.header.flags
                            enc = "Y" if flags & 0x4000 else ""
                            comp = "Y" if flags & 0x0001 else ""
                            resident = "Y" if a0.header.resident else ""
                            size_s = rec.size(s)
                            if s:
                                n["ads"] += 1
                                row_note.append("ALTERNATE DATA STREAM")
                            name = Path(path.replace("\\", "/")).name
                            skip = name.startswith("$Bad") or size_s > MAX_EXTRACT
                            if size_s and not skip:
                                try:
                                    data = rec.open(s).read()
                                    md5 = hashlib.md5(data).hexdigest()
                                    sha1 = hashlib.sha1(data).hexdigest()
                                    sha256 = hashlib.sha256(data).hexdigest()
                                    head = data[:16].hex()
                                    rel = SAFE.sub("_", path.replace("\\", "/")).lstrip("/")
                                    if not in_use:
                                        p = Path(rel)
                                        rel = str(p.with_name(f"mft{rec.segment}_{p.name}"))
                                    if s:
                                        rel += f"__ADS__{SAFE.sub('_', s)}"
                                    dest = ex_root / ("allocated" if in_use else "deleted") / rel
                                    dest.parent.mkdir(parents=True, exist_ok=True)
                                    dest.write_bytes(data)
                                    dest_rel = str(dest.relative_to(Path(extract_dir)))
                                    n["extracted"] += 1
                                except Exception as exc:  # noqa: BLE001
                                    row_note.append(f"read error {type(exc).__name__}: {exc}")
                                    n["errors"] += 1
                            elif skip:
                                row_note.append("not extracted (size cap / sparse metafile)")
                        if not in_use:
                            row_note.append("DELETED RECORD - content only valid if clusters not reused")
                        w.writerow(common + [path, s or "", size_s, resident] + times +
                                   [f"{si_flags:#x}", enc, comp, md5, sha1, sha256, head, dest_rel,
                                    "; ".join(row_note)])
                except Exception as exc:  # noqa: BLE001
                    n["errors"] += 1
                    w.writerow([getattr(rec, "segment", "?")] + [""] * 23 + [f"record error {type(exc).__name__}: {exc}"])
        print("  ", n, flush=True)


if __name__ == "__main__":
    main()
