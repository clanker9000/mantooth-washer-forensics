"""Enumerate EVERY EFS-encrypted file on an E01 by scanning the MFT for the $EFS
($LOGGED_UTILITY_STREAM) attribute. Confirms the full set of encrypted evidence.

Usage: python scripts/efs_enumerate.py <image.E01>
"""
import sys, struct
from dissect.evidence import EWF
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream

E01 = sys.argv[1]
fh = EWF(E01).open(); fh.seek(0); s0 = fh.read(512); ntfs = None
if s0[3:11] == b"NTFS    ":
    ntfs = NTFS(fh)
else:
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]; lba, cnt = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                ntfs = NTFS(RangeStream(fh, lba * 512, cnt * 512)); break

count = 0
for rec in ntfs.mft.segments():
    try:
        if not rec.is_file():
            continue
        lus = rec.attributes.get(ATTRIBUTE_TYPE_CODE.LOGGED_UTILITY_STREAM)
        if not lus:
            continue
        if any(getattr(a, "name", "") == "$EFS" for a in lus):
            count += 1
            try:
                path = rec.full_path()
            except Exception:
                path = rec.filename if hasattr(rec, "filename") else f"<mft {rec.segment}>"
            size = None
            try:
                size = rec.open("").size
            except Exception:
                pass
            print(f"  EFS  {size!s:>9}  {path}")
    except Exception:
        continue
print(f"[total EFS-encrypted files: {count}]")
