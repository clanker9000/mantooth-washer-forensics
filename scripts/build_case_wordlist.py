"""Harvest a case-specific wordlist from all gathered evidence text (the technique
AccessData exercises expect: suspects reuse case words, names, slang, handles).

Usage: python -I build_case_wordlist.py <case_work> <out.txt>
"""
import csv
import re
import sys
from pathlib import Path

CW = Path(sys.argv[1])
out = Path(sys.argv[2])
words = set()
WORD = re.compile(r"[A-Za-z][A-Za-z0-9]{1,24}")

# seed with known case terms, names, slang, handles
SEED = """smack meth mth heroin special k ketamine marijuana weed molar molarman dollarhyde washergonebad
txkidd rasco badguy mantooth washer tooth fang vampire dracula count volturi gladiator cigarette powerboat
littletimmy bigjohn frankthetank samiam macdaddy mrfreeze methalotapus megamethamous simplesimon
camerashy validatecreditcard revelation trout junction snagit pharmacy prescription versacheck
supercallifragilistic bidness nunya crackme stufftodelete confession seanbefore hardcore skimmer
ate atm check washing fraud credit nums plates john wes smee gladiator anchorman burgundy ronburgundy
newsteam channel4 kickass sucker suckit inyourface face bite blood night dark""".split()
words.update(SEED)

# email transcript + bodies
for p in [CW / "04_Analysis/email/case_email_transcript.txt"]:
    if p.exists():
        for w in WORD.findall(p.read_text(encoding="utf-8", errors="replace")):
            words.add(w)

# web searches
ws = CW / "04_Analysis/web_searches.csv"
if ws.exists():
    for r in csv.reader(open(ws, encoding="utf-8")):
        for w in WORD.findall(" ".join(r)):
            words.add(w)

# content triage snippets
ct = CW / "04_Analysis/content_triage.csv"
if ct.exists():
    for r in csv.DictReader(open(ct, encoding="utf-8")):
        for w in WORD.findall(r.get("snippet", "") + " " + r.get("keywords", "")):
            words.add(w)

# extracted text-ish files (documents, txt, rtf) - strings
for root in [CW / "03_Extracted/Mantooth_E01", CW / "03_Extracted/ADS_Mantooth", CW / "03_Extracted/Mantooth_EXT2"]:
    if not root.exists():
        continue
    for f in root.rglob("*"):
        if not f.is_file() or f.stat().st_size > 2_000_000:
            continue
        if f.suffix.lower() in (".txt", ".rtf", ".doc", ".htm", ".html", ".mht", ".eml", ".vcs", ".xml", ".ini"):
            try:
                data = f.read_bytes()
            except OSError:
                continue
            for w in WORD.findall(data.decode("latin-1", "replace")):
                words.add(w)

# filenames across the Mantooth MFT
mft = CW / "04_Analysis/disk/Mantooth_E01_p0_mft.csv"
if mft.exists():
    csv.field_size_limit(1 << 30)
    for r in csv.DictReader(open(mft, encoding="utf-8")):
        name = Path(r["path"].replace("\\", "/")).stem
        for w in WORD.findall(name):
            words.add(w)

# normalise: keep 2..24 chars, add lowercase forms
final = set()
for w in words:
    if 2 <= len(w) <= 24:
        final.add(w)
        final.add(w.lower())
out.write_text("\n".join(sorted(final)), encoding="utf-8")
print(f"case wordlist: {len(final):,} unique words -> {out}")
