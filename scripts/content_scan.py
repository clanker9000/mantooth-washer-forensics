"""Extract readable text/metadata from recovered documents for investigative triage.

Pulls text from OLE docs (strings), PDFs, RTF, TXT, and lists image/zip metadata.
Scans for indicators (card numbers, SSNs, bank/routing terms, suspicious keywords).
Outputs a triage CSV + prints a summary. Does NOT reproduce full illicit content.

Usage: python -I content_scan.py <out_csv> <root1> [root2 ...]
"""
import csv
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

CARD = re.compile(rb"(?<!\d)(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}(?!\d)")
SSN = re.compile(rb"(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)")
ROUTING = re.compile(rb"\b(?:routing|aba|account\s*(?:number|#)|swift|iban)\b", re.I)
KEYWORDS = [b"credit card", b"check", b"fraud", b"steal", b"ssn", b"social security", b"routing",
            b"password", b"bank", b"counterfeit", b"fake", b"identity", b"victim", b"scam", b"skimmer"]


def luhn_ok(num):
    digs = [int(c) for c in num if c.isdigit()]
    s, alt = 0, False
    for d in reversed(digs):
        d = d * 2 - 9 if alt and d * 2 > 9 else d * 2 if alt else d
        s += d
        alt = not alt
    return len(digs) >= 13 and s % 10 == 0


def ascii_strings(data, n=5):
    return re.findall(rb"[\x20-\x7e]{%d,}" % n, data)


def text_of(path, data):
    ext = path.suffix.lower()
    if ext in (".txt", ".rtf", ".csv", ".htm", ".html", ".eml", ".url", ".xml"):
        return data.decode("latin-1", "replace")
    if ext == ".pdf":
        return b" ".join(ascii_strings(data, 4)).decode("latin-1", "replace")
    if ext in (".doc", ".xls", ".ppt"):
        # crude: pull UTF-16LE and ASCII runs from the OLE streams
        txt16 = re.findall(rb"(?:[\x20-\x7e]\x00){6,}", data)
        t = b"".join(txt16).decode("utf-16le", "replace")
        t += " " + b" ".join(ascii_strings(data, 6)).decode("latin-1", "replace")
        return t
    return ""


def main():
    out_csv = sys.argv[1]
    rows = []
    for root in sys.argv[2:]:
        for p in sorted(Path(root).rglob("*")):
            if not p.is_file():
                continue
            try:
                data = p.read_bytes()
            except OSError:
                try:
                    data = open("\\\\?\\" + str(p.resolve()), "rb").read()
                except OSError:
                    continue
            cards = [m.group().decode() for m in CARD.finditer(data) if luhn_ok(m.group().decode())]
            ssns = [m.group().decode() for m in SSN.finditer(data)]
            kw = sorted({k.decode() for k in KEYWORDS if re.search(re.escape(k), data, re.I)})
            txt = text_of(p, data)
            snippet = re.sub(r"\s+", " ", txt).strip()[:200]
            if not (cards or ssns or kw) and p.suffix.lower() not in (".txt", ".rtf", ".doc", ".pdf"):
                continue
            rows.append({
                "file": str(p).split("03_Extracted")[-1].lstrip("\\/"),
                "size": len(data), "cards": len(cards), "ssns": len(ssns),
                "card_samples": "; ".join(c[:4] + "***" + c[-2:] for c in cards[:4]),
                "keywords": ", ".join(kw), "snippet": snippet,
            })
    rows.sort(key=lambda r: (r["cards"] + r["ssns"], len(r["keywords"])), reverse=True)
    with open(out_csv, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["file", "size", "cards", "ssns", "card_samples", "keywords", "snippet"])
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} files triaged -> {out_csv}\n")
    print("Files containing card numbers (Luhn-valid) or SSNs:")
    for r in rows:
        if r["cards"] or r["ssns"]:
            print(f"  cards={r['cards']} ssns={r['ssns']}  [{r['card_samples']}]  {r['file']}")
    print("\nTop documents by indicator keywords:")
    for r in rows[:25]:
        if r["keywords"]:
            print(f"  [{r['keywords']}]  {r['file']}")
            if r["snippet"]:
                print(f"      “{r['snippet'][:150]}”")


if __name__ == "__main__":
    main()
