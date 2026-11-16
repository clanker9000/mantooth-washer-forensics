"""Verify candidate passwords against NTLM hashes; extract alternate data streams; read SAM password hint.

Usage: python -I verify_and_ads.py <case_work>
"""
import sys
from pathlib import Path

from Crypto.Hash import MD4
from dissect.evidence import EWF
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream

CW = Path(sys.argv[1])
sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def ntlm(p):
    return MD4.new(p.encode("utf-16le")).hexdigest()


print("=" * 70, "\nPASSWORD VERIFICATION (candidate -> NTLM)\n", "=" * 70)
targets = {"511bc1d639f5321653e6f82c1a08b134": "Mantooth\\Wes Mantooth",
           "3dbde697d71690a769204beb12283678": "Mantooth\\Student",
           "090d5be92d0524e3b3e0f3d4577ca5d6": "Washer\\Administrator"}
for cand in ["tooth", "Tooth", "in your tooth", "meth", "123", "smack", "supercallifragilistic"]:
    h = ntlm(cand)
    who = targets.get(h, "")
    mark = ("  <== MATCHES " + who) if who else ""
    print(f"  {cand!r:26s} NTLM={h}{mark}")


def open_vol(image):
    fh = EWF(image).open()
    fh.seek(0)
    if fh.read(512)[3:11] == b"NTFS    ":
        return NTFS(fh)
    fh.seek(0)
    import struct
    s0 = fh.read(512)
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]
        lba, cnt = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                return NTFS(RangeStream(fh, lba * 512, cnt * 512))
    raise RuntimeError("no NTFS")


print("\n" + "=" * 70, "\nALTERNATE DATA STREAMS on Mantooth.E01\n", "=" * 70)
ntfs = open_vol(CW / "02_WorkingCopies/Evidence Files/BootCamp/Evidence Files/Mantooth.E01")
out = CW / "03_Extracted/ADS_Mantooth"
out.mkdir(parents=True, exist_ok=True)
for path in ["Users\\Wes Mantooth\\Documents\\ADS\\readthis.txt",
             "Users\\Wes Mantooth\\Documents\\My poem.txt"]:
    rec = ntfs.mft.get(path)
    streams = sorted({a.name for a in rec.attributes[ATTRIBUTE_TYPE_CODE.DATA]})
    print(f"\n{path}")
    for s in streams:
        data = rec.open(s).read()
        label = s or "(default)"
        dest = out / (Path(path).name + ("__ADS__" + s if s else "")).replace("\\", "_")
        dest.write_bytes(data)
        head = data[:4].hex()
        kind = ("JPEG" if data[:3] == b"\xff\xd8\xff" else "ZIP" if data[:4] == b"PK\x03\x04"
                else "text" if all(9 <= b < 127 or b in (10, 13) for b in data[:200]) else "binary")
        print(f"   :{label:22s} {len(data):>8} bytes  {kind}  -> {dest.name}")
        if kind == "text":
            print("      CONTENT: " + data.decode("latin-1", "replace").strip().replace("\r", " ").replace("\n", " | "))

print("\n" + "=" * 70, "\nSAM PASSWORD HINT (Mantooth Win7)\n", "=" * 70)
try:
    from dissect.regf.regf import RegistryHive
    sam = RegistryHive(open(CW / "03_Extracted/Mantooth34/Windows/System32/config/SAM", "rb"))
    users = sam.open("SAM\\Domains\\Account\\Users")
    for sub in users.subkeys():
        if not sub.name.startswith("0000"):
            continue
        vals = {v.name: v.value for v in sub.values()}
        hint = vals.get("UserPasswordHint")
        if hint:
            if isinstance(hint, bytes):
                hint = hint.decode("utf-16le", "replace").rstrip("\x00")
            print(f"   RID {int(sub.name, 16)}: hint = {hint!r}")
except Exception as exc:  # noqa: BLE001
    print("   hint parse error:", exc)
