"""Browse specific directories and read a text file in the EXT partition.

Usage: python -I ext_browse.py <image.E01> <lba> <dir1> [dir2 ...]
"""
import stat as _stat
import sys

from dissect.evidence import EWF
from dissect.extfs import ExtFS
from dissect.util.stream import RangeStream

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
fh = EWF(sys.argv[1]).open()
ext = ExtFS(RangeStream(fh, int(sys.argv[2]) * 512, fh.size - int(sys.argv[2]) * 512))


def resolve(path):
    node = ext.root
    for part in path.strip("/").split("/"):
        if not part:
            continue
        node = node.listdir()[part]
    return node


for target in sys.argv[3:]:
    print(f"\n==== {target}")
    try:
        node = resolve(target)
    except Exception as exc:
        print("  not found:", exc)
        continue
    if node.filetype == _stat.S_IFDIR:
        for name, e in node.listdir().items():
            if name in (".", ".."):
                continue
            tag = "DIR " if e.filetype == _stat.S_IFDIR else f"{e.size:>8,}"
            print(f"   {tag}  {name}")
    else:
        data = node.open().read()
        if all(9 <= b < 127 or b in (10, 13) for b in data[:400]):
            print(data.decode("latin-1", "replace"))
        else:
            print(f"   binary {len(data)} bytes, head={data[:8].hex()}")
