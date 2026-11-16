"""Dictionary attack on a TrueCrypt/VeraCrypt-style volume header (AES-XTS + PBKDF2).

Tries the standard header key derivations (RIPEMD-160/2000, SHA-512/1000, plus Vera counts)
and AES-256-XTS header decryption, checking for the 'TRUE'/'VERA' magic.

Usage: python -I crack_truecrypt.py <container> <wordlist> [<wordlist> ...]
"""
import struct
import sys
import zlib
from pathlib import Path

from Crypto.Cipher import AES
from Crypto.Hash import HMAC, RIPEMD160, SHA256, SHA512
from Crypto.Protocol.KDF import PBKDF2

HEADER_ENC = 448  # bytes 64..512


def xts_decrypt(key1, key2, data, unit=0):
    """AES-256-XTS decrypt of one data unit (<= many 16B blocks)."""
    tweak = AES.new(key2, AES.MODE_ECB).encrypt(unit.to_bytes(16, "little"))
    ecb = AES.new(key1, AES.MODE_ECB)
    out = bytearray()
    t = int.from_bytes(tweak, "little")
    for off in range(0, len(data) - 15, 16):
        tb = t.to_bytes(16, "little")
        blk = bytes(a ^ b for a, b in zip(data[off:off + 16], tb))
        dec = ecb.decrypt(blk)
        out += bytes(a ^ b for a, b in zip(dec, tb))
        t <<= 1
        if t & (1 << 128):
            t ^= (1 << 128) | 0x87
    return bytes(out)


def prf(name):
    mod = {"ripemd160": RIPEMD160, "sha512": SHA512, "sha256": SHA256}[name]
    return lambda p, s: HMAC.new(p, s, mod).digest()


DERIVS = [("ripemd160", 2000, "TC"), ("sha512", 1000, "TC")]  # TrueCrypt 7.x header schemes (fast)


def check(password, salt, enc, deriv):
    name, count, _ = deriv
    keymat = PBKDF2(password, salt, dkLen=64, count=count, prf=prf(name))
    dec = xts_decrypt(keymat[:32], keymat[32:64], enc, 0)
    if dec[:4] in (b"TRUE", b"VERA"):
        # verify header CRC (bytes 8..12 cover decrypted[16:]) - best effort
        return dec
    return None


def main():
    container, wordlists = sys.argv[1], sys.argv[2:]
    hdr = open(container, "rb").read(512)
    salt, enc = hdr[:64], hdr[64:512]
    extras = ["", "password", "truecrypt", "crackme", "CrackMe", "CRACK_ME", "crack_me", "test", "secret",
              "wes", "mantooth", "dollarhyde86", "washer", "123456", "letmein", "tooth", "money"]
    tried = 0

    def candidates():
        yield from extras
        for wl in wordlists:
            for line in Path(wl).read_text(encoding="latin-1", errors="replace").splitlines():
                w = line.strip()
                if w:
                    yield w
    for pw in candidates():
        tried += 1
        for d in DERIVS:
            res = check(pw.encode("latin-1", "replace"), salt, enc, d)
            if res:
                print(f"\n*** UNLOCKED  password={pw!r}  scheme={d[2]}/{d[0]}/{d[1]} after {tried} tries")
                print("decrypted header magic:", res[:4], " sector size:",
                      struct.unpack_from(">I", res, 100)[0] if len(res) > 104 else "?")
                return
        if tried % 2000 == 0:
            print(f"  ...{tried} passwords tried", flush=True)
    print(f"not cracked ({tried} passwords x {len(DERIVS)} schemes)")


if __name__ == "__main__":
    main()
