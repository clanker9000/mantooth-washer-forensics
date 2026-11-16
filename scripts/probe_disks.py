"""Identify partition scheme and filesystem of each disk image (read-only).

Usage: python -I probe_disks.py <image> [<image> ...]
"""
import struct
import sys
from pathlib import Path

from dissect.evidence import EWF
from dissect.hypervisor.disk.vhd import VHD


def open_image(path):
    path = Path(path)
    if path.suffix.lower() == ".e01":
        return EWF(path).open()
    if path.suffix.lower() == ".vhd":
        return VHD(path.open("rb"))
    return path.open("rb")


def fs_guess(sector):
    if sector[3:11] == b"NTFS    ":
        return "NTFS"
    if sector[82:90].startswith(b"FAT32"):
        return "FAT32"
    if sector[54:62].startswith(b"FAT"):
        return sector[54:62].decode("ascii", "replace").strip()
    if sector[3:11] == b"EXFAT   ":
        return "exFAT"
    if sector[3:11] == b"-FVE-FS-":
        return "BitLocker"
    return "unknown"


for p in sys.argv[1:]:
    fh = open_image(p)
    size = getattr(fh, "size", None)
    fh.seek(0)
    s0 = fh.read(512)
    print(f"== {Path(p).name}  size={size:,d} bytes ({size // 512:,d} sectors)")
    print(f"   sector0: oem={s0[3:11]!r} sig={s0[510:512].hex()} guess={fs_guess(s0)}")
    if s0[510:512] == b"\x55\xaa" and fs_guess(s0) == "unknown":
        for i in range(4):
            e = s0[446 + 16 * i:462 + 16 * i]
            ptype = e[4]
            lba, count = struct.unpack_from("<II", e, 8)
            if ptype:
                fh.seek(lba * 512)
                b = fh.read(512)
                print(f"   part{i}: type=0x{ptype:02x} start_lba={lba} sectors={count} boot={'Y' if e[0] == 0x80 else 'n'} "
                      f"fs={fs_guess(b)} label_area={b[43:54]!r}/{b[71:82]!r}")
                if ptype == 0xEE:
                    fh.seek(512)
                    print("   GPT header:", fh.read(8))
    else:
        print(f"   volume label area: {s0[43:54]!r} / {s0[71:82]!r}  serial={s0[39:43].hex()}/{s0[67:71].hex()}")
