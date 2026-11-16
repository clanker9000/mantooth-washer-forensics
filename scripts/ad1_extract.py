"""Export files from an AD1 image whose path matches a regex, verifying each against its stored MD5.

Usage: python -I ad1_extract.py <image.ad1> <out_dir> <path_regex>
"""
import hashlib
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ad1lib import AD1Image  # noqa: E402

img = AD1Image(sys.argv[1])
out = Path(sys.argv[2])
rx = re.compile(sys.argv[3], re.I)
SAFE = re.compile(r'[<>:"|?*\x00-\x1f]')
n = 0
for path, e in img.walk():
    if e.is_dir or not rx.search(path):
        continue
    clean = re.sub(r"^.*?\[root\]/", "", path)
    data = img.data(e)
    stored = img.meta(e).get(0x5001, b"").decode("ascii", "replace").lower()
    md5 = hashlib.md5(data).hexdigest()
    dest = out / SAFE.sub("_", clean)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    n += 1
    print(f"{'OK ' if md5 == stored else 'BAD'} {md5} {len(data):>10,d}  {clean}")
print(f"{n} files exported to {out}")
