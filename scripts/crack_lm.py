"""Crack LM hashes (fast) then case-correct via NTLM. LM splits the password into two
7-char halves, uppercased - so a wordlist attack on each half is very fast.

Usage: python -I crack_lm.py <hashes_file> <wordlist> [<wordlist> ...]
"""
import sys
from pathlib import Path

from Crypto.Cipher import DES
from Crypto.Hash import MD4

LM_MAGIC = b"KGS!@#$%"
LM_BLANK_HALF = "aad3b435b51404ee"


def str_to_key(s7):
    key = []
    s = int.from_bytes(s7, "big")
    bits = [(s >> (49 - 7 * i)) & 0x7F for i in range(8)]
    for b in bits:
        key.append((b << 1) & 0xFE)
    return bytes(key)


def lm_half(word7):
    data = word7.upper()[:7].ljust(7, "\0").encode("latin-1", "replace")
    return DES.new(str_to_key(data), DES.MODE_ECB).encrypt(LM_MAGIC).hex()


def ntlm(s):
    return MD4.new(s.encode("utf-16le")).hexdigest()


def case_variants(up):
    # yield case permutations of an uppercase string (cap length to keep it bounded)
    if len(up) > 8:
        yield up
        yield up.lower()
        yield up.capitalize()
        return
    import itertools
    letters = [(c.lower(), c.upper()) if c.isalpha() else (c,) for c in up]
    for combo in itertools.product(*letters):
        yield "".join(combo)


def main():
    targets = []
    for line in Path(sys.argv[1]).read_text().splitlines():
        p = line.split(":")
        if len(p) >= 4 and p[2] != LM_BLANK_HALF * 2:
            targets.append({"user": p[0], "lm": p[2], "ntlm": p[3]})
    if not targets:
        print("No LM hashes present (LM storage disabled) - use NTLM attack instead.")
        return
    halves = {}
    for t in targets:
        halves[t["lm"][:16]] = None
        halves[t["lm"][16:]] = None
    halves.pop(LM_BLANK_HALF, None)
    print(f"{len(targets)} accounts with LM hashes; {len(halves)} distinct non-blank halves to crack")
    tried = 0
    for wl in sys.argv[2:]:
        for word in Path(wl).read_text(encoding="latin-1", errors="replace").splitlines():
            word = word.strip()
            if not word or len(word) > 7:
                continue
            tried += 1
            h = lm_half(word)
            if h in halves and halves[h] is None:
                halves[h] = word.upper()
                print(f"  half cracked: {h} => {word.upper()!r}")
            if tried % 1000000 == 0:
                print(f"  ...{tried:,} words, {sum(v is None for v in halves.values())} halves left", flush=True)
        if all(v is not None for v in halves.values()):
            break
    print("\n# case-correcting against NTLM")
    for t in targets:
        h1, h2 = t["lm"][:16], t["lm"][16:]
        p1 = "" if h1 == LM_BLANK_HALF else halves.get(h1)
        p2 = "" if h2 == LM_BLANK_HALF else halves.get(h2)
        if p1 is None or p2 is None:
            print(f"{t['user']:20s} LM halves not fully cracked")
            continue
        up = (p1 + p2)
        for cand in case_variants(up):
            if ntlm(cand) == t["ntlm"]:
                print(f"{t['user']:20s} PASSWORD = {cand!r}")
                break
        else:
            print(f"{t['user']:20s} uppercase password = {up!r} (NTLM case not resolved)")


if __name__ == "__main__":
    main()
