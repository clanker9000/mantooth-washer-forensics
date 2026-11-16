"""Decode the RealVNC password and locate the Vista EFS key material (Protect masterkey, RSA key)."""
import sys
from pathlib import Path

from Crypto.Cipher import DES

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
base = Path(sys.argv[1])  # ...\allocated

# --- VNC password ---
pw = bytes.fromhex("a85208921240452d")
VNC_FIXED = bytes([0x17, 0x52, 0x6B, 0x06, 0x23, 0x4E, 0x58, 0x07])


def bitrev(b):
    return int(f"{b:08b}"[::-1], 2)


for label, key in (("plain", VNC_FIXED), ("bit-reversed", bytes(bitrev(b) for b in VNC_FIXED))):
    d = DES.new(key, DES.MODE_ECB).decrypt(pw)
    txt = d.split(b"\x00")[0].decode("latin-1", "replace")
    printable = all(32 <= c < 127 for c in d.rstrip(b"\x00"))
    print(f"VNC key={label:12s}: bytes={d.hex()}  text={txt!r}  clean={printable}")

# --- locate EFS key material ---
print("\nEFS key material in Wes Mantooth's Vista profile:")
prof = base / "Users" / "Wes Mantooth" / "AppData" / "Roaming" / "Microsoft"
for sub in ("Protect", "Crypto/RSA", "SystemCertificates/My/Certificates"):
    d = prof / sub
    if d.exists():
        for f in d.rglob("*"):
            if f.is_file():
                print(f"  {f.stat().st_size:>8}  {f.relative_to(base)}")
    else:
        print(f"  (missing: {sub})")
