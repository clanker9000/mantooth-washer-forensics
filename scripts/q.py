"""Query helper for the triage CSVs (MFT listings and AD1 inventories).

Usage: python -I q.py <csv> <include_regex> [--not <exclude_regex>] [--cols a,b,c] [--max N] [--files] [--deleted]
"""
import argparse
import csv
import re
import sys

csv.field_size_limit(1 << 30)
ap = argparse.ArgumentParser()
ap.add_argument("csv")
ap.add_argument("include")
ap.add_argument("--not", dest="exclude", default=None)
ap.add_argument("--cols", default=None)
ap.add_argument("--max", type=int, default=80)
ap.add_argument("--files", action="store_true")
ap.add_argument("--deleted", action="store_true")
ap.add_argument("--sort", default=None)
a = ap.parse_args()
inc = re.compile(a.include, re.I)
exc = re.compile(a.exclude, re.I) if a.exclude else None
rows = []
with open(a.csv, newline="", encoding="utf-8") as fh:
    rd = csv.DictReader(fh)
    mft = "mft_record" in rd.fieldnames and "in_use" in rd.fieldnames
    cols = a.cols.split(",") if a.cols else (
        ["mft_record", "in_use", "size", "si_created", "si_modified", "si_accessed", "path", "stream"] if mft
        else ["deleted", "size", "created_utc", "modified_utc", "accessed_utc", "path"])
    for r in rd:
        p = r["path"] + (":" + r["stream"] if mft and r.get("stream") else "")
        if not inc.search(p) or (exc and exc.search(p)):
            continue
        if a.files and (r.get("is_dir") == "Y" or r.get("type") == "dir"):
            continue
        if a.deleted and not (r.get("in_use") == "N" or r.get("deleted") == "Y"):
            continue
        rows.append(r)
if a.sort:
    rows.sort(key=lambda r: r.get(a.sort, ""))
print(f"[{len(rows)} match]")
out = sys.stdout
for r in rows[:a.max]:
    out.write(" | ".join(str(r.get(c, "")) for c in cols) + "\n")
if len(rows) > a.max:
    print(f"... {len(rows) - a.max} more")
