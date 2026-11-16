"""Hash manifest generator (read-only).

Walks one or more root folders, opens every file read-only and computes
MD5, SHA-1 and SHA-256 in a single pass. Also records size and the
filesystem MAC timestamps as they were *before* the file was read.

Usage: python -I hash_manifest.py <out_csv> <root> [<root> ...]
"""
import csv
import hashlib
import os
import sys
import time
from datetime import datetime, timezone

CHUNK = 8 * 1024 * 1024


def iso(ts):
    return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def hash_file(path):
    md5, sha1, sha256 = hashlib.md5(), hashlib.sha1(), hashlib.sha256()
    with open(path, "rb") as fh:
        while True:
            buf = fh.read(CHUNK)
            if not buf:
                break
            md5.update(buf)
            sha1.update(buf)
            sha256.update(buf)
    return md5.hexdigest(), sha1.hexdigest(), sha256.hexdigest()


def main():
    out_csv = sys.argv[1]
    roots = sys.argv[2:]
    started = time.time()
    rows = 0
    total = 0
    with open(out_csv, "w", newline="", encoding="utf-8") as out:
        w = csv.writer(out)
        w.writerow(["root", "relative_path", "size_bytes", "modified_utc", "created_utc",
                    "accessed_utc", "md5", "sha1", "sha256", "hashed_at_utc"])
        for root in roots:
            for dirpath, dirnames, filenames in os.walk(root):
                dirnames.sort()
                for name in sorted(filenames):
                    full = os.path.join(dirpath, name)
                    st = os.stat(full)  # timestamps captured before content is read
                    md5, sha1, sha256 = hash_file(full)
                    w.writerow([root, os.path.relpath(full, root), st.st_size, iso(st.st_mtime),
                                iso(st.st_ctime), iso(st.st_atime), md5, sha1, sha256,
                                iso(time.time())])
                    out.flush()
                    rows += 1
                    total += st.st_size
                    print(f"{rows:4d} {st.st_size:>14,d} {sha256[:16]}  {os.path.relpath(full, root)}",
                          flush=True)
    print(f"DONE files={rows} bytes={total:,d} seconds={time.time() - started:.1f}", flush=True)


if __name__ == "__main__":
    main()
