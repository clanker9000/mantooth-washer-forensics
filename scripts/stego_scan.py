"""Steganography / hidden-data triage: find data appended past a file's logical end,
embedded archive/file signatures, and size/entropy anomalies.

Usage: python -I stego_scan.py <root1> [root2 ...]
"""
import struct
import sys
import zlib
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SIGS = {b"PK\x03\x04": "ZIP", b"Rar!\x1a\x07": "RAR", b"7z\xbc\xaf\x27\x1c": "7z", b"\x1f\x8b\x08": "GZIP",
        b"\xff\xd8\xff": "JPEG", b"\x89PNG": "PNG", b"GIF8": "GIF", b"BM": "BMP",
        b"-----BEGIN": "PGP/PEM", b"\xd0\xcf\x11\xe0": "OLE", b"%PDF": "PDF", b"ID3": "MP3"}


def entropy(data):
    if not data:
        return 0.0
    from collections import Counter
    import math
    c = Counter(data)
    n = len(data)
    return -sum((v / n) * math.log2(v / n) for v in c.values())


def logical_end(data):
    """Return the offset where the file's declared structure ends, or None."""
    if data[:3] == b"\xff\xd8\xff":  # JPEG -> last FFD9
        i = data.rfind(b"\xff\xd9")
        return i + 2 if i >= 0 else None
    if data[:4] == b"\x89PNG":  # PNG -> IEND
        i = data.rfind(b"IEND")
        return i + 8 if i >= 0 else None
    if data[:4] == b"GIF8":  # GIF -> trailing 0x3B
        i = data.rfind(b"\x3b")
        return i + 1 if i >= 0 else None
    if data[:4] == b"RIFF":  # WAV/AVI -> RIFF size field
        size = struct.unpack_from("<I", data, 4)[0]
        return 8 + size
    if data[:2] == b"BM":  # BMP -> size field
        size = struct.unpack_from("<I", data, 2)[0]
        return size
    return None


def find_embedded(data, skip=16):
    hits = []
    for sig, name in SIGS.items():
        start = skip
        while True:
            i = data.find(sig, start)
            if i < 0:
                break
            hits.append((i, name))
            start = i + 1
    return hits


for root in sys.argv[1:]:
    for p in sorted(Path(root).rglob("*")):
        if not p.is_file() or "__ADS__" in p.name or p.name.endswith(".FileSlack"):
            continue
        ext = p.suffix.lower()
        if ext not in (".wav", ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".avi", ".mp3", ".art"):
            continue
        try:
            data = p.read_bytes()
        except OSError:
            continue
        rel = str(p).split("allocated")[-1].lstrip("\\/")
        end = logical_end(data)
        notes = []
        if end is not None and end < len(data) - 2:
            trailer = data[end:]
            notes.append(f"APPENDED {len(trailer)} bytes after logical end (ent={entropy(trailer[:4096]):.1f})")
            emb = find_embedded(trailer, skip=0)
            if emb:
                notes.append("trailer sigs: " + ", ".join(f"{n}@+{o}" for o, n in emb[:4]))
            print("    trailer preview:", bytes(c if 32 <= c < 127 else 46 for c in trailer[:80]).decode())
        # embedded archive inside body (not just trailer)
        emb = [(o, n) for o, n in find_embedded(data) if n in ("ZIP", "RAR", "7z", "PGP/PEM", "PDF")]
        if emb:
            notes.append("embedded: " + ", ".join(f"{n}@{o}" for o, n in emb[:4]))
        if notes:
            print(f"[*] {rel}  ({len(data)} bytes, end={end})")
            for n in notes:
                print("      " + n)
