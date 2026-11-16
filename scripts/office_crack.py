"""Dictionary attack on one encrypted Office file (loads file once).

Usage: python -I office_crack.py <file> <wordlist> [<wordlist> ...]
"""
import io
import sys
from pathlib import Path

import msoffcrypto

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
path = Path(sys.argv[1])
raw = path.read_bytes()

# report encryption type
try:
    info = msoffcrypto.OfficeFile(io.BytesIO(raw))
    print(f"file: {path.name}  type={info.__class__.__name__}  encrypted={info.is_encrypted()}")
except Exception as exc:  # noqa: BLE001
    print("cannot parse:", exc)
    sys.exit(1)

BASE = ["smack", "Smack", "SMACK", "supercallifragilistic", "supercalifragilistic",
        "supercalifragilisticexpialidocious", "meth", "123", "tooth", "wes", "mantooth", "washer",
        "password", "secret", "money", "checks", "fraud", "badguy", "rasco", "dollarhyde86"]


def candidates(wordlists):
    yield from BASE
    for wl in wordlists:
        for line in Path(wl).read_text(encoding="latin-1", errors="replace").splitlines():
            w = line.strip()
            if w:
                yield w


tried = 0
for pw in candidates(sys.argv[2:]):
    tried += 1
    try:
        of = msoffcrypto.OfficeFile(io.BytesIO(raw))
        of.load_key(password=pw)
        out = io.BytesIO()
        of.decrypt(out)
        data = out.getvalue()
        if data[:4] in (b"\xd0\xcf\x11\xe0", b"PK\x03\x04") or len(data) > 1000:
            dest = path.parent.parent.parent.parent / "Decrypted" / (path.stem + "_DEC" + path.suffix)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            print(f"UNLOCKED after {tried}: password={pw!r}  -> {dest}")
            sys.exit(0)
    except Exception:
        continue
    if tried % 20000 == 0:
        print(f"  ...{tried} tried", flush=True)
print(f"not cracked ({tried} passwords)")
