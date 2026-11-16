"""Offline EFS decryption for Washer 17.E01 (Windows XP profile).

Chain (all offline, mirrors the FTK 'Decrypt Files' workflow):
  user password 'meth' -> DPAPI master keys (impacket)
  -> DPAPI-protected RSA private key (Crypto\\RSA) -> RSA(n,d)
  -> per file: read $EFS ($LOGGED_UTILITY_STREAM), RSA-unwrap the FEK (DDF)
  -> decrypt $DATA with the FEK, cipher chosen from the FEK's CALG id.

Writes each plaintext next to the extracted ciphertext as <name>_decrypted<ext>.

Usage: python scripts/washer_efs_decrypt.py <Washer 17.E01> [--write]
       (run from the Case_Work directory; omit --write for a dry probe)
"""
import glob
import os
import struct
import sys

from Cryptodome.Cipher import AES, DES, DES3
from Cryptodome.Util.number import inverse
from dissect.evidence import EWF
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream
from impacket.dpapi import DPAPI_BLOB, MasterKey, MasterKeyFile, deriveKeysFromUser
from impacket.uuid import bin_to_string

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

E01 = sys.argv[1]
WRITE = "--write" in sys.argv[2:]
SID = "S-1-5-21-1177238915-616249376-839522115-500"
PW = "meth"
BASE = r"03_Extracted/Washer17/p0/allocated/Documents and Settings/Administrator/Application Data/Microsoft"
EXTRACT_DIR = r"03_Extracted/Washer17/p0/allocated"
PROV = bytes.fromhex("d08c9ddf0115d1118c7a00c04fc297eb")
EFS_IV = bytes.fromhex("121316e97b65165861899144bead8919")

FILES = [
    "Documents and Settings/Administrator/My Documents/The Dealz.doc",
    "Documents and Settings/Administrator/My Documents/X marks the spot.doc",
    "Documents and Settings/Administrator/My Documents/My Pictures/bad day.jpg",
    "Documents and Settings/Administrator/My Documents/My Pictures/lookalike.jpg",
    "Documents and Settings/Administrator/My Documents/My Pictures/pee limit.jpg",
]
CALG = {0x6603: ("3DES", 24), 0x6610: ("AES-256", 32), 0x6609: ("DES", 8), 0x6604: ("DESX", 16)}


def le(b):
    return int.from_bytes(b, "little")


# --- 1) DPAPI master keys ---
pool = {}
mkpaths = glob.glob(os.path.join(BASE, "Protect", SID, "*-*-*-*-*"))
for p in mkpaths:
    data = open(p, "rb").read()
    mkf = MasterKeyFile(data)
    mk = MasterKey(data[len(mkf):][:mkf["MasterKeyLen"]])
    for k in deriveKeysFromUser(SID, PW):
        dk = mk.decrypt(k)
        if dk:
            pool[os.path.basename(p).lower()] = dk
            break
print(f"[1] master keys unlocked with {PW!r}: {len(pool)}/{len(mkpaths)}")

# --- 2) RSA private key ---
rk = None
for p in glob.glob(os.path.join(BASE, "Crypto", "RSA", SID, "*_*")):
    data = open(p, "rb").read()
    i = 0
    while True:
        j = data.find(PROV, i)
        if j < 0:
            break
        i = j + 1
        try:
            b = DPAPI_BLOB(data[j - 4:])
            mk = pool.get(bin_to_string(b["GuidMasterKey"]).lower())
            dec = b.decrypt(mk) if mk else None
        except Exception:
            dec = None
        if dec and b"RSA2" in dec:
            m = dec.find(b"RSA2")
            bl = struct.unpack_from("<I", dec, m + 8)[0]
            nlen = bl // 8
            n = le(dec[m + 20:m + 20 + nlen])
            half = nlen // 2
            for ps in range(m + 20 + nlen, len(dec) - half):
                pp = le(dec[ps:ps + half])
                if pp > 1 and pp.bit_length() > 400 and n % pp == 0:
                    q = n // pp
                    d = inverse(65537, (pp - 1) * (q - 1))
                    rk = (n, d, nlen)
                    break
        if rk:
            break
    if rk:
        break
if not rk:
    sys.exit("[!] RSA private key not recovered")
n, d, nlen = rk
print(f"[2] RSA private key recovered: {nlen * 8}-bit (p*q == n verified)")


def unwrap_fek(blob):
    for off in range(0, len(blob) - nlen + 1):
        ct = blob[off:off + nlen]
        for order in (ct[::-1], ct):
            c = int.from_bytes(order, "big")
            if c >= n:
                continue
            ptb = pow(c, d, n).to_bytes(nlen, "big")
            if ptb[0] == 0 and ptb[1] == 2:
                z = ptb.find(b"\x00", 2)
                if z > 0:
                    return ptb[z + 1:]
    return None


# --- DESX (CALG_DESX) : Microsoft key expansion (ntfs-3g reference, MD5 + two salts) ---
import hashlib

_SALT1 = b"Dan Simon  \x00"   # 11 chars + NUL = 12 bytes
_SALT2 = b"Scott Field\x00"   # 11 chars + NUL = 12 bytes
DESX_TWEAK = 0x169119629891ad13   # per-sector base IV; sector index is added


def desx_setup(key16):
    base = hashlib.md5(); base.update(key16)
    c1 = base.copy(); c1.update(_SALT1); md1 = c1.digest()
    c2 = base.copy(); c2.update(_SALT2); md2 = c2.digest()
    des_key = (bytes(a ^ b for a, b in zip(md1[0:4], md1[4:8]))
               + bytes(a ^ b for a, b in zip(md1[8:12], md1[12:16])))
    out_w, in_w = md2[0:8], md2[8:16]   # Scott-Field digest: out=[0:8], in=[8:16]
    return des_key, in_w, out_w


def _desx_block(des, c, in_w, out_w):
    """One DESX block decrypt (ntfs-3g do_desx_decrypt order: enc inner)."""
    x = bytes(a ^ b for a, b in zip(c, out_w))
    x = des.encrypt(x)
    return bytes(a ^ b for a, b in zip(x, in_w))


def desx_decrypt_sector(ct, key16, byte_offset):
    """Per-512-byte-sector CBC with DESX block; IV = (DESX_TWEAK + file byte offset)."""
    des_key, in_w, out_w = desx_setup(key16)
    des = DES.new(des_key, DES.MODE_ECB)
    iv = struct.pack("<Q", (DESX_TWEAK + byte_offset) & 0xFFFFFFFFFFFFFFFF)
    out = bytearray()
    prev = iv
    n8 = len(ct) // 8 * 8
    for i in range(0, n8, 8):
        c = ct[i:i + 8]
        p = bytes(a ^ b for a, b in zip(_desx_block(des, c, in_w, out_w), prev))
        out += p
        prev = c
    out += ct[n8:]
    return bytes(out)


def decrypt_stream(ct, fek, alg):
    dec = bytearray()
    for s in range(0, len(ct), 512):
        block = ct[s:s + 512]
        if alg == 0x6610:      # AES-256-CBC per sector
            n16 = len(block) // 16 * 16
            dec += AES.new(fek, AES.MODE_CBC, EFS_IV).decrypt(block[:n16]) + block[n16:]
        elif alg == 0x6603:    # 3DES-CBC per sector
            n8 = len(block) // 8 * 8
            dec += DES3.new(fek, DES3.MODE_CBC, EFS_IV[:8]).decrypt(block[:n8]) + block[n8:]
        elif alg == 0x6609:    # DES-CBC
            n8 = len(block) // 8 * 8
            dec += DES.new(fek, DES.MODE_CBC, EFS_IV[:8]).decrypt(block[:n8]) + block[n8:]
        elif alg == 0x6604:    # DESX-CBC (Microsoft/ntfs-3g scheme)
            dec += desx_decrypt_sector(block, fek, s)
        else:
            raise ValueError(f"unhandled CALG {alg:#x}")
    return bytes(dec)


# --- open the E01 NTFS volume ---
fh = EWF(E01).open()
fh.seek(0)
s0 = fh.read(512)
ntfs = None
vol = fh
if s0[3:11] == b"NTFS    ":
    ntfs = NTFS(fh)
else:
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]
        lba, cnt = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                vol = RangeStream(fh, lba * 512, cnt * 512)
                ntfs = NTFS(vol)
                break
CS = ntfs.cluster_size


def read_allocated(rec, data_attr):
    """Full sector-padded ciphertext, read straight from the mapped cluster runs."""
    buf = bytearray()
    for lcn, count in data_attr.dataruns():
        if lcn is None:          # sparse run -> zero fill
            buf += b"\x00" * (count * CS)
        else:
            vol.seek(lcn * CS)
            buf += vol.read(count * CS)
    return bytes(buf)


SIGS = (b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1", b"\xff\xd8\xff", b"\x89PNG\r\n\x1a\n")
for path in FILES:
    rec = ntfs.mft.get(path)
    efs = next(a for a in rec.attributes[ATTRIBUTE_TYPE_CODE.LOGGED_UTILITY_STREAM] if a.name == "$EFS")
    blob = efs.data() if hasattr(efs, "data") else efs.open().read()
    fek_raw = unwrap_fek(blob)
    name = os.path.basename(path)
    if not fek_raw:
        print(f"[!] {name}: FEK not recovered")
        continue
    klen = struct.unpack_from("<I", fek_raw, 0)[0]
    alg = struct.unpack_from("<I", fek_raw, 8)[0]
    algname, _ = CALG.get(alg, ("?", 0))
    fek = fek_raw[16:16 + klen]
    data_attr = next(iter(rec.attributes[ATTRIBUTE_TYPE_CODE.DATA]))
    logical = rec.open("").size
    ct = read_allocated(rec, data_attr)       # full padded sectors
    dec = decrypt_stream(ct, fek, alg)[:logical]   # trim to logical size
    ok = dec.startswith(SIGS)
    # structural validation
    detail = ""
    if dec[:8] == b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1":
        try:
            import olefile, io
            streams = olefile.OleFileIO(io.BytesIO(dec)).listdir()
            detail = f"OLE valid, {len(streams)} streams"
        except Exception as ex:
            detail = f"OLE header but parse failed: {ex}"
    elif dec[:3] == b"\xff\xd8\xff":
        detail = f"JPEG, EOI={dec.endswith(b'\xff\xd9')}"
    elif dec[:8] == b"\x89PNG\r\n\x1a\n":
        detail = f"PNG, IEND={dec.endswith(b'IEND\xaeB\x60\x82')}"
    print(f"[3] {name}: alg={alg:#x} ({algname}) keylen={klen}, true-type={detail or 'unknown'} -> {len(dec)} B, header_ok={ok}")
    if WRITE:
        stem, ext = os.path.splitext(name)
        outp = os.path.join(EXTRACT_DIR, os.path.dirname(path), f"{stem}_decrypted{ext}")
        open(outp, "wb").write(dec)
        print(f"    written -> {outp}")
