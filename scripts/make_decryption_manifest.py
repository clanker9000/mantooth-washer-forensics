"""Build a decryption manifest for the repo: for every protected evidence file,
record the cipher, credential, the sibling filename, byte sizes and MD5/SHA-1 of
both the on-disk ciphertext original and the decrypted copy.

Usage: python scripts/make_decryption_manifest.py   (run from Case_Work)
Writes: 03_Extracted/DECRYPTION_MANIFEST.csv and .md
"""
import csv, hashlib, io, os

EXT = "03_Extracted"
MAN = os.path.join(EXT, "Mantooth_E01/p0/allocated/Users/Wes Mantooth")
WAS = os.path.join(EXT, "Washer17/p0/allocated/Documents and Settings/Administrator")

# (image, cipher, credential, original_rel, decrypted_rel, truetype)
ITEMS = [
 ("Mantooth.E01", "EFS AES-256 (CALG 0x6610)", "user pw 'tooth'",
  f"{MAN}/Documents/EFS DOCS/John.doc", f"{MAN}/Documents/EFS DOCS/John_decrypted.doc", "Word 97 .doc"),
 ("Mantooth.E01", "EFS AES-256 (CALG 0x6610)", "user pw 'tooth'",
  f"{MAN}/Documents/EFS DOCS/Wes.doc", f"{MAN}/Documents/EFS DOCS/Wes_decrypted.doc", "Word 97 .doc"),
 ("Mantooth.E01", "EFS AES-256 (CALG 0x6610)", "user pw 'tooth'",
  f"{MAN}/Documents/EFS DOCS/CC Nums.xls", f"{MAN}/Documents/EFS DOCS/CC Nums_decrypted.xls", "Excel 97 .xls"),
 ("Mantooth.E01", "EFS AES-256 (CALG 0x6610)", "user pw 'tooth'",
  f"{MAN}/Documents/EFS DOCS/C money plates.doc", f"{MAN}/Documents/EFS DOCS/C money plates_decrypted.doc", "Word 97 .doc"),
 ("Washer 17.E01", "EFS DESX (CALG 0x6604)", "user pw 'meth'",
  f"{WAS}/My Documents/The Dealz.doc", f"{WAS}/My Documents/The Dealz_decrypted.doc", "Word 97 .doc"),
 ("Washer 17.E01", "EFS DESX (CALG 0x6604)", "user pw 'meth'",
  f"{WAS}/My Documents/X marks the spot.doc", f"{WAS}/My Documents/X marks the spot_decrypted.doc", "Word 97 .doc"),
 ("Washer 17.E01", "EFS DESX (CALG 0x6604)", "user pw 'meth'",
  f"{WAS}/My Documents/My Pictures/bad day.jpg", f"{WAS}/My Documents/My Pictures/bad day_decrypted.jpg", "JPEG 430x327"),
 ("Washer 17.E01", "EFS DESX (CALG 0x6604)", "user pw 'meth'",
  f"{WAS}/My Documents/My Pictures/lookalike.jpg", f"{WAS}/My Documents/My Pictures/lookalike_decrypted.jpg", "JPEG 380x307"),
 ("Washer 17.E01", "EFS DESX (CALG 0x6604)", "user pw 'meth'",
  f"{WAS}/My Documents/My Pictures/pee limit.jpg", f"{WAS}/My Documents/My Pictures/pee limit_decrypted.jpg", "PNG 311x415 (ext mislabelled .jpg)"),
 ("Mantooth.E01", "Office 97/2000 RC4 'password to open'", "pw 'smack'",
  f"{MAN}/Desktop/Those who owes.xls", f"{MAN}/Desktop/Those who owes_unprotected.xls", "Excel 97 .xls (drug ledger)"),
]

def digests(p):
    if not os.path.exists(p):
        return ("MISSING", "", "")
    data = open(p, "rb").read()
    return (len(data), hashlib.md5(data).hexdigest(), hashlib.sha1(data).hexdigest())

rows = []
for image, cipher, cred, orig, dec, tt in ITEMS:
    os_, om, osha = digests(orig)
    ds_, dm, dsha = digests(dec)
    rows.append(dict(image=image, cipher=cipher, credential=cred, true_type=tt,
                     original=os.path.basename(orig), original_bytes=os_, original_md5=om,
                     decrypted=os.path.basename(dec), decrypted_bytes=ds_, decrypted_md5=dm,
                     decrypted_sha1=dsha))

csv_path = os.path.join(EXT, "DECRYPTION_MANIFEST.csv")
with open(csv_path, "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
    w.writeheader(); w.writerows(rows)

md_path = os.path.join(EXT, "DECRYPTION_MANIFEST.md")
with open(md_path, "w", encoding="utf-8") as fh:
    fh.write("# Decryption Manifest - Mantooth / Washer\n\n")
    fh.write("Each originally-encrypted evidence file is kept in place; a decrypted copy sits\n")
    fh.write("beside it with a `_decrypted` suffix (the RC4 ledger uses `_unprotected`).\n\n")
    fh.write("| Image | Original | Cipher | Credential | Decrypted copy | True type | Dec. MD5 |\n")
    fh.write("|---|---|---|---|---|---|---|\n")
    for r in rows:
        fh.write(f"| {r['image']} | {r['original']} | {r['cipher']} | {r['credential']} | "
                 f"{r['decrypted']} | {r['true_type']} | `{r['decrypted_md5'][:16]}...` |\n")
    fh.write("\n**Not recovered:** `CRACK_ME` (TrueCrypt AES-XTS volume, Mantooth\\Documents) - "
             "password not in the case word-list; container preserved as-is.\n")
    fh.write("\n**Keys, not ciphertext:** `secring.skr` / `pubring.pkr` (PGP keyrings) - the private "
             "key is passphrase-protected; there is no separate PGP-encrypted message file to decrypt.\n")
    fh.write("\n**Disguised, not encrypted:** `cool tool.piz` and Recycle-Bin `Dc2.piz` are ZIP archives "
             "with a scrambled extension; open them as `.zip`.\n")

print("wrote", csv_path)
print("wrote", md_path)
print()
for r in rows:
    print(f"{r['image'][:12]:12} {r['original'][:28]:28} -> {r['decrypted'][:30]:30} "
          f"{str(r['original_bytes']):>7}->{str(r['decrypted_bytes']):>7}  md5 {r['decrypted_md5'][:12]}")
