"""Dictionary attack on a TrueCrypt container header (AES-XTS), fully offline.

TrueCrypt volume: bytes 0-63 = salt, 64-511 = encrypted header. Header key =
PBKDF2(password, salt, iters, 64). Decrypt header with AES-XTS (unit 0); on the
right password the decrypted header begins with ASCII 'TRUE'.

Tries AES-XTS with RIPEMD-160 (2000), SHA-512 (1000) and Whirlpool (1000) PRFs.

Usage: python -I truecrypt_crack.py <container> <wordlist> [extra_pw ...]
"""
import hashlib
import sys

from Crypto.Cipher import AES

vol = open(sys.argv[1], "rb").read()
salt = vol[:64]
enc = vol[64:512]


def xts_decrypt(key1, key2, data, unit=0):
    tweak = AES.new(key2, AES.MODE_ECB).encrypt(unit.to_bytes(16, "little"))
    t = int.from_bytes(tweak, "little")
    ecb = AES.new(key1, AES.MODE_ECB)
    out = bytearray()
    for i in range(0, len(data) // 16 * 16, 16):
        tb = t.to_bytes(16, "little")
        pp = bytes(a ^ b for a, b in zip(data[i:i + 16], tb))
        pp = ecb.decrypt(pp)
        out += bytes(a ^ b for a, b in zip(pp, tb))
        t <<= 1
        if t & (1 << 128):
            t ^= (1 << 128) | 0x87
    return bytes(out)


PRFS = [("ripemd160", 2000), ("sha512", 1000), ("whirlpool", 1000)]


def check(pw):
    pb = pw.encode("utf-8", "ignore")
    for prf, iters in PRFS:
        try:
            dk = hashlib.pbkdf2_hmac(prf, pb, salt, iters, 64)
        except Exception:
            continue
        hdr = xts_decrypt(dk[:32], dk[32:64], enc, 0)
        if hdr[:4] == b"TRUE":
            return prf
    return None


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
    prf = check(w)
    if prf:
        print(f"\n*** CRACKED after {n} tries: password={w!r}  (AES-XTS, {prf}) ***")
        break
    if n % 20000 == 0:
        print(f"  tried {n}...", flush=True)
else:
    print(f"\nno match in {n} candidates (AES-XTS). Container may use Serpent/Twofish or a password not in the list.")
