import sys, traceback
from pathlib import Path
from dissect.evidence import AD1
from dissect.evidence.ad1.ad1 import find_files
for p in sys.argv[1:]:
    p = Path(p)
    print("=====", p.name)
    with p.open("rb") as fh:
        head = fh.read(512)
        print("seg hdr:", head[:16], head[16:64].hex())
        import struct
        fh.seek(512); li = fh.read(0x200)
        print("logical hdr:", li[:16], li[16:120].hex())
        print("ascii:", bytes(c if 32 <= c < 127 else 46 for c in li[:0x180]).decode())
    try:
        a = AD1(find_files(p))
        print("OK", a.logical_image)
    except Exception:
        traceback.print_exc()
