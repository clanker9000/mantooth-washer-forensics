"""Hash e-mail attachments and match them against known device files.

Usage: python -I verify_attachments.py <case_work> <root1> [root2 ...]
"""
import csv
import email
import hashlib
import re
import sys
from email import policy
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
CW = Path(sys.argv[1])

# build md5 -> device/path index from existing analysis CSVs
index = {}
for name, pathcol, md5col, dev in [
    ("04_Analysis/disk/Thumbdrive05_files.csv", "path", "md5", "Thumbdrive 05"),
    ("04_Analysis/disk/Washer17_p0_mft.csv", "path", "md5", "Washer PC"),
    ("04_Analysis/disk/Mantooth_E01_p0_mft.csv", "path", "md5", "Mantooth USB"),
    ("04_Analysis/ad1_inventory/Mantooth34_inventory.csv", "path", "computed_md5", "Mantooth Win7"),
]:
    f = CW / name
    if not f.exists():
        continue
    for r in csv.DictReader(open(f, newline="", encoding="utf-8")):
        h = r.get(md5col, "")
        if h:
            index.setdefault(h, (dev, re.sub(r"^.*?\[root\][\\/]", "", r[pathcol])))

seen = set()
rows = []
for root in sys.argv[2:]:
    for p in sorted(Path(root).rglob("*.eml")):
        try:
            data = p.read_bytes()
        except OSError:
            continue
        try:
            m = email.message_from_bytes(data, policy=policy.default)
        except Exception:
            continue
        for part in m.walk():
            fn = part.get_filename()
            if not fn and "attachment" not in str(part.get("Content-Disposition", "")):
                continue
            try:
                payload = part.get_payload(decode=True) or b""
            except Exception:
                payload = b""
            if not payload:
                continue
            md5 = hashlib.md5(payload).hexdigest()
            if (fn, md5) in seen:
                continue
            seen.add((fn, md5))
            match = index.get(md5)
            rows.append([fn or "(unnamed)", len(payload), md5, m.get("Subject", ""),
                         re.sub(r"\s+", " ", str(m.get("From", ""))),
                         f"{match[0]}: {match[1]}" if match else "(no device match)"])

rows.sort(key=lambda r: r[5] == "(no device match)")
print(f"{len(rows)} distinct attachments\n")
for fn, sz, md5, subj, frm, match in rows:
    print(f"{fn:34.34s} {sz:>8} {md5}  {match}")
with open(CW / "04_Analysis" / "email" / "attachments_matched.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["filename", "size", "md5", "email_subject", "email_from", "device_match"])
    w.writerows(rows)
