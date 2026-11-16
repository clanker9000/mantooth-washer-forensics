"""Find password-protected Office docs in the extraction and test candidate passwords.

Usage: python -I test_office_pw.py <search_root> <out_dir> <pw1> [<pw2> ...]
"""
import sys
import traceback
from pathlib import Path

import msoffcrypto

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
root, outdir = Path(sys.argv[1]), Path(sys.argv[2])
pws = sys.argv[3:]
outdir.mkdir(parents=True, exist_ok=True)

exts = {".doc", ".xls", ".ppt", ".docx", ".xlsx", ".pptx"}
enc_files = []
for p in root.rglob("*"):
    if not p.is_file() or p.suffix.lower() not in exts or "__ADS__" in p.name:
        continue
    try:
        with open(p, "rb") as fh:
            of = msoffcrypto.OfficeFile(fh)
            if of.is_encrypted():
                enc_files.append(p)
    except Exception:
        continue

# de-dup by size+name
seen = {}
for p in enc_files:
    key = (p.name.lower(), p.stat().st_size)
    seen.setdefault(key, p)
uniq = list(seen.values())
print(f"encrypted Office files found: {len(uniq)} (unique)")
for p in uniq:
    rel = str(p).split("03_Extracted")[-1].lstrip("\\/")
    cracked = None
    for pw in pws:
        try:
            with open(p, "rb") as fh:
                of = msoffcrypto.OfficeFile(fh)
                of.load_key(password=pw)
                dest = outdir / (p.stem + "_DECRYPTED" + p.suffix)
                with open(dest, "wb") as out:
                    of.decrypt(out)
                cracked = (pw, dest)
                break
        except Exception:
            continue
    if cracked:
        print(f"  UNLOCKED  {rel}  password={cracked[0]!r}  -> {cracked[1].name}")
    else:
        print(f"  (locked)  {rel}  none of {pws} worked")
