"""Extract user-activity MRU artefacts from NTUSER.DAT + WinVNC password from SOFTWARE.

Usage: python -I reg_user_artifacts.py <NTUSER.DAT> <SOFTWARE_or_-> <SYSTEM_or_->
"""
import sys
from pathlib import Path

from Crypto.Cipher import DES

sys.path.insert(0, str(Path(__file__).resolve().parent))
from reglib import key, kts, open_hive, subkeys, values  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
ntuser, software, system = sys.argv[1], sys.argv[2], sys.argv[3]
H = open_hive(ntuser)


def dec_mrulistex(blob):
    import struct
    if not isinstance(blob, bytes):
        return []
    out = []
    for i in range(0, len(blob) - 3, 4):
        v = struct.unpack_from("<i", blob, i)[0]
        if v == -1:
            break
        out.append(v)
    return out


def show_mru(path, title, name_from_value=True):
    k = key(H, path)
    if not k:
        return
    vv = values(k)
    order = dec_mrulistex(vv.get("MRUListEx", b""))
    print(f"\n-- {title}  [{path.split(chr(92))[-1]}]  ({kts(k)})")
    items = {}
    for n, v in vv.items():
        if n in ("MRUListEx", "MRUList"):
            continue
        if isinstance(v, bytes):
            # try utf-16 name at start
            t = v.split(b"\x00\x00")[0].decode("utf-16le", "replace").rstrip("\x00")
            t = "".join(c for c in t if c.isprintable())
            v = t if t else v[:40].hex()
        items[n] = v
    if order:
        for idx in order:
            if str(idx) in items:
                print(f"    {items[str(idx)]}")
    else:
        for n, v in list(items.items())[:25]:
            print(f"    {n}: {v}")


# RecentDocs (root + by extension)
rd = "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs"
show_mru(rd, "RecentDocs (all)")
k = key(H, rd)
for sub in subkeys(k):
    if sub.name.startswith("."):
        show_mru(rd + "\\" + sub.name, f"RecentDocs {sub.name}")

# Run / typed / applets / media / office
show_mru("Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU", "RunMRU")
show_mru("Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\TypedPaths", "TypedPaths")
for app in ("Paint", "Wordpad"):
    k = key(H, f"Software\\Microsoft\\Windows\\CurrentVersion\\Applets\\{app}\\Recent File List")
    if k:
        print(f"\n-- {app} Recent File List ({kts(k)})")
        for n, v in values(k).items():
            print(f"    {n}: {v}")
for prod in ("PowerPoint", "Word", "Excel"):
    for ver in ("12.0", "11.0", "14.0"):
        k = key(H, f"Software\\Microsoft\\Office\\{ver}\\{prod}\\File MRU") or \
            key(H, f"Software\\Microsoft\\Office\\{prod}\\Recent File List")
        if k:
            print(f"\n-- Office {prod} {ver} Recent/MRU ({kts(k)})")
            for n, v in values(k).items():
                if n != "Max Display":
                    print(f"    {n}: {v}")
            break
k = key(H, "Software\\Microsoft\\MediaPlayer\\Player\\RecentFileList")
if k:
    print(f"\n-- Windows Media Player RecentFileList ({kts(k)})")
    for n, v in values(k).items():
        print(f"    {n}: {v}")

# TypedURLs
k = key(H, "Software\\Microsoft\\Internet Explorer\\TypedURLs")
if k:
    print(f"\n-- IE TypedURLs ({kts(k)})")
    for n, v in values(k).items():
        print(f"    {n}: {v}")
ie = values(key(H, "Software\\Microsoft\\Internet Explorer\\Main"))
print("\n-- IE Main: StartPage=", ie.get("Start Page"), " DownloadDir=", ie.get("Download Directory"))

# Yahoo / messenger identity
for p in ("Software\\Yahoo\\Pager", "Software\\Yahoo\\Pager\\profiles"):
    k = key(H, p)
    if k:
        print(f"\n-- {p}:", values(k))
        for s in subkeys(k):
            print("     profile:", s.name)

# ComDlg32 OpenSavePidlMRU extensions present
k = key(H, "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU")
if k:
    print("\n-- ComDlg32 OpenSavePidlMRU extensions:", [s.name for s in subkeys(k)])

# WinVNC password from SOFTWARE
if software != "-":
    SW = open_hive(software)
    for p in ("RealVNC\\WinVNC4", "ORL\\WinVNC3", "TightVNC\\Server"):
        k = key(SW, p)
        if k:
            vv = values(k)
            print(f"\n-- VNC {p}:", {n: (v.hex() if isinstance(v, bytes) else v) for n, v in vv.items()})
            pw = vv.get("Password")
            if isinstance(pw, bytes) and len(pw) >= 8:
                vnckey = bytes([23, 82, 107, 6, 35, 78, 88, 7])
                dec = DES.new(vnckey, DES.MODE_ECB).decrypt(pw[:8])
                print("    DECODED VNC password:", repr(dec.split(b"\x00")[0].decode("latin-1", "replace")))
