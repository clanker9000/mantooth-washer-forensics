"""Correlate USBSTOR device serials between two SYSTEM hives; report shared devices + first-install times.

Usage: python -I usb_correlate.py <SYSTEM_A> <labelA> <SYSTEM_B> <labelB>
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from reglib import filetime, key, kts, open_hive, subkeys, val, values  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def current_cs(SYS):
    sel = val(key(SYS, "Select"), "Current") or 1
    return f"ControlSet{sel:03d}"


def usbstor(system_path):
    SYS = open_hive(system_path)
    cs = current_cs(SYS)
    out = {}
    root = key(SYS, f"{cs}\\Enum\\USBSTOR")
    for dev in subkeys(root):
        for inst in subkeys(dev):
            serial = inst.name.split("&")[0]
            vv = values(inst)
            friendly = vv.get("FriendlyName", "")
            if isinstance(friendly, bytes):
                friendly = friendly.decode("utf-16le", "replace").rstrip("\x00")
            # first install time via Properties / LastWrite of the instance key
            out[serial] = {"device": dev.name, "friendly": friendly, "key_lastwrite": kts(inst)}
    return out


A = usbstor(sys.argv[1])
B = usbstor(sys.argv[3])
la, lb = sys.argv[2], sys.argv[4]
shared = sorted(set(A) & set(B))
print(f"{la}: {len(A)} USBSTOR device instances | {lb}: {len(B)} | shared serials: {len(shared)}\n")
print("=== DEVICE SERIALS PRESENT ON BOTH MACHINES ===")
for s in shared:
    print(f"  serial={s}")
    print(f"     {la}: {A[s]['device']}  ({A[s]['friendly']})  key_lastwrite={A[s]['key_lastwrite']}")
    print(f"     {lb}: {B[s]['device']}  ({B[s]['friendly']})  key_lastwrite={B[s]['key_lastwrite']}")
print(f"\n=== {la} ONLY ({len(set(A)-set(B))}) ===")
for s in sorted(set(A) - set(B)):
    print(f"  {s:28s} {A[s]['friendly']}")
