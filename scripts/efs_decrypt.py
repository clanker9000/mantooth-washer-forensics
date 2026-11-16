"""Offline EFS decryption for Mantooth.E01 (no FTK).

Chain, all offline:
  user password 'tooth' -> DPAPI master keys (impacket)
  -> DPAPI-protected RSA private key (Crypto\\RSA)  -> RSA(n,p,q,e)
  -> per file: read $EFS ($LOGGED_UTILITY_STREAM), RSA-unwrap the FEK (DDF)
  -> decrypt $DATA with the FEK (AES-256-CBC, 512-byte sectors).

Usage: python -I efs_decrypt.py <image.E01> <sid> <password> <profile_dir_in_extract> <out_dir>
"""
import glob
import os
import struct
import sys

from Cryptodome.Cipher import AES, DES3
from Cryptodome.Util.number import inverse
from dissect.evidence import EWF
from dissect.ntfs import NTFS
from dissect.ntfs.c_ntfs import ATTRIBUTE_TYPE_CODE
from dissect.util.stream import RangeStream
from impacket.dpapi import DPAPI_BLOB, MasterKey, MasterKeyFile, deriveKeysFromUser
from impacket.uuid import bin_to_string

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
E01, SID, PW, PROFILE, OUT = sys.argv[1:6]
os.makedirs(OUT, exist_ok=True)
PROV = bytes.fromhex("d08c9ddf0115d1118c7a00c04fc297eb")


def le(b):
    return int.from_bytes(b, "little")


# --- 1) DPAPI master keys ---
protdir = os.path.join(PROFILE, "AppData", "Roaming", "Microsoft", "Protect", SID)
pool = {}
for p in glob.glob(os.path.join(protdir, "*-*-*-*-*")):
    data = open(p, "rb").read()
    mkf = MasterKeyFile(data)
    mk = MasterKey(data[len(mkf):][:mkf["MasterKeyLen"]])
    for k in deriveKeysFromUser(SID, PW):
        dk = mk.decrypt(k)
        if dk:
            pool[os.path.basename(p).lower()] = dk
            break
print(f"[1] master keys decrypted with {PW!r}: {len(pool)}/{len(glob.glob(os.path.join(protdir,'*-*-*-*-*')))}")

# --- 2) RSA private key(s) ---
rsadir = os.path.join(PROFILE, "AppData", "Roaming", "Microsoft", "Crypto", "RSA", SID)
rsa_keys = []
for p in glob.glob(os.path.join(rsadir, "*_*")):
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
        if not dec or b"RSA2" not in dec:
            continue
        m = dec.find(b"RSA2")
        bitlen = struct.unpack_from("<I", dec, m + 8)[0]  # real bitlen field
        nlen = bitlen // 8
        n = le(dec[m + 20:m + 20 + nlen])
        # primes follow the (padded) modulus; locate prime1 by factor test
        half = nlen // 2
        for ps in range(m + 20 + nlen, m + 20 + nlen + 16):
            pp = le(dec[ps:ps + half])
            if pp > 1 and n % pp == 0:
                q = n // pp
                e = 65537
                d = inverse(e, (pp - 1) * (q - 1) // _gcd(pp - 1, q - 1)) if False else inverse(e, (pp - 1) * (q - 1))
                rsa_keys.append(dict(n=n, e=e, d=d, nlen=nlen))
                print(f"[2] RSA private key: {bitlen}-bit, p*q==n OK")
                break


def _gcd(a, b):
    while b:
        a, b = b, a % b
    return a


def rsa_dec_raw(ct_be):
    for k in rsa_keys:
        c = int.from_bytes(ct_be, "big")
        if c >= k["n"]:
            continue
        pt = pow(c, k["d"], k["n"]).to_bytes(k["nlen"], "big")
        yield pt


def unwrap_fek(efs_blob):
    """Find the RSA-wrapped FEK in the $EFS stream and return the plaintext FEK bytes."""
    nlen = rsa_keys[0]["nlen"]
    for off in range(0, len(efs_blob) - nlen + 1):
        ct = efs_blob[off:off + nlen]
        for order in (ct[::-1], ct):            # EFS stores the RSA block little-endian
            for pt in rsa_dec_raw(order):
                if pt[0] == 0x00 and pt[1] == 0x02:   # PKCS#1 v1.5
                    z = pt.find(b"\x00", 2)
                    if z > 0:
                        return pt[z + 1:], off
    return None, None


# --- open the E01 NTFS volume ---
fh = EWF(E01).open()
fh.seek(0)
s0 = fh.read(512)
if s0[3:11] == b"NTFS    ":
    ntfs = NTFS(fh)
else:
    ntfs = None
    for i in range(4):
        e = s0[446 + 16 * i:462 + 16 * i]
        lba, cnt = struct.unpack_from("<II", e, 8)
        if e[4]:
            fh.seek(lba * 512)
            if fh.read(512)[3:11] == b"NTFS    ":
                ntfs = NTFS(RangeStream(fh, lba * 512, cnt * 512))
                break

FILES = [
    "Users/Wes Mantooth/Documents/EFS DOCS/CC Nums.xls",
    "Users/Wes Mantooth/Documents/EFS DOCS/C money plates.doc",
    "Users/Wes Mantooth/Documents/EFS DOCS/John.doc",
    "Users/Wes Mantooth/Documents/EFS DOCS/Wes.doc",
]

CALG = {0x6603: ("3DES", 24), 0x6610: ("AES-256", 32), 0x6609: ("DES", 8), 0x6604: ("DESX", 16)}

for path in FILES:
    rec = ntfs.mft.get(path)
    data_attr = next(iter(rec.attributes[ATTRIBUTE_TYPE_CODE.DATA]))
    real_size = data_attr.size if hasattr(data_attr, "size") else None
    efs_attr = next(a for a in rec.attributes[ATTRIBUTE_TYPE_CODE.LOGGED_UTILITY_STREAM] if a.name == "$EFS")
    efs_blob = efs_attr.data() if hasattr(efs_attr, "data") else efs_attr.open().read()
    fek_raw, off = unwrap_fek(efs_blob)
    name = os.path.basename(path)
    if not fek_raw:
        print(f"[!] {name}: FEK not recovered")
        continue
    # FEK structure: DWORD keylen, DWORD alg, DWORD ..., BYTE key[]
    klen = struct.unpack_from("<I", fek_raw, 0)[0]
    alg = struct.unpack_from("<I", fek_raw, 4)[0]
    alg = struct.unpack_from("<I", fek_raw, 8)[0]           # CALG is at offset 8
    algname, exp_klen = CALG.get(alg, ("?", 32))
    fek = fek_raw[16:16 + klen]                             # key bytes follow the 16-byte header
    print(f"[3] {name}: FEK @off {off}, alg={alg:#x} ({algname}), key={fek.hex()}")

    # read the encrypted $DATA from the E01 (sector-aligned ciphertext)
    stream = rec.open("")
    ct = stream.read()
    logical = stream.size

    # EFS AES-256: each 512-byte sector is decrypted in CBC mode with the fixed EFS base IV.
    EFS_IV = bytes.fromhex("121316e97b65165861899144bead8919")
    dec = bytearray()
    for s in range(0, len(ct), 512):
        block = ct[s:s + 512]
        n16 = len(block) // 16 * 16
        dec += AES.new(fek, AES.MODE_CBC, EFS_IV).decrypt(block[:n16]) + block[n16:]
    dec = bytes(dec)
    outp = os.path.join(OUT, name)
    open(outp, "wb").write(dec)
    ole_ok = dec[:8] == b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"
    valid = "?"
    try:
        import olefile
        valid = "OLE-valid streams=" + str(len(olefile.OleFileIO(outp).listdir())) if ole_ok else "n/a"
    except Exception as ex:
        valid = f"olefile: {ex}"
    print(f"    [4] DECRYPTED -> {outp} ({len(dec)} B, OLE_header={ole_ok}, {valid})")
