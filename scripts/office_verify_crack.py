"""Crack RC4 Office passwords by VERIFICATION (load_key succeeds on the right password),
which works even when msoffcrypto's decrypt routine has a bug on the file.

Usage: python -I office_verify_crack.py <wordlist> <file1> [file2 ...]
"""
import io
import sys
from pathlib import Path

import msoffcrypto
from msoffcrypto.exceptions import InvalidKeyError

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
wordlist = sys.argv[1]

EXTRA = ["smack", "supercallifragilistic", "meth", "123", "tooth", "password", "special k", "specialk"]
words = EXTRA + [w.strip() for w in Path(wordlist).read_text(encoding="latin-1", errors="replace").splitlines() if w.strip()]
# add simple mangles
SUF = ["", "1", "123", "!", "86", "420", "07"]


def candidates():
    seen = set()
    for w in words:
        for base in {w, w.lower(), w.capitalize(), w.upper()}:
            for s in SUF:
                c = base + s
                if c not in seen:
                    seen.add(c)
                    yield c


for f in sys.argv[2:]:
    raw = Path(f).read_bytes()
    try:
        enc = msoffcrypto.OfficeFile(io.BytesIO(raw)).is_encrypted()
    except Exception:
        enc = False
    name = str(f).split("allocated")[-1].lstrip("\\/")
    if not enc:
        print(f"[ ] {name}: not encrypted")
        continue
    found = None
    tried = 0
    for pw in candidates():
        tried += 1
        try:
            of = msoffcrypto.OfficeFile(io.BytesIO(raw))
            of.load_key(password=pw)
            # load_key succeeded = password VERIFIED (RC4 checks the verifier)
            found = pw
            break
        except InvalidKeyError:
            continue
        except Exception:
            # some other error AFTER verification would also indicate correct pw, but
            # InvalidKeyError is the clean 'wrong password' signal; treat others as wrong
            continue
    if found is not None:
        print(f"[+] {name}: PASSWORD = {found!r}  (verified after {tried} tries)")
    else:
        print(f"[-] {name}: not found ({tried} candidates)")
