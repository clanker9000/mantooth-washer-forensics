"""Extract local account NTLM hashes offline from SAM + SYSTEM hives (read-only).

Usage: python -I dump_hashes.py <SYSTEM> <SAM> <label>
"""
import sys

from impacket.examples.secretsdump import LocalOperations, SAMHashes

system, sam, label = sys.argv[1], sys.argv[2], sys.argv[3]
lo = LocalOperations(system)
bootkey = lo.getBootKey()
print(f"# {label}: bootkey={bootkey.hex()}")
collected = []


class Sink(SAMHashes):
    def _SAMHashes__printSecret(self, secret):  # capture instead of only printing
        collected.append(secret)
        print(secret)


s = Sink(sam, bootkey, isRemote=False)
s.dump()
s.finish()
with open(sys.argv[4], "w", encoding="utf-8") as fh:
    fh.write("\n".join(collected) + "\n")
