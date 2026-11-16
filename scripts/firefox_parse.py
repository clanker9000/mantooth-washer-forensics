"""Extract Firefox 2 (Mork) browsing artefacts by string analysis.

Usage: python -I firefox_parse.py <profile_dir>
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
prof = Path(sys.argv[1])


def read(name):
    p = prof / name
    return p.read_bytes() if p.exists() else b""


# history.dat (Mork) -> URLs and page titles
hist = read("history.dat")
urls = sorted(set(re.findall(rb"https?://[\x21-\x7e]{6,200}", hist)))
print(f"== history.dat: {len(urls)} distinct URLs ==")
for u in urls:
    print("  ", u.decode("latin-1"))

# formhistory.dat (Mork) -> form field name=value entries (search terms, typed data)
form = read("formhistory.dat")
vals = re.findall(rb"\(([0-9A-F]+)=([^)]{1,120})\)", form)
print(f"\n== formhistory.dat: form values (search terms / typed data) ==")
seen = set()
for _, v in vals:
    t = v.decode("latin-1").strip()
    if t and not re.fullmatch(r"[0-9A-F]+", t) and t not in seen and len(t) > 1:
        seen.add(t)
        print("  ", t)

# bookmarks
bm = read("bookmarks.html").decode("latin-1", "replace")
print("\n== bookmarks ==")
for m in re.finditer(r'<A HREF="([^"]+)"[^>]*>([^<]*)</A>', bm, re.I):
    print(f"   {m.group(2)[:50]:50s} {m.group(1)[:90]}")

# downloads.rdf
dl = read("downloads.rdf").decode("latin-1", "replace")
print("\n== downloads ==")
for m in re.finditer(r'(?:File|source)="([^"]+)"', dl):
    print("  ", m.group(1)[:140])

# cookies.txt -> hosts
ck = read("cookies.txt").decode("latin-1", "replace")
hosts = sorted({ln.split("\t")[0].lstrip(".") for ln in ck.splitlines() if ln and not ln.startswith("#") and "\t" in ln})
print(f"\n== cookie hosts ({len(hosts)}) ==")
print("  ", ", ".join(hosts))

# signons (saved logins - site + username visible, password is encrypted)
sg = read("signons2.txt").decode("latin-1", "replace")
print("\n== saved logins (signons2.txt) ==")
print(sg[:600])
