"""Minimal read-only AccessData AD1 (logical image) reader, format v3 and v4.

Layout reference: dissect.evidence c_ad1 definitions and the pyad1 format notes.
Segments are memory-mapped read-only; nothing is ever written to the image.
"""
import mmap
import re
import struct
import zlib
from bisect import bisect_right
from datetime import datetime, timezone
from pathlib import Path

META_NAMES = {
    0x1: "ItemContentHashes", 0x2: "FileClass", 0x3: "FileSize", 0x4: "PhysicalSize", 0x6: "StartCluster",
    0x7: "DateAccessed", 0x8: "DateCreated", 0x9: "DateModified", 0xd: "Encrypted", 0xe: "Compressed",
    0x1e: "ActualFile", 0x1f: "StartSector", 0x24: "ADSCount", 0x1001: "ShortFilename", 0x1002: "Hidden",
    0x1003: "System", 0x1004: "ReadOnly", 0x1005: "Archive", 0x5001: "MD5", 0x5002: "SHA1",
    0xa001: "MFTRecordNumber", 0xa002: "MFTDateChanged", 0xa003: "MFTIsResident", 0xa007: "MFTOwnerSid",
    0xa008: "MFTOwnerName", 0xa01c: "FNDateCreated", 0xa01d: "FNDateModified", 0xa01e: "FNDateAccessed",
    0xa01f: "FNDateChanged",
}
T_FILE, T_UNKFILE, T_DELETED, T_DIR = 0, 1, 2, 5


def segments_for(path):
    path = Path(path)
    found = [p for p in path.parent.iterdir()
             if p.stem == path.stem and re.match(r"^\.ad[0-9]+$", p.suffix.lower())]
    return sorted(found, key=lambda p: int(p.suffix[3:]))


def parse_ts(raw):
    if not raw:
        return None
    s = raw.decode("ascii", "replace")
    try:
        fmt = "%Y%m%dT%H%M%S.%f" if "." in s else "%Y%m%dT%H%M%S"
        return datetime.strptime(s, fmt).replace(tzinfo=timezone.utc)
    except ValueError:
        return None


class Entry:
    __slots__ = ("offset", "next", "child", "meta_off", "zlib_meta", "size", "type", "name")

    @property
    def is_dir(self):
        return self.type == T_DIR

    @property
    def is_deleted(self):
        return self.type == T_DELETED


class AD1Image:
    def __init__(self, first_segment):
        self.paths = segments_for(first_segment)
        self._fhs, self._maps, self._ends = [], [], []
        total = 0
        for i, p in enumerate(self.paths):
            fh = open(p, "rb")
            mm = mmap.mmap(fh.fileno(), 0, access=mmap.ACCESS_READ)
            if mm[:15] != b"ADSEGMENTEDFILE":
                raise ValueError(f"bad segment magic in {p}")
            number, count = struct.unpack_from("<II", mm, 24)
            if number != i + 1:
                raise ValueError(f"segment order problem in {p}")
            total += len(mm) - 512
            self._fhs.append(fh)
            self._maps.append(mm)
            self._ends.append(total)
        self.segment_count = count
        self.size = total
        hdr = self.read(0, 48)
        if hdr[:14] != b"ADLOGICALIMAGE":
            raise ValueError("bad logical image magic")
        self.version, _, self.chunk_size = struct.unpack_from("<III", hdr, 16)
        self.metadata_offset, self.first_file_offset, name_len = struct.unpack_from("<QQI", hdr, 28)
        name_at = 48 if self.version < 4 else 92
        self.name = self.read(name_at, name_len).decode("utf-8", "replace")

    def close(self):
        for mm in self._maps:
            mm.close()
        for fh in self._fhs:
            fh.close()

    def read(self, offset, length):
        out = []
        idx = bisect_right(self._ends, offset)
        while length > 0 and idx < len(self._maps):
            start = 0 if idx == 0 else self._ends[idx - 1]
            rel = offset - start
            n = min(length, (self._ends[idx] - start) - rel)
            out.append(self._maps[idx][512 + rel:512 + rel + n])
            offset += n
            length -= n
            idx += 1
        return out[0] if len(out) == 1 else b"".join(out)

    def entry(self, offset):
        e = Entry()
        raw = self.read(offset, 48)
        e.offset = offset
        e.next, e.child, e.meta_off, e.zlib_meta, e.size, e.type, name_len = struct.unpack("<QQQQQII", raw)
        e.name = self.read(offset + 48, name_len).decode("utf-8", "replace")
        return e

    def meta(self, e):
        """Return {meta_type_int: bytes} for an entry."""
        out = {}
        off = e.meta_off
        guard = 0
        while off and guard < 4096:
            nxt, _cat, mtype, mlen = struct.unpack("<QIII", self.read(off, 20))
            out[mtype] = self.read(off + 20, mlen)
            off = nxt
            guard += 1
        return out

    def walk(self):
        """Yield (path, Entry) depth-first, iteratively. Path uses '/' separators."""
        stack = [("", self.first_file_offset)]
        while stack:
            parent, off = stack.pop()
            while off:
                e = self.entry(off)
                path = f"{parent}/{e.name}" if parent else e.name
                yield path, e
                if e.child:
                    stack.append((path, e.child))
                off = e.next

    def chunks(self, e):
        """Yield decompressed data chunks for a file entry."""
        if not e.size or not e.zlib_meta:
            return
        (n,) = struct.unpack("<Q", self.read(e.zlib_meta, 8))
        offs = list(struct.unpack(f"<{n}Q", self.read(e.zlib_meta + 8, 8 * n)))
        # the table holds the start address of each chunk; the last chunk ends where the
        # entry's metadata chain begins
        if offs and offs[-1] != e.meta_off:
            offs.append(e.meta_off)
        for i in range(len(offs) - 1):
            yield zlib.decompress(self.read(offs[i], offs[i + 1] - offs[i]))

    def data(self, e):
        return b"".join(self.chunks(e))
