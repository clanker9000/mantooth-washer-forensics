import sys

import pymupdf

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
d = pymupdf.open(sys.argv[1])
print(f"=== {d.page_count} pages ===")
for i in range(d.page_count):
    txt = d[i].get_text().strip()
    if txt:
        print(f"\n----- PAGE {i + 1} -----")
        print(txt)
