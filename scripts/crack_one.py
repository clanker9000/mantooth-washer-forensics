"""Focused NTLM attack on a single hash: wordlist x rules.

Usage: python -I crack_one.py <target_ntlm> <wordlist> [<wordlist> ...]
"""
import sys
from pathlib import Path

from Crypto.Hash import MD4

target = sys.argv[1].lower()
LEET = str.maketrans({"a": "@", "e": "3", "i": "1", "o": "0", "s": "$"})
SUF = ["", "1", "2", "3", "12", "123", "1234", "!", "!!", "123!", "2007", "2008", "06", "07", "86", "69", "007", "00", "01", "99", "7", "$"]
PRE = ["", "1", "!"]


def ntlm(s):
    return MD4.new(s.encode("utf-16le")).hexdigest()


def forms(w):
    bases = {w, w.lower(), w.upper(), w.capitalize(), w.title(), w.translate(LEET)}
    for b in bases:
        for p in PRE:
            for s in SUF:
                yield p + b + s


tried = 0
for wl in sys.argv[2:]:
    for line in Path(wl).read_text(encoding="latin-1", errors="replace").splitlines():
        w = line.strip()
        if not w or len(w) > 14:
            continue
        for cand in forms(w):
            tried += 1
            if ntlm(cand) == target:
                print(f"CRACKED after {tried:,}: {cand!r}")
                sys.exit(0)
        if tried % 5000000 == 0:
            print(f"  ...{tried:,} candidates", flush=True)
print(f"not found ({tried:,} candidates tried)")
