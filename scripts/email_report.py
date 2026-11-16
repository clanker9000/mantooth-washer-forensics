"""Full e-mail extraction from recovered .eml (Windows Mail) and .dbx (Outlook Express) stores.

Produces a CSV (headers + body preview + attachment list) and a readable text transcript.
Message bodies ARE extracted to the output files; nothing is printed to the console beyond a summary.

Usage: python -I email_report.py <out_prefix> <root1> [<root2> ...]
"""
import csv
import email
import hashlib
import re
import sys
from email import policy
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def msg_from_bytes(b):
    try:
        return email.message_from_bytes(b, policy=policy.default)
    except Exception:
        return email.message_from_bytes(b)


def body_and_atts(m):
    body, atts = "", []
    if m.is_multipart():
        for part in m.walk():
            cd = str(part.get("Content-Disposition", ""))
            ct = part.get_content_type()
            fn = part.get_filename()
            if fn or "attachment" in cd:
                try:
                    payload = part.get_payload(decode=True) or b""
                except Exception:
                    payload = b""
                atts.append((fn or "(unnamed)", ct, len(payload),
                             hashlib.md5(payload).hexdigest() if payload else ""))
            elif ct == "text/plain" and not body:
                try:
                    body = part.get_content()
                except Exception:
                    body = (part.get_payload(decode=True) or b"").decode("latin-1", "replace")
    else:
        try:
            body = m.get_content()
        except Exception:
            body = (m.get_payload(decode=True) or b"").decode("latin-1", "replace")
    return body.strip(), atts


def iter_eml(root):
    for p in sorted(Path(root).rglob("*.eml")):
        try:
            yield p, p.read_bytes()
        except OSError:
            try:
                yield p, open("\\\\?\\" + str(p.resolve()), "rb").read()
            except OSError:
                continue


def iter_dbx_messages(root):
    """Outlook Express .dbx: carve embedded RFC822 messages by header signature."""
    for p in sorted(Path(root).rglob("*.dbx")):
        try:
            data = p.read_bytes()
        except OSError:
            continue
        for m in re.finditer(rb"(?:\r?\n|^)(X-Message-Info:|Return-Path:|Received:|From:\s)", data):
            start = m.start()
            seg = data[start:start + 20000]
            end = re.search(rb"\x00\x00\x00\x00{4,}", seg)
            if end:
                seg = seg[:end.start()]
            yield p, seg.lstrip(b"\r\n")


def main():
    out = sys.argv[1]
    rows = []
    transcript = []
    n_eml = n_dbx = 0
    for root in sys.argv[2:]:
        for p, b in iter_eml(root):
            n_eml += 1
            rows.append(parse(p, b, "eml", transcript))
        for p, seg in iter_dbx_messages(root):
            m = msg_from_bytes(seg)
            if m.get("From") or m.get("Subject"):
                n_dbx += 1
                rows.append(parse(p, seg, "dbx", transcript))
    # de-duplicate by (date, from, subject)
    seen = {}
    for r in rows:
        key = (r["date"], r["from"], r["subject"])
        if key not in seen:
            seen[key] = r
    uniq = list(seen.values())
    with open(out + ".csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["source", "file", "date", "from", "to", "cc", "subject",
                                           "body_chars", "attachments"])
        w.writeheader()
        for r in uniq:
            w.writerow({k: r[k] for k in w.fieldnames})
    Path(out + "_transcript.txt").write_text("\n".join(transcript), encoding="utf-8")
    att = sum(len(r["att_list"]) for r in uniq)
    print(f"eml parsed={n_eml} dbx messages={n_dbx} unique messages={len(uniq)} attachments={att}")
    print(f"-> {out}.csv  and  {out}_transcript.txt")


def parse(p, b, src, transcript):
    m = msg_from_bytes(b)
    body, atts = body_and_atts(m)
    hdr = lambda k: re.sub(r"\s+", " ", str(m.get(k, "") or "")).strip()
    r = dict(source=src, file=str(p).split("03_Extracted")[-1].lstrip("\\/"), date=hdr("Date"),
             **{"from": hdr("From")}, to=hdr("To"), cc=hdr("Cc"), subject=hdr("Subject"),
             body_chars=len(body), attachments="; ".join(f"{a[0]}({a[2]}B)" for a in atts), att_list=atts)
    transcript.append("=" * 90)
    transcript.append(f"[{src}] {r['file']}")
    transcript.append(f"Date: {r['date']}\nFrom: {r['from']}\nTo: {r['to']}\nCc: {r['cc']}\nSubject: {r['subject']}")
    if atts:
        transcript.append("Attachments: " + "; ".join(f"{a[0]} ({a[1]}, {a[2]} bytes, md5 {a[3]})" for a in atts))
    transcript.append("-" * 40 + " body " + "-" * 40)
    transcript.append(body[:4000])
    transcript.append("")
    return r


if __name__ == "__main__":
    main()
