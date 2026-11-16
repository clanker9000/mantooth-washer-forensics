"""Raw keyword search across whole image streams (allocated + unallocated + slack).

Searches each term as ASCII and UTF-16LE, case-insensitive, over the raw media
stream of E01 images and the data stream of AD1 images. Reports hit counts and
the byte offset of the first few hits per term.

Usage: python -I keyword_search.py <terms_file> <out_csv> <image> [<image> ...]
"""
import csv
import re
import sys
from pathlib import Path

from dissect.evidence import EWF

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ad1lib import AD1Image  # noqa: E402

CHUNK = 16 << 20
OVERLAP = 64


def stream_for(path):
    path = Path(path)
    if path.suffix.lower() == ".e01":
        s = EWF(path).open()
        return s, s.size
    if path.suffix.lower() == ".ad1":
        img = AD1Image(path)

        class S:
            def seek(self, o):
                self._o = o

            def read(self, n):
                return img.read(self._o, n)
        s = S()
        s.seek(0)
        return s, img.size
    fh = path.open("rb")
    return fh, path.stat().st_size


def patterns(term):
    t = re.escape(term).encode()
    ascii_pat = re.compile(t, re.I)
    utf16 = re.escape(term).encode("utf-16le")
    utf16_pat = re.compile(re.sub(rb"(.)\x00", lambda m: re.escape(m.group(1)) + rb"\\x00", utf16), re.I)
    return ascii_pat, utf16_pat


def main():
    terms = [t.strip() for t in Path(sys.argv[1]).read_text().splitlines() if t.strip()]
    out_csv = sys.argv[2]
    pats = {t: patterns(t) for t in terms}
    rows = []
    for image in sys.argv[3:]:
        name = Path(image).name
        stream, size = stream_for(image)
        counts = {t: [0, 0, []] for t in terms}  # ascii_count, utf16_count, first_offsets
        offset = 0
        prev = b""
        while offset < size:
            stream.seek(offset)
            buf = stream.read(CHUNK)
            if not buf:
                break
            window = prev + buf
            base = offset - len(prev)
            for t, (ap, up) in pats.items():
                for m in ap.finditer(window):
                    counts[t][0] += 1
                    if len(counts[t][2]) < 5:
                        counts[t][2].append(("ascii", base + m.start()))
                for m in up.finditer(window):
                    counts[t][1] += 1
                    if len(counts[t][2]) < 5:
                        counts[t][2].append(("utf16", base + m.start()))
            prev = buf[-OVERLAP:]
            offset += len(buf)
        for t in terms:
            a, u, offs = counts[t]
            rows.append([name, t, a, u, a + u, "; ".join(f"{k}@{o}" for k, o in offs)])
            print(f"  {name:28.28s} {t:16s} ascii={a:<6d} utf16={u:<5d} total={a + u}")
        print()
    with open(out_csv, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["image", "term", "ascii_hits", "utf16_hits", "total_hits", "first_offsets"])
        w.writerows(rows)


if __name__ == "__main__":
    main()
