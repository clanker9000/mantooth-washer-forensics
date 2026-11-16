"""List a FAT volume (allocated entries via dissect.fat) and count deleted (0xE5) directory entries.

Usage: python -I fat_list.py <image.E01>
"""
import struct
import sys

from dissect.evidence import EWF
from dissect.fat import FATFS

fh = EWF(sys.argv[1]).open()
fh.seek(0)
s0 = fh.read(512)
serial = struct.unpack_from("<I", s0, 67)[0]
print(f"FAT volume serial={serial:08X} label={s0[71:82]!r} size={fh.size:,d}")
fs = FATFS(fh)


def walk(d, depth=0):
    for e in d.iterdir():
        if e.name in (".", ".."):
            continue
        kind = "DIR " if e.is_directory() else "FILE"
        print(f"  {'  ' * depth}{kind} {e.size:>10,d}  c={e.ctime}  m={e.mtime}  {e.path}")
        if e.is_directory():
            walk(e, depth + 1)


walk(fs.root)
