"""Signature carve a disk image stream, reporting files NOT already present as allocated content.

Usage: python -I carve.py <image.E01> <known_md5_csv:col> <out_dir>
"""
import csv
import hashlib
import sys
from pathlib import Path

from dissect.evidence import EWF

SIGS = [
    (b"\xff\xd8\xff", b"\xff\xd9", "jpg", 8 << 20),
    (b"\x89PNG\r\n\x1a\n", b"IEND\xaeB`\x82", "png", 8 << 20),
    (b"GIF89a", b"\x00\x3b", "gif", 4 << 20),
    (b"GIF87a", b"\x00\x3b", "gif", 4 << 20),
    (b"%PDF-", b"%%EOF", "pdf", 16 << 20),
    (b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1", None, "ole", 8 << 20),
    (b"PK\x03\x04", None, "zip", 16 << 20),
]


def load_known(spec):
    known = set()
    if not spec:
        return known
    path, col = spec.rsplit(":", 1)
    for r in csv.DictReader(open(path, newline="", encoding="utf-8")):
        if r.get(col):
            known.add(r[col])
    return known


def main():
    img, spec, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
    known = load_known(spec)
    fh = EWF(img).open()
    data = fh.read(fh.size)
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)
    n_new = n_known = 0
    rows = []
    for head, foot, ext, maxlen in SIGS:
        start = 0
        while True:
            i = data.find(head, start)
            if i < 0:
                break
            start = i + 1
            if foot:
                j = data.find(foot, i)
                blob = data[i:j + len(foot)] if 0 <= j <= i + maxlen else data[i:i + maxlen]
            else:
                blob = data[i:i + maxlen]
            md5 = hashlib.md5(blob).hexdigest()
            status = "known" if md5 in known else "NEW"
            if status == "known":
                n_known += 1
                continue
            n_new += 1
            dest = out / f"carved_{i:08x}.{ext}"
            dest.write_bytes(blob)
            rows.append([f"{i:#x}", ext, len(blob), md5, status])
            if n_new >= 400:
                break
    with open(out / "_carve_index.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["offset", "type", "bytes", "md5", "status"])
        w.writerows(rows)
    print(f"carved NEW (not in allocated set)={n_new}  matched-known={n_known}")
    from collections import Counter
    print("NEW by type:", dict(Counter(r[1] for r in rows)))


if __name__ == "__main__":
    main()
