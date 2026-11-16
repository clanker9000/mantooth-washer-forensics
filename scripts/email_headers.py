"""Locate files holding the case email addresses and extract message headers (From/To/Cc/Subject/Date).

Scans files already exported (read-only copies) under 03_Extracted for the given device tags.
Headers only - message bodies are not reproduced.

Usage: python -I email_headers.py <case_work_dir> <out_csv> <tag> [<tag> ...]
"""
import csv
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
CW = Path(sys.argv[1])
ADDR = re.compile(rb"(chkwasher|dollarhyde86|txkidd)@[a-z.]+", re.I)
HDR = re.compile(rb"^(From|To|Cc|Subject|Date):[ \t]*(.*(?:\r?\n[ \t]+.*)*)", re.I | re.M)

rows = []
for tag in sys.argv[3:]:
    root = CW / "03_Extracted" / tag
    for f in sorted(root.rglob("*")):
        if not f.is_file():
            continue
        try:
            data = f.read_bytes()
        except OSError:
            try:
                with open("\\\\?\\" + str(f.resolve()), "rb") as fh:
                    data = fh.read()
            except OSError as exc:
                print(f"  SKIPPED (unreadable): {f} ({exc})")
                continue
        hits = ADDR.findall(data)
        if not hits:
            continue
        rel = str(f.relative_to(CW / "03_Extracted"))
        msgs = []
        for m in re.finditer(rb"(?:^|\n)(?:Return-Path|Received|From):", data):
            block = data[m.start():m.start() + 3000]
            h = {}
            for hm in HDR.finditer(block):
                k = hm.group(1).decode().title()
                if k not in h:
                    h[k] = re.sub(rb"\s+", b" ", hm.group(2)).decode("latin-1").strip()[:120]
            if "From" in h and ("To" in h or "Subject" in h):
                key = (h.get("Date", ""), h.get("From", ""), h.get("To", ""), h.get("Subject", ""))
                if key not in msgs:
                    msgs.append(key)
        state = "deleted" if "/deleted/" in rel.replace("\\", "/") else "allocated"
        print(f"\n[{tag}] {state} {rel}  ({len(hits)} address hits, {len(msgs)} header blocks)")
        for d, fr, to, sub in msgs:
            print(f"    Date={d} | From={fr} | To={to} | Subject={sub}")
            rows.append([tag, state, rel, d, fr, to, sub])
        if not msgs:
            rows.append([tag, state, rel, "", "", "", f"(address strings only: {sorted({x.decode() for x in hits})})"])

with open(sys.argv[2], "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["device", "state", "file", "date", "from", "to", "subject"])
    w.writerows(rows)
