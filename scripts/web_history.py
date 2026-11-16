"""Extract web search queries and notable visited URLs from IE cache / index.dat artefacts.

Usage: python -I web_history.py <out_csv> <root1> [root2 ...]
"""
import csv
import re
import sys
from pathlib import Path
from urllib.parse import unquote_plus

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

URL = re.compile(rb"https?://[\x21-\x7e]{6,400}")
SEARCH_Q = re.compile(r"[?&](?:q|p|query|search_query)=([^&]+)", re.I)
TITLE = re.compile(rb"<title>([^<]{3,200})</title>", re.I)


def main():
    out_csv = sys.argv[1]
    searches = {}   # query -> set(engines/hosts)
    titles = set()
    visited_hosts = {}
    for root in sys.argv[2:]:
        tag = "Washer" if "Washer" in root else "Mantooth" if "Mantooth" in root else Path(root).name
        for p in sorted(Path(root).rglob("*")):
            if not p.is_file():
                continue
            name = p.name.lower()
            if not (name.startswith("index.dat") or "content.ie5" in str(p).lower()
                    or p.suffix.lower() in (".htm", ".html", ".url", ".dat")):
                continue
            try:
                data = p.read_bytes()
            except OSError:
                try:
                    data = open("\\\\?\\" + str(p.resolve()), "rb").read()
                except OSError:
                    continue
            for m in URL.finditer(data):
                u = m.group().decode("latin-1", "replace")
                qm = SEARCH_Q.search(u)
                if qm and ("search" in u or "google" in u or "yahoo" in u or "bing" in u or "aol" in u):
                    q = unquote_plus(qm.group(1)).strip()
                    if 2 <= len(q) <= 80 and re.search(r"[a-z]", q, re.I) and "http" not in q:
                        searches.setdefault(q, set()).add(tag)
            for m in TITLE.finditer(data):
                t = m.group(1).decode("latin-1", "replace").strip()
                if re.search(r"search|google|yahoo", t, re.I) and len(t) < 90:
                    titles.add((tag, t))
    rows = sorted(((", ".join(sorted(v)), k) for k, v in searches.items()))
    with open(out_csv, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["machine", "search_query_or_title"])
        for tag, q in rows:
            w.writerow([tag, q])
        for tag, t in sorted(titles):
            w.writerow([tag, "TITLE: " + t])
    print(f"{len(rows)} distinct search queries, {len(titles)} search-page titles -> {out_csv}\n")
    print("== Search queries recovered from browser artefacts ==")
    for tag, q in rows:
        print(f"  [{tag:16s}] {q}")
    print("\n== Search-result page titles ==")
    for tag, t in sorted(titles):
        print(f"  [{tag:16s}] {t}")


if __name__ == "__main__":
    main()
