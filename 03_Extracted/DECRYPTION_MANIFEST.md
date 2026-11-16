# Decryption Manifest - Mantooth / Washer

Each originally-encrypted evidence file is kept in place; a decrypted copy sits
beside it with a `_decrypted` suffix (the RC4 ledger uses `_unprotected`).

| Image | Original | Cipher | Credential | Decrypted copy | True type | Dec. MD5 |
|---|---|---|---|---|---|---|
| Mantooth.E01 | John.doc | EFS AES-256 (CALG 0x6610) | user pw 'tooth' | John_decrypted.doc | Word 97 .doc | `c904d9b41fd5bf7d...` |
| Mantooth.E01 | Wes.doc | EFS AES-256 (CALG 0x6610) | user pw 'tooth' | Wes_decrypted.doc | Word 97 .doc | `ff93fab270f83353...` |
| Mantooth.E01 | CC Nums.xls | EFS AES-256 (CALG 0x6610) | user pw 'tooth' | CC Nums_decrypted.xls | Excel 97 .xls | `9f845165201a6218...` |
| Mantooth.E01 | C money plates.doc | EFS AES-256 (CALG 0x6610) | user pw 'tooth' | C money plates_decrypted.doc | Word 97 .doc | `a07859c56a720660...` |
| Washer 17.E01 | The Dealz.doc | EFS DESX (CALG 0x6604) | user pw 'meth' | The Dealz_decrypted.doc | Word 97 .doc | `28a94720dd946c55...` |
| Washer 17.E01 | X marks the spot.doc | EFS DESX (CALG 0x6604) | user pw 'meth' | X marks the spot_decrypted.doc | Word 97 .doc | `00a69bd0afee9482...` |
| Washer 17.E01 | bad day.jpg | EFS DESX (CALG 0x6604) | user pw 'meth' | bad day_decrypted.jpg | JPEG 430x327 | `28e58d0360f368ad...` |
| Washer 17.E01 | lookalike.jpg | EFS DESX (CALG 0x6604) | user pw 'meth' | lookalike_decrypted.jpg | JPEG 380x307 | `860a2b99b9a7b422...` |
| Washer 17.E01 | pee limit.jpg | EFS DESX (CALG 0x6604) | user pw 'meth' | pee limit_decrypted.jpg | PNG 311x415 (ext mislabelled .jpg) | `784c8570916dca6b...` |
| Mantooth.E01 | Those who owes.xls | Office 97/2000 RC4 'password to open' | pw 'smack' | Those who owes_unprotected.xls | Excel 97 .xls (drug ledger) | `c0dea5657486dd48...` |

**Not recovered:** `CRACK_ME` (TrueCrypt AES-XTS volume, Mantooth\Documents) - password not in the case word-list; container preserved as-is.

**Keys, not ciphertext:** `secring.skr` / `pubring.pkr` (PGP keyrings) - the private key is passphrase-protected; there is no separate PGP-encrypted message file to decrypt.

**Disguised, not encrypted:** `cool tool.piz` and Recycle-Bin `Dc2.piz` are ZIP archives with a scrambled extension; open them as `.zip`.
