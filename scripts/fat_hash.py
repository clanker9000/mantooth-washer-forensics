"""Hash every allocated file on a FAT volume inside an E01 (read-only).

Usage: python -I fat_hash.py <image.E01> <out_csv>
"""
import csv
import hashlib
import sys

from dissect.evidence import EWF
from dissect.fat import FATFS

fs = FATFS(EWF(sys.argv[1]).open())
rows = []


def walk(d):
    for e in d.iterdir():
        if e.name in (".", "..") or e.is_volume_id():
            continue
        if e.is_directory():
            walk(e)
            continue
        data = e.open().read()
        rows.append([e.path, e.size, str(e.ctime), str(e.mtime), str(e.atime),
                     hashlib.md5(data).hexdigest(), hashlib.sha256(data).hexdigest()])


walk(fs.root)
with open(sys.argv[2], "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["path", "size", "created_local", "modified_local", "accessed_local", "md5", "sha256"])
    w.writerows(rows)
print(f"{len(rows)} files hashed")
