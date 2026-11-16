"""Item-level verification and full file inventory for AD1 logical images.

For every entry: path, type, size, timestamps, flags, the MD5/SHA-1 FTK Imager stored at
acquisition, and the MD5/SHA-1 recomputed now from the decompressed content.

Usage: python -I ad1_inventory.py <out_dir> <image.ad1> [<image.ad1> ...]
"""
import csv
import hashlib
import sys
import time
from multiprocessing import Pool
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ad1lib import AD1Image, parse_ts  # noqa: E402


def txt(m, key):
    return m.get(key, b"").decode("utf-8", "replace")


def ts(m, key):
    d = parse_ts(m.get(key))
    return d.strftime("%Y-%m-%d %H:%M:%S") if d else ""


def run(args):
    out_dir, image = args
    image = Path(image)
    started = time.time()
    img = AD1Image(image)
    out_csv = Path(out_dir) / (image.stem.replace(" ", "_") + "_inventory.csv")
    stats = dict(image=image.name, version=img.version, segments=len(img.paths), files=0, dirs=0, deleted=0,
                 bytes=0, md5_ok=0, md5_bad=0, sha1_ok=0, sha1_bad=0, no_hash=0, errors=0)
    with open(out_csv, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["path", "type", "deleted", "size", "created_utc", "modified_utc", "accessed_utc",
                    "mft_changed_utc", "mft_record", "owner", "encrypted", "hidden", "actual_file",
                    "stored_md5", "computed_md5", "stored_sha1", "computed_sha1", "verify", "header_hex"])
        for path, e in img.walk():
            m = img.meta(e)
            base = [path, "dir" if e.is_dir else "file", "Y" if e.is_deleted else "", e.size,
                    ts(m, 0x8), ts(m, 0x9), ts(m, 0x7), ts(m, 0xa002), txt(m, 0xa001), txt(m, 0xa008),
                    txt(m, 0xd), txt(m, 0x1002), txt(m, 0x1e)]
            if e.is_dir:
                stats["dirs"] += 1
                w.writerow(base + ["", "", "", "", "", ""])
                continue
            stats["files"] += 1
            stats["deleted"] += e.is_deleted
            smd5, ssha1 = txt(m, 0x5001).lower(), txt(m, 0x5002).lower()
            md5, sha1 = hashlib.md5(), hashlib.sha1()
            head = b""
            got = 0
            try:
                for c in img.chunks(e):
                    if not head:
                        head = c[:16]
                    md5.update(c)
                    sha1.update(c)
                    got += len(c)
                cmd5, csha1 = md5.hexdigest(), sha1.hexdigest()
                if not smd5 and not ssha1:
                    verdict = "NO_STORED_HASH"
                    stats["no_hash"] += 1
                else:
                    ok_md5 = (not smd5) or smd5 == cmd5
                    ok_sha1 = (not ssha1) or ssha1 == csha1
                    stats["md5_ok" if ok_md5 else "md5_bad"] += 1
                    stats["sha1_ok" if ok_sha1 else "sha1_bad"] += 1
                    verdict = "OK" if (ok_md5 and ok_sha1 and got == e.size) else "MISMATCH"
            except Exception as exc:  # noqa: BLE001
                cmd5 = csha1 = ""
                verdict = f"ERROR {type(exc).__name__}"
                stats["errors"] += 1
            stats["bytes"] += got
            w.writerow(base + [smd5, cmd5, ssha1, csha1, verdict, head.hex()])
    stats["seconds"] = round(time.time() - started, 1)
    return stats


if __name__ == "__main__":
    out_dir = sys.argv[1]
    jobs = [(out_dir, p) for p in sys.argv[2:]]
    with Pool(min(4, len(jobs))) as pool:
        results = []
        for s in pool.imap_unordered(run, jobs):
            print(s, flush=True)
            results.append(s)
    with open(Path(out_dir) / "ad1_item_verification_summary.csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(results[0].keys()))
        w.writeheader()
        w.writerows(sorted(results, key=lambda r: r["image"]))
