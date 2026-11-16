"""Parse and extract a Linux EXT2/3/4 partition from a disk image (read-only).

Usage: python -I ext_extract.py <image.E01> <part_start_lba> <out_dir>
"""
import hashlib
import sys
from pathlib import Path

from dissect.evidence import EWF
from dissect.extfs import ExtFS
from dissect.util.stream import RangeStream

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

image, lba, out = sys.argv[1], int(sys.argv[2]), Path(sys.argv[3])
out.mkdir(parents=True, exist_ok=True)
fh = EWF(image).open()
vol = RangeStream(fh, lba * 512, fh.size - lba * 512)
ext = ExtFS(vol)
print(f"EXT filesystem: block_size={ext.block_size} volume_name={getattr(ext, 'volume_name', '?')!r}")


import stat as _stat


def walk(inode, path=""):
    for name, entry in inode.listdir().items():
        if name in (".", ".."):
            continue
        p = f"{path}/{name}"
        is_dir = entry.filetype == _stat.S_IFDIR
        if is_dir:
            print(f"  [DIR]  {p}")
            try:
                walk(entry, p)
            except Exception as exc:
                print(f"         (walk error {exc})")
        else:
            try:
                data = entry.open().read()
                md5 = hashlib.md5(data).hexdigest()
                dest = out / p.lstrip("/")
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(data)
                head = data[:3]
                kind = ("text" if all(9 <= b < 127 or b in (10, 13) for b in data[:200]) else
                        "JPEG" if head == b"\xff\xd8\xff" else "HTML" if b"<HTML" in data[:200].upper() else "bin")
                print(f"  {len(data):>9,}  {md5}  {kind:5}  {p}")
                if kind == "text" and len(data) < 3000:
                    print("        >>> " + data.decode("latin-1", "replace").strip().replace("\r", " ").replace("\n", " | ")[:300])
            except Exception as exc:
                print(f"  (read error {p}: {exc})")


walk(ext.root)
print("\nExtracted to:", out)
