"""Recover Firefox (NSS key3.db + signons2.txt) saved passwords, blank master password.

Locates the PBE DER items by the pbeWithSHA1And3KeyTripleDES-CBC OID, brute-forces
the global-salt window, validates against the 'password-check' record, then recovers
the 3DES master key and decrypts the saved logins.

Usage: python -I firefox_pwd.py <profile_dir>
"""
import hashlib
import hmac
import sys
from base64 import b64decode
from pathlib import Path

from Crypto.Cipher import DES3

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
prof = Path(sys.argv[1])
key3 = (prof / "key3.db").read_bytes()

OID = bytes.fromhex("2a864886f70d010c050103")  # pbeWithSHA1And3-KeyTripleDES-CBC


def der_len(b, i):
    ln = b[i]
    i += 1
    if ln & 0x80:
        n = ln & 0x7F
        ln = int.from_bytes(b[i:i + n], "big")
        i += n
    return ln, i


def take(b, i):
    tag = b[i]
    ln, j = der_len(b, i + 1)
    return tag, b[j:j + ln], j + ln


def parse_pbe_item(der):
    """der = SEQUENCE { SEQUENCE { OID, SEQUENCE { OCTET entrySalt, INT iter } }, OCTET cipher }"""
    _, outer, _ = take(der, 0)
    _, algo, after_algo = take(outer, 0)
    _, _oid, j = take(algo, 0)
    _, params, _ = take(algo, j)
    _, entry_salt, _ = take(params, 0)
    _, cipher, _ = take(outer, after_algo)
    return entry_salt, cipher


def find_pbe_items(blob):
    """Find every SEQUENCE wrapping the PBE OID; return list of (entry_salt, cipher, der)."""
    items = []
    start = 0
    while True:
        p = blob.find(OID, start)
        if p < 0:
            break
        start = p + 1
        # walk backwards to the enclosing outer SEQUENCE (0x30) whose length spans past the OID
        for back in range(p, max(0, p - 60), -1):
            if blob[back] == 0x30:
                try:
                    ln, after = der_len(blob, back + 1)
                    if after + ln <= len(blob) and back + 1 < p < after + ln:
                        der = blob[back:after + ln]
                        es, ci = parse_pbe_item(der)
                        if ci:
                            items.append((es, ci, der, back))
                            break
                except Exception:
                    pass
    return items


def moz_3des(global_salt, password, entry_salt, cipher):
    hp = hashlib.sha1(global_salt + password).digest()
    pes = entry_salt + b"\x00" * (20 - len(entry_salt))
    chp = hashlib.sha1(hp + entry_salt).digest()
    k1 = hmac.new(chp, pes + entry_salt, hashlib.sha1).digest()
    tk = hmac.new(chp, pes, hashlib.sha1).digest()
    k2 = hmac.new(chp, tk + entry_salt, hashlib.sha1).digest()
    k = k1 + k2
    key, iv = k[:24], k[-8:]
    return DES3.new(key, DES3.MODE_CBC, iv).decrypt(cipher)


items = find_pbe_items(key3)
print(f"PBE DER items found in key3.db: {len(items)}")
for es, ci, der, off in items:
    print(f"  off={off} entry_salt={es.hex()} cipher_len={len(ci)}")


def unpad(pt):
    pad = pt[-1]
    if 1 <= pad <= 8 and all(b == pad for b in pt[-pad:]):
        return pt[:-pad]
    return None


def isolate_key(dec):
    """From the decrypted key item (a DER SEQUENCE), return the trailing 24-byte 3DES key."""
    _, seq, _ = take(dec, 0)
    i, last = 0, None
    while i < len(seq):
        _tag, val, i = take(seq, i)
        last = val
    return last[-24:] if last and len(last) >= 24 else None


# Brute-force the global-salt (16/20-byte window) against the key item; validate by DER + key length.
es, ci, der, off = items[0]
global_salt = None
master_key = None
for size in (20, 16):
    for i in range(0, len(key3) - size):
        gs = key3[i:i + size]
        try:
            dec = moz_3des(gs, b"", es, ci)
        except Exception:
            continue
        pt = unpad(dec)
        if not pt or not pt or pt[0] != 0x30:
            continue
        try:
            _, body, end = take(pt, 0)
            if end != len(pt):
                continue
            mk = isolate_key(pt)
        except Exception:
            continue
        if mk and len(mk) == 24:
            global_salt, master_key = gs, mk
            print(f"\n>>> global-salt @ off {i} ({size}B): {gs.hex()}")
            print(f">>> decrypted key-item plaintext ({len(pt)}B): {pt.hex()}")
            break
    if master_key:
        break

if not master_key:
    print("\n>>> Could not recover the master key with a blank master password.")
    sys.exit(0)

# The decrypted key item is PKCS#8 PrivateKeyInfo wrapping the NSS key material:
#   SEQ{ INT 0, AlgId{rsaEncryption}, OCTET{ SEQ{ INT 0, INT keyid(16), INT 0, INT key(24) } } }
# The final INTEGER (24 bytes, strip a leading 0x00) is the 3DES master key.
pt_dec = unpad(moz_3des(global_salt, b"", es, ci))
_, seq, _ = take(pt_dec, 0)              # SEQ body
i0 = 0
_, _ver, i0 = take(seq, i0)              # INT 0
_, _alg, i0 = take(seq, i0)              # AlgorithmIdentifier
_, inner_oct, _ = take(seq, i0)          # OCTET STRING -> inner SEQUENCE
_, inner, _ = take(inner_oct, 0)
ints, j = [], 0
while j < len(inner):
    tag, val, j = take(inner, j)
    if tag == 0x02:
        ints.append(val)
keyid = next((v for v in ints if len(v) in (16, 17)), b"")
master_key = max(ints, key=len)[-24:]
print(f">>> 3DES master key: {master_key.hex()}")
print(f">>> keyid in key3.db: {keyid.hex()}")

# Decrypt signons2.txt entries.
def dec_b64(s):
    raw = b64decode(s)
    # ASN.1 SEQ { OCTET keyid(16), SEQ{OID des-ede3-cbc, OCTET iv(8)}, OCTET cipher }
    _, seq, _ = take(raw, 0)
    _, _keyid, j = take(seq, 0)
    _, algo, j2 = take(seq, j)
    _, cipher, _ = take(seq, j2)
    _, _oid, k = take(algo, 0)
    _, iv, _ = take(algo, k)
    pt = DES3.new(master_key, DES3.MODE_CBC, iv).decrypt(cipher)
    pad = pt[-1]
    if 1 <= pad <= 8:
        pt = pt[:-pad]
    return pt.decode("latin-1", "replace")


lines = (prof / "signons2.txt").read_text("latin-1").splitlines()
print("\n== signons2.txt decrypted ==")
i = 1  # skip '#2d'
host = None
while i < len(lines):
    ln = lines[i].strip()
    if ln == "." or ln == "":
        i += 1
        continue
    if ln.startswith("http") or "://" in ln:
        host = ln
        i += 1
        continue
    # expect: fieldname, b64value, *fieldname, b64value
    if host and i + 3 < len(lines):
        try:
            ufield = lines[i].strip()
            uval = dec_b64(lines[i + 1].strip())
            pfield = lines[i + 2].strip().lstrip("*")
            pval = dec_b64(lines[i + 3].strip())
            print(f"  {host}  [{ufield}] {uval!r}   [{pfield}] {pval!r}")
            i += 4
            continue
        except Exception:
            pass
    i += 1
