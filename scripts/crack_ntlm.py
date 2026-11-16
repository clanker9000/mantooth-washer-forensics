"""Dictionary + rule attack on NTLM (and LM) hashes from the case hives.

Pure offline attack on the examiner's own training evidence.
Usage: python -I crack_ntlm.py <hashes_file> [<extra_wordlist> ...]
"""
import itertools
import sys
from pathlib import Path

from Crypto.Hash import MD4

BLANK = "31d6cfe0d16ae931b73c59d7e0c089c0"
LM_BLANK = "aad3b435b51404ee"

BASE = [
    "txkidd", "chkwasher", "dollarhyde86", "wes", "mantooth", "john", "washer", "rasco", "badguy",
    "administrator", "admin", "student", "guest", "washer1", "johnwasher", "wesmantooth", "dollarhyde",
    "password", "passw0rd", "letmein", "welcome", "abc123", "qwerty", "123456", "iloveyou", "monkey",
    "dragon", "master", "secret", "fraud", "checks", "check", "bidness", "familypix", "family", "dealz",
    "deals", "crack", "crackme", "zipwash", "pwned", "forensic", "forensics", "accessdata", "ftk",
    "smee", "hook", "wolf", "artimus", "brubeck", "pgp", "truecrypt", "encrypt", "money", "cash",
    "tink", "tinkerbell", "pirate", "nemo", "comcast", "swbell", "aim", "aol", "test", "changeme",
    "god", "love", "sex", "trustno1", "hello", "shadow", "superman", "batman", "football", "baseball",
]

LEET = str.maketrans({"a": "@", "e": "3", "i": "1", "o": "0", "s": "$"})


def md4hex(s):
    return MD4.new(s.encode("utf-16le")).hexdigest()


def mutations(word):
    seen = set()
    forms = {word, word.lower(), word.upper(), word.capitalize()}
    for f in list(forms):
        for suf in ("", "1", "2", "12", "123", "1234", "!", "123!", "2007", "2008", "01", "00", "69", "007", "7"):
            forms.add(f + suf)
        forms.add(f.translate(LEET))
        forms.add(f.translate(LEET) + "1")
        forms.add(f + f)
    for f in forms:
        if f not in seen:
            seen.add(f)
            yield f


def load_targets(path):
    out = []
    for line in Path(path).read_text().splitlines():
        if ":" not in line or line.startswith("#"):
            continue
        p = line.split(":")
        if len(p) >= 4:
            out.append({"user": p[0], "rid": p[1], "lm": p[2], "ntlm": p[3], "pw": None})
    return out


def candidates(extra):
    for w in BASE:
        yield from mutations(w)
    for _ in (1,):
        yield ""  # blank
    for wl in extra:
        for line in Path(wl).read_text(encoding="latin-1", errors="replace").splitlines():
            line = line.strip()
            if line:
                yield line


def main():
    targets = load_targets(sys.argv[1])
    extra = sys.argv[2:]
    todo = {t["ntlm"] for t in targets if t["ntlm"] != BLANK and t["user"] not in ("HelpAssistant", "SUPPORT_388945a0")}
    for t in targets:
        if t["ntlm"] == BLANK:
            t["pw"] = "(blank)"
    tried = 0
    found = {}
    for cand in candidates(extra):
        tried += 1
        h = md4hex(cand)
        if h in todo and h not in found:
            found[h] = cand
            print(f"  CRACKED  {h}  =>  {cand!r}")
            todo.discard(h)
            if not todo:
                break
        if tried % 500000 == 0:
            print(f"  ...{tried:,} candidates tried, {len(todo)} hashes left", flush=True)
    print(f"\n# tried {tried:,} candidates")
    print(f"{'USER':20s} {'RID':5s} {'STATUS':10s} PASSWORD")
    for t in targets:
        if t["ntlm"] == BLANK:
            pw, st = "", "blank"
        elif t["ntlm"] in found:
            pw, st = found[t["ntlm"]], "CRACKED"
        elif t["user"] in ("HelpAssistant", "SUPPORT_388945a0"):
            pw, st = "(system acct, not attacked)", "skipped"
        else:
            pw, st = "", "not found"
        print(f"{t['user']:20s} {t['rid']:5s} {st:10s} {pw}")


if __name__ == "__main__":
    main()
