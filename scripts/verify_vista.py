import sys

from Crypto.Hash import MD4


def n(p):
    return MD4.new(p.encode("utf-16le")).hexdigest()


wes_vista = "4f892a810f871bc64ddc16b9322204e9"
dracula = "d90d8508030c90473114bd90eff3fe9e"
print("Wes Mantooth (Vista):", wes_vista, "== NTLM('tooth')?", n("tooth") == wes_vista)
print("\nCracking Dracula hash", dracula)
cands = ["dracula", "Dracula", "DRACULA", "vampire", "count", "countdracula", "transylvania", "blood",
         "bloodsucker", "nosferatu", "vlad", "vladimpaler", "impaler", "bat", "bats", "coffin", "night",
         "garlic", "stake", "fang", "fangs", "bite", "undead", "laurent", "volturi", "molar", "tooth",
         "incisor", "123456", "password", "drac", "vampyre", "lugosi", "bela", "renfield", "lucy", "mina",
         "jonathan", "harker", "vanhelsing", "castle", "darkness", "immortal", "eternal"]
for c in cands:
    for v in {c, c.capitalize(), c.upper(), c + "1", c + "123"}:
        if n(v) == dracula:
            print("  Dracula password =", repr(v))
            sys.exit(0)
print("  Dracula: not in themed set")
