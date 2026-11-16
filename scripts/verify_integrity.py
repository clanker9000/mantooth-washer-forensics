"""Integrity verification (read-only, runs against working copies).

1. originals manifest vs working-copy manifest (MD5 + SHA-1 + SHA-256 must all match)
2. E01: recompute MD5/SHA-1 of the acquired media stream and compare with the
   values recorded in the FTK Imager acquisition log (.txt sidecar)
3. AD1: try to reproduce the logged logical-image hash from the AD1 data stream

Usage: python -I verify_integrity.py <originals_csv> <working_csv> <working_root> <out_csv>
"""
import csv
import hashlib
import re
import sys
from pathlib import Path

from dissect.evidence import AD1, EWF
from dissect.evidence.ad1.ad1 import find_files as ad1_segments

CHUNK = 4 * 1024 * 1024


def load(path):
    with open(path, newline="", encoding="utf-8") as fh:
        return {(Path(r["root"]).name, r["relative_path"]): r for r in csv.DictReader(fh)}


def logged_hashes(image):
    for cand in (Path(str(image) + ".txt"), image.with_suffix(".txt")):
        if cand.exists():
            text = cand.read_text(errors="replace")
            md5 = re.search(r"MD5 checksum:\s+([0-9a-f]{32})", text)
            sha1 = re.search(r"SHA1 checksum:\s+([0-9a-f]{40})", text)
            return cand.name, md5.group(1) if md5 else None, sha1.group(1) if sha1 else None
    return None, None, None


def hash_stream(stream, size):
    md5, sha1 = hashlib.md5(), hashlib.sha1()
    stream.seek(0)
    left = size
    while left > 0:
        buf = stream.read(min(CHUNK, left))
        if not buf:
            break
        md5.update(buf)
        sha1.update(buf)
        left -= len(buf)
    return md5.hexdigest(), sha1.hexdigest(), size - left


def main():
    originals, working = load(sys.argv[1]), load(sys.argv[2])
    root, out_csv = Path(sys.argv[3]), sys.argv[4]

    print("== 1. Originals vs working copies ==")
    bad = 0
    for key, o in originals.items():
        w = working.get(key)
        if not w or any(o[h] != w[h] for h in ("md5", "sha1", "sha256")) or o["size_bytes"] != w["size_bytes"]:
            bad += 1
            print("  MISMATCH", key)
    extra = set(working) - set(originals)
    print(f"  files compared={len(originals)} mismatches={bad} extra_in_copy={len(extra)}")

    rows = []
    print("== 2. E01 media hash vs acquisition log ==")
    for image in sorted(root.rglob("*.E01")):
        log, lmd5, lsha1 = logged_hashes(image)
        ewf = EWF(image)
        stream = ewf.open()
        md5, sha1, n = hash_stream(stream, stream.size)
        ok = (md5 == lmd5) and (sha1 == lsha1)
        rows.append([str(image.relative_to(root)), "E01 media stream", n, md5, sha1, lmd5, lsha1, log,
                     "VERIFIED" if ok else "MISMATCH"])
        print(f"  {'VERIFIED' if ok else 'MISMATCH'}  {image.relative_to(root)}  bytes={n:,d}  md5={md5}")

    print("== 3. AD1 logical image hash vs acquisition log ==")
    for image in sorted(root.rglob("*.ad1")):
        log, lmd5, lsha1 = logged_hashes(image)
        try:
            ad1 = AD1(ad1_segments(image))
            md5, sha1, n = hash_stream(ad1.stream, ad1.size)
            ok = (md5 == lmd5) and (sha1 == lsha1)
            status = "VERIFIED" if ok else "NOT REPRODUCED"
        except Exception as exc:  # noqa: BLE001
            md5 = sha1 = ""
            n = 0
            status = f"ERROR {type(exc).__name__}: {exc}"
        rows.append([str(image.relative_to(root)), "AD1 data stream (segments minus 512-byte headers)", n, md5, sha1,
                     lmd5, lsha1, log, status])
        print(f"  {status}  {image.relative_to(root)}  bytes={n:,d}  md5={md5}  logged={lmd5}")

    with open(out_csv, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["image", "what_was_hashed", "bytes_hashed", "computed_md5", "computed_sha1", "logged_md5",
                    "logged_sha1", "log_file", "result"])
        w.writerows(rows)


if __name__ == "__main__":
    main()
