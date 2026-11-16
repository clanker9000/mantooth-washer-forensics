"""Dictionary attack on a PGP/GnuPG v4 secret key (secring), fully offline.

Parses the Secret-Key packet, runs the String-to-Key (S2K) specifier for each
candidate passphrase, decrypts the secret MPIs (cipher in CFB mode) and verifies
the trailing checksum (SHA-1 for S2K-usage 254, 2-byte sum for 255).

Usage: python -I pgp_crack.py <secring> <wordlist> [extra_pw ...]
"""
import hashlib
import sys

from Crypto.Cipher import AES, CAST, DES3

HASHES = {1: "md5", 2: "sha1", 3: "ripemd160", 8: "sha256", 9: "sha384", 10: "sha512", 11: "sha224"}
CIPH = {3: ("CAST5", 16, 8), 7: ("AES128", 16, 16), 8: ("AES192", 24, 16), 9: ("AES256", 32, 16), 2: ("3DES", 24, 8)}

raw = open(sys.argv[1], "rb").read()

# --- parse first Secret-Key packet (old format, tag 5) ---
b0 = raw[0]
assert not (b0 & 0x40), "expected old-format packet"
lt = b0 & 3
if lt == 0:
    plen, hdr = raw[1], 2
elif lt == 1:
    plen, hdr = int.from_bytes(raw[1:3], "big"), 3
else:
    plen, hdr = int.from_bytes(raw[1:5], "big"), 5
body = raw[hdr:hdr + plen]

assert body[0] == 4, "only v4 handled"
pubalgo = body[5]
o = 6


def read_mpi(buf, o):
    bits = int.from_bytes(buf[o:o + 2], "big")
    n = (bits + 7) // 8
    return o + 2 + n


# skip public MPIs: RSA -> n, e ; DSA -> p,q,g,y ; ElGamal -> p,g,y
npub = {1: 2, 16: 3, 17: 4}.get(pubalgo, 2)
for _ in range(npub):
    o = read_mpi(body, o)

usage = body[o]; o += 1
if usage in (254, 255):
    sym = body[o]; o += 1
    s2k_type = body[o]; o += 1
    hash_id = body[o]; o += 1
    salt = b""
    count = 0
    if s2k_type in (1, 3):
        salt = body[o:o + 8]; o += 8
    if s2k_type == 3:
        c = body[o]; o += 1
        count = (16 + (c & 15)) << ((c >> 4) + 6)
else:
    sym = usage
    s2k_type, hash_id, salt, count = 0, 1, b"", 0

cname, keylen, ivlen = CIPH[sym]
hname = HASHES[hash_id]
iv = body[o:o + ivlen]; o += ivlen
enc = body[o:]
print(f"PGP secret key: pubalgo={pubalgo} cipher={cname} S2K-type={s2k_type} hash={hname} "
      f"salt={salt.hex()} count={count} usage={usage} enc_len={len(enc)}")


def s2k(pw):
    pb = pw.encode("utf-8", "ignore")
    out = b""
    ctx = 0
    while len(out) < keylen:
        h = hashlib.new(hname)
        h.update(b"\x00" * ctx)
        if s2k_type == 0:
            h.update(pb)
        elif s2k_type == 1:
            h.update(salt + pb)
        else:  # iterated-salted
            data = salt + pb
            cnt = max(count, len(data))
            full = (data * (cnt // len(data) + 1))[:cnt]
            h.update(full)
        out += h.digest()
        ctx += 1
    return out[:keylen]


def decrypt(pw):
    key = s2k(pw)
    if cname.startswith("AES"):
        c = AES.new(key, AES.MODE_CFB, iv, segment_size=128)
    elif cname == "CAST5":
        c = CAST.new(key, CAST.MODE_CFB, iv, segment_size=64)
    else:
        c = DES3.new(key, DES3.MODE_CFB, iv, segment_size=64)
    return c.decrypt(enc)


def valid(pt):
    if usage == 254:
        return hashlib.sha1(pt[:-20]).digest() == pt[-20:]
    if usage == 255:
        s = sum(pt[:-2]) & 0xFFFF
        return s == int.from_bytes(pt[-2:], "big")
    return False


def words():
    yield from sys.argv[3:]
    with open(sys.argv[2], "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            w = line.rstrip("\n")
            if w:
                yield w


n = 0
for w in words():
    n += 1
    try:
        if valid(decrypt(w)):
            print(f"\n*** CRACKED after {n} tries: passphrase={w!r} ***")
            break
    except Exception:
        pass
    if n % 20000 == 0:
        print(f"  tried {n}...", flush=True)
else:
    print(f"\nno match in {n} candidates.")
