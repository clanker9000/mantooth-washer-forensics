"""Find identical files (by MD5) that exist on more than one device in the Mantooth/Washer case.

Excludes empty files and files that only ever appear in OS/program paths.
Writes 04_Analysis/cross_device_matches.csv
"""
import csv
import re
import sys
from collections import defaultdict
from pathlib import Path

csv.field_size_limit(1 << 30)
A = Path(sys.argv[1])  # 04_Analysis
SYS = re.compile(r"(^|[\\/])(WINDOWS|Windows|Program Files[^\\/]*|ProgramData|\$Extend|System Volume Information|"
                 r"AppData[\\/]Local[\\/]Microsoft|\$MFT|\$LogFile|\$Secure|\$UpCase|\$Bitmap|\$Boot|\$AttrDef)", re.I)

sources = {
    "Thumbdrive05": (A / "disk/Thumbdrive05_files.csv", "path", "md5", "size", None),
    "Washer17": (A / "disk/Washer17_p0_mft.csv", "path", "md5", "size", "in_use"),
    "Mantooth_E01": (A / "disk/Mantooth_E01_p0_mft.csv", "path", "md5", "size", "in_use"),
    "Mantooth34_Win7": (A / "ad1_inventory/Mantooth34_inventory.csv", "path", "computed_md5", "size", "deleted"),
}
seen = defaultdict(list)
for dev, (p, pc, hc, sc, delc) in sources.items():
    with open(p, newline="", encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            h = r.get(hc, "")
            if not h or r.get(sc, "0") in ("", "0") or r.get("stream"):
                continue
            state = "live"
            if delc == "in_use" and r[delc] == "N":
                state = "DELETED"
            if delc == "deleted" and r[delc] == "Y":
                state = "DELETED"
            path = r[pc]
            path = re.sub(r"^.*?\[root\][\\/]", "", path)
            seen[h].append((dev, state, path, r[sc]))

rows = []
for h, occ in seen.items():
    devs = {o[0] for o in occ}
    if len(devs) < 2:
        continue
    if all(SYS.search(o[2]) for o in occ):
        continue
    for o in occ:
        rows.append([h, len(devs), *o])
rows.sort(key=lambda r: (-r[1], r[0], r[2]))
out = A / "cross_device_matches.csv"
with open(out, "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["md5", "device_count", "device", "state", "path", "size"])
    w.writerows(rows)
groups = defaultdict(list)
for r in rows:
    groups[r[0]].append(r)
print(f"{len(groups)} distinct files shared across devices -> {out}")
for h, g in sorted(groups.items(), key=lambda kv: (-kv[1][0][1], kv[1][0][4])):
    print(f"\nMD5 {h}  size={g[0][5]}  on {g[0][1]} devices")
    for r in g:
        print(f"   {r[2]:16s} {r[3]:7s} {r[4]}")
