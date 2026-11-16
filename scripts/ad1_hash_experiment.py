"""Work out what FTK Imager's AD1 'image hash' is computed over, and sanity-check the reader.

Usage: python -I ad1_hash_experiment.py <image.ad1> <logged_md5>
"""
import hashlib
import struct
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ad1lib import AD1Image  # noqa: E402

img = AD1Image(sys.argv[1])
logged = sys.argv[2].lower()
print(f"version={img.version} segments={len(img.paths)} stream_size={img.size:,d} chunk={img.chunk_size} "
      f"first_file={img.first_file_offset} metadata_off={img.metadata_offset} name={img.name!r}")

files = dirs = deleted = 0
perfile_ok = perfile_bad = perfile_none = 0
h_concat = hashlib.md5()
n_shown = 0
last_end = 0
for path, e in img.walk():
    if e.is_dir:
        dirs += 1
        continue
    files += 1
    deleted += e.is_deleted
    m = img.meta(e)
    h = hashlib.md5()
    got = 0
    for c in img.chunks(e):
        h.update(c)
        h_concat.update(c)
        got += len(c)
    stored = m.get(0x5001, b"").decode("ascii", "replace").lower()
    if not stored:
        perfile_none += 1
    elif stored == h.hexdigest() and got == e.size:
        perfile_ok += 1
    else:
        perfile_bad += 1
        if n_shown < 5:
            n_shown += 1
            print("  per-file mismatch:", path, e.size, got, stored, h.hexdigest())
    last_end = max(last_end, e.meta_off)

print(f"entries: files={files} dirs={dirs} deleted_flagged={deleted}")
print(f"per-file stored MD5: match={perfile_ok} mismatch={perfile_bad} no_stored_hash={perfile_none}")


def md5_range(a, b):
    h = hashlib.md5()
    step = 8 << 20
    while a < b:
        n = min(step, b - a)
        h.update(img.read(a, n))
        a += n
    return h.hexdigest()


cands = {
    "concatenated decompressed file data": h_concat.hexdigest(),
    "whole stream": md5_range(0, img.size),
    "stream from first_file_offset": md5_range(img.first_file_offset, img.size),
}
for trim in (352, 512):
    cands[f"stream minus last {trim}"] = md5_range(0, img.size - trim)
for name, val in cands.items():
    print(f"  {'MATCH ' if val == logged else 'no    '} {name}: {val}")
tail = img.read(max(0, img.size - 600), 600)
print("tail ascii:", bytes(c if 32 <= c < 127 else 46 for c in tail).decode())
i = tail.find(logged.encode())
print("logged md5 present in tail as ascii:", i >= 0)
