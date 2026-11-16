"""Locate and parse shellbags (BagMRU) from a registry hive; print folder-access paths.

Usage: python -I shellbag_parse.py <hive>
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from reglib import key, open_hive, subkeys, values  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
H = open_hive(sys.argv[1])

CANDIDATES = [
    "Software\\Microsoft\\Windows\\Shell\\BagMRU",
    "Software\\Microsoft\\Windows\\ShellNoRoam\\BagMRU",
    "Local Settings\\Software\\Microsoft\\Windows\\Shell\\BagMRU",
    "Local Settings\\Software\\Microsoft\\Windows\\Shellbags\\BagMRU",
    "Wow6432Node\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\BagMRU",
]

root = None
for c in CANDIDATES:
    k = key(H, c)
    if k:
        root = (c, k)
        break

if not root:
    # fall back: check whether a Shell subtree exists at all
    for base in ("Software\\Microsoft\\Windows\\Shell", "Software\\Microsoft\\Windows\\ShellNoRoam",
                 "Local Settings\\Software\\Microsoft\\Windows\\Shell"):
        k = key(H, base)
        if k:
            print(f"{base} exists; subkeys: {[s.name for s in subkeys(k)]}")
    print("No BagMRU shellbag key found in this hive.")
    sys.exit(0)

print(f"BagMRU found at: {root[0]}\n")


def parse_item(blob):
    """Best-effort shell-item name extraction (UTF-16 or ANSI run)."""
    import re
    # try embedded UTF-16LE name
    m = re.findall(rb"(?:[\x20-\x7e]\x00){3,}", blob)
    names = [x.decode("utf-16le", "replace") for x in m]
    # try ANSI
    a = re.findall(rb"[\x20-\x7e]{4,}", blob)
    names += [x.decode("latin-1") for x in a]
    # pick the most path-like / longest printable
    names = [n.strip("\x00 ") for n in names if n.strip("\x00 ")]
    return names[0] if names else ""


def walk(k, prefix=""):
    vv = values(k)
    items = {}
    for n, v in vv.items():
        if n.isdigit() and isinstance(v, (bytes, bytearray)):
            items[n] = parse_item(v)
    for n, name in items.items():
        full = f"{prefix}\\{name}" if name else prefix
        print(f"   {full}")
        sub = key(H, None) if False else None
        child = None
        for s in subkeys(k):
            if s.name == n:
                child = s
                break
        if child:
            walk(child, full)


walk(root[1], "")
