"""Fact checks for the report: link counts per device pair, EFS twin headers, keyword hit context."""
import csv
import re
import sys
from collections import defaultdict
from pathlib import Path

from dissect.evidence import EWF

csv.field_size_limit(1 << 30)
A = Path(sys.argv[1]) / "04_Analysis"
EV = Path(sys.argv[1]) / "02_WorkingCopies" / "Evidence Files"
NOISE = re.compile(r"Temporary Internet Files|desktop\.ini$|Cookies|index\.dat$|NTUSER|UsrClass|\.lnk$|Thumbs\.db$|AppData|Application Data", re.I)

# 1. distinct meaningful files per device pair
groups = defaultdict(set)
paths = defaultdict(list)
with open(A / "cross_device_matches.csv", newline="", encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        if NOISE.search(r["path"]):
            continue
        groups[r["md5"]].add(r["device"])
        paths[r["md5"]].append((r["device"], r["state"], r["path"]))
pairs = defaultdict(list)
for h, devs in groups.items():
    devs = sorted(devs)
    for i in range(len(devs)):
        for j in range(i + 1, len(devs)):
            pairs[(devs[i], devs[j])].append(h)
print("== distinct shared user files per device pair ==")
for k, v in sorted(pairs.items()):
    print(f"  {k[0]:16s} <-> {k[1]:16s} {len(v)}")
print("\n== Washer <-> Mantooth34 files ==")
for h in pairs.get(("Mantooth34_Win7", "Washer17"), []):
    for d, s, p in paths[h]:
        if d == "Mantooth34_Win7":
            print("  ", h, p)

# 2. EFS twin headers on the Mantooth PC
print("\n== headers of the Washer EFS-file twins in Mantooth34 ==")
with open(A / "ad1_inventory" / "Mantooth34_inventory.csv", newline="", encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        if re.search(r"(The Dealz|X marks the spot)\.doc$", r["path"]):
            print("  ", r["computed_md5"], r["header_hex"], r["size"], re.sub(r"^.*?\[root\]/", "", r["path"]))

# 3. keyword context on the Washer image
print("\n== keyword context (Washer 17 raw stream) ==")
img = EWF(EV / "BootCamp" / "Evidence Files" / "Washer 17.E01").open()
hits = {}
with open(A / "keyword_hits.csv", newline="", encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        if r["image"] in ("Washer 17.E01", "Mantooth.E01") and r["term"] in ("chkwasher", "dollarhyde86", "txkidd", "rasco", "badguy"):
            hits[(r["image"], r["term"])] = [int(x.split("@")[1]) for x in r["first_offsets"].split("; ") if x]
streams = {"Washer 17.E01": img, "Mantooth.E01": EWF(EV / "BootCamp" / "Evidence Files" / "Mantooth.E01").open()}
for (im, term), offs in sorted(hits.items()):
    s = streams[im]
    for o in offs[:3]:
        s.seek(max(0, o - 50))
        b = s.read(130)
        txt = bytes(c if 32 <= c < 127 else 46 for c in b).decode()
        print(f"  {im:14s} {term:13s} @{o:<11d} {txt}")
