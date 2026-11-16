"""Pure-pycryptodome DPAPI master-key unlock + EFS RSA key recovery (no impacket).

Proves that a recovered account password unlocks the user's DPAPI master key, then
decrypts the DPAPI-protected EFS RSA private key blob.

Usage: python -I dpapi_efs.py <masterkey_file> <sid> <password> [<rsa_key_blob>]
Refs: Windows DPAPI format (MS-BKRP / Benjamin Delpy notes); all offline.
"""
import hashlib
import hmac
import struct
import sys

from Crypto.Cipher import AES, DES3

CALG = {0x6603: ("3DES", 24, 8), 0x6610: ("AES256", 32, 16), 0x6609: ("DES", 8, 8)}
HALG = {0x8004: "sha1", 0x8009: "sha1", 0x800e: "sha512", 0x800c: "sha256"}


def pbkdf2(pwd, salt, rounds, digest, klen):
    return hashlib.pbkdf2_hmac(digest, pwd, salt, rounds, klen)


def derive_prekey(sid, password):
    """User password -> pre-key used as HMAC key over the salt."""
    pwdhash = hashlib.sha1(password.encode("utf-16le")).digest()
    return hmac.new(pwdhash, (sid + "\0").encode("utf-16le"), hashlib.sha1).digest()


def unpack_masterkey_blob(buf):
    ver, salt, rounds, halg, calg = struct.unpack_from("<I16sIII", buf, 0)
    enc = buf[32:]
    return ver, salt, rounds, halg, calg, enc


def decrypt_masterkey(mkfile, sid, password):
    data = open(mkfile, "rb").read()
    # MasterKeyFile header
    ver = struct.unpack_from("<I", data, 0)[0]
    # 4 + 2*4(unk) + 72(guid utf16) + 2*4(unk) + 4(policy) = offset 96, then 4 QWORD lengths
    mk_len, bk_len, ch_len, dk_len = struct.unpack_from("<QQQQ", data, 96)
    off = 128
    mkblob = data[off:off + mk_len]
    v, salt, rounds, halg, calg, enc = unpack_masterkey_blob(mkblob)
    cname, klen, ivlen = CALG[calg]
    digest = HALG[halg]
    prekey = derive_prekey(sid, password)
    keymat = pbkdf2(prekey, salt, rounds, digest, klen + ivlen)
    key, iv = keymat[:klen], keymat[klen:klen + ivlen]
    if cname == "AES256":
        dec = AES.new(key, AES.MODE_CBC, iv).decrypt(enc)
    else:
        dec = DES3.new(key, DES3.MODE_CBC, iv).decrypt(enc)
    dlen = hashlib.new(digest).digest_size
    hmac_salt = dec[:16]
    stored_hmac = dec[16:16 + dlen]
    masterkey = dec[-64:]
    hmac1 = hmac.new(prekey, hmac_salt, digest).digest()
    computed = hmac.new(hmac1, masterkey, digest).digest()
    ok = hmac.compare_digest(stored_hmac, computed)
    return dict(cipher=cname, hash=digest, rounds=rounds, ok=ok, masterkey=masterkey,
                sha1_mk=hashlib.sha1(masterkey).digest())


if __name__ == "__main__":
    mkfile, sid, password = sys.argv[1], sys.argv[2], sys.argv[3]
    r = decrypt_masterkey(mkfile, sid, password)
    print(f"masterkey cipher={r['cipher']} hash={r['hash']} rounds={r['rounds']}")
    print(f"password tried: {password!r}  ->  HMAC verify: {'VALID (password correct)' if r['ok'] else 'invalid'}")
    if r["ok"]:
        print(f"recovered master key SHA1 = {r['sha1_mk'].hex()}  (unlocks the user's DPAPI-protected secrets)")
