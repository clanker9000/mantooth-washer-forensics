"""Parse Windows XP Recycle Bin INFO2 files (original path, Dc index, deletion time UTC, size).

Usage: python -I info2_parse.py <folder_containing_RECYCLER> <out_csv>
"""
import csv
import struct
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def ft(v):
    try:
        return datetime.fromtimestamp((v - 116444736000000000) / 1e7, tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    except (OSError, ValueError, OverflowError):
        return ""


rows = []
for info2 in sorted(Path(sys.argv[1]).rglob("INFO2")):
    b = info2.read_bytes()
    rec_size = struct.unpack_from("<I", b, 12)[0]
    sid = info2.parent.name
    off = 20
    while off + rec_size <= len(b):
        rec = b[off:off + rec_size]
        ansi = rec[:260].split(b"\x00")[0].decode("cp1252", "replace")
        idx, drive, when, size = struct.unpack_from("<IIQI", rec, 260)
        uni = rec[280:800].decode("utf-16le", "replace").split("\x00")[0] if rec_size >= 800 else ""
        drive_letter = chr(ord("A") + drive) if drive < 26 else "?"
        rows.append([sid, f"Dc{idx}", uni or ansi, ft(when), size])
        off += rec_size

with open(sys.argv[2], "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["sid_folder", "recycled_name_prefix", "original_path", "deleted_utc", "size"])
    w.writerows(rows)
for r in rows:
    print(f"{r[0][-4:]:>5} {r[1]:5s} {r[3]}  {r[4]:>9,d}  {r[2]}")
print(f"{len(rows)} INFO2 records")
