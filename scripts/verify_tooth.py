from Crypto.Hash import MD4


def n(p):
    return MD4.new(p.encode("utf-16le")).hexdigest()


wes = "511bc1d639f5321653e6f82c1a08b134"
print("Wes Mantooth NTLM target:", wes)
print("NTLM('tooth')           :", n("tooth"), "== MATCH" if n("tooth") == wes else "== NO MATCH")
for c in ["tooth", "Tooth", "TOOTH", "tooth1", "tooth123", "inyourface", "in your face", "face",
          "molar", "incisor", "molarman420", "incisorman420", "supercallifragilistic"]:
    print(f"  {c:22s} {n(c)} {'MATCH' if n(c) == wes else ''}")
