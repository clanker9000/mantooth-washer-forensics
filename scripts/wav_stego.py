"""Analyse WAV files for LSB-steganography indicators and validate structure.

Usage: python -I wav_stego.py <wav> [<wav> ...]
"""
import struct
import sys
import wave
from collections import Counter
from math import log2
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def ent(bits):
    c = Counter(bits)
    n = len(bits)
    return -sum((v / n) * log2(v / n) for v in c.values()) if n else 0


for arg in sys.argv[1:]:
    p = Path(arg)
    data = p.read_bytes()
    print(f"\n=== {p.name} ({len(data)} bytes)")
    # list RIFF chunks
    off = 12
    chunks = []
    while off + 8 <= len(data):
        cid = data[off:off + 4]
        sz = struct.unpack_from("<I", data, off + 4)[0]
        chunks.append((cid.decode("latin-1"), sz, off))
        off += 8 + sz + (sz & 1)
    print("  chunks:", [(c, s) for c, s, _ in chunks])
    try:
        w = wave.open(str(p), "rb")
        print(f"  format: {w.getnchannels()}ch {w.getsampwidth() * 8}bit {w.getframerate()}Hz "
              f"frames={w.getnframes()} dur={w.getnframes() / w.getframerate():.1f}s")
        frames = w.readframes(w.getnframes())
        w.close()
        if w.getsampwidth() == 2:  # 16-bit samples
            lsbs = [frames[i] & 1 for i in range(0, min(len(frames), 400000), 2)]
            print(f"  LSB entropy (low-byte of samples): {ent(lsbs):.4f} bits  (1.0 = random => possible LSB stego)")
            ones = sum(lsbs)
            print(f"  LSB ones ratio: {ones / len(lsbs):.3f}  (~0.5 can indicate embedded data)")
            # ASCII extracted from LSBs (8 LSBs -> 1 byte)
            bits = [frames[i] & 1 for i in range(0, min(len(frames), 8000))]
            by = bytes(sum(bits[i + k] << (7 - k) for k in range(8)) for i in range(0, len(bits) - 8, 8))
            printable = bytes(c if 32 <= c < 127 else 46 for c in by[:120]).decode()
            print(f"  LSB-as-ASCII (msb-first): {printable}")
            bits2 = [frames[i] & 1 for i in range(0, min(len(frames), 8000))]
            by2 = bytes(sum(bits2[i + k] << k for k in range(8)) for i in range(0, len(bits2) - 8, 8))
            print(f"  LSB-as-ASCII (lsb-first): {bytes(c if 32 <= c < 127 else 46 for c in by2[:120]).decode()}")
    except Exception as exc:  # noqa: BLE001
        print("  wave parse error:", exc)
    # any trailing data after the last chunk
    last_end = chunks[-1][2] + 8 + chunks[-1][1] if chunks else 0
    if last_end < len(data):
        print(f"  trailing {len(data) - last_end} bytes after chunks:",
              bytes(c if 32 <= c < 127 else 46 for c in data[last_end:last_end + 60]).decode())
