"""Minimal Windows shortcut (.lnk) parser: target times, size, drive type, volume serial, label, path.

Usage: python -I lnk_parse.py <folder_or_lnk> [...]
"""
import struct
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
DRIVE = {0: "unknown", 1: "no_root", 2: "REMOVABLE", 3: "FIXED", 4: "NETWORK", 5: "CDROM", 6: "RAMDISK"}


def ft(v):
    if not v:
        return ""
    try:
        return datetime.fromtimestamp((v - 116444736000000000) / 1e7, tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    except (OSError, OverflowError, ValueError):
        return ""


def cstr(b, off):
    end = b.find(b"\x00", off)
    return b[off:end].decode("cp1252", "replace")


def parse(p):
    b = Path(p).read_bytes()
    if len(b) < 76 or struct.unpack_from("<I", b, 0)[0] != 0x4C:
        return None
    flags = struct.unpack_from("<I", b, 0x14)[0]
    ctime, atime, mtime = struct.unpack_from("<QQQ", b, 0x1C)
    size = struct.unpack_from("<I", b, 0x34)[0]
    off = 76
    if flags & 0x1:  # HasLinkTargetIDList
        off += 2 + struct.unpack_from("<H", b, off)[0]
    r = dict(target_created=ft(ctime), target_modified=ft(mtime), target_accessed=ft(atime), target_size=size,
             drive="", serial="", label="", path="", net="")
    if flags & 0x2:  # HasLinkInfo
        li = off
        _, hdr, liflags, vol_off, base_off, net_off = struct.unpack_from("<IIIIII", b, li)
        if liflags & 0x1 and vol_off:
            v = li + vol_off
            _, dtype, serial, lab_off = struct.unpack_from("<IIII", b, v)
            r["drive"] = DRIVE.get(dtype, str(dtype))
            r["serial"] = f"{serial:08X}"
            r["label"] = cstr(b, v + lab_off)
        if liflags & 0x1 and base_off:
            r["path"] = cstr(b, li + base_off)
        if liflags & 0x2 and net_off:
            n = li + net_off
            r["net"] = cstr(b, n + struct.unpack_from("<I", b, n + 8)[0])
    return r


for arg in sys.argv[1:]:
    p = Path(arg)
    files = sorted(p.rglob("*.lnk*")) if p.is_dir() else [p]
    for f in files:
        try:
            r = parse(f)
        except Exception as exc:  # noqa: BLE001
            print(f"{f.name}: parse error {exc}")
            continue
        if r:
            print(f"{f.name:58.58s} | {r['drive']:9s} | serial={r['serial']:8s} | label={r['label']!r:14s} | "
                  f"tgt_mod={r['target_modified']} | {r['path'] or r['net']}")
