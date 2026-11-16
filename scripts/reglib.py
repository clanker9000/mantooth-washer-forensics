"""Thin read-only registry helpers over dissect.regf."""
from datetime import datetime, timezone

from dissect.regf.regf import RegistryHive


def open_hive(path):
    return RegistryHive(open(path, "rb"))


def key(hive, path):
    try:
        return hive.open(path)
    except Exception:
        return None


def val(k, name, default=None):
    if k is None:
        return default
    try:
        return k.value(name).value
    except Exception:
        return default


def values(k):
    if k is None:
        return {}
    out = {}
    try:
        for v in k.values():
            out[v.name] = v.value
    except Exception:
        pass
    return out


def subkeys(k):
    if k is None:
        return []
    try:
        return list(k.subkeys())
    except Exception:
        return []


def kts(k):
    try:
        return k.timestamp.strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return ""


def filetime(v):
    """Convert a Windows FILETIME int or 8-byte LE blob to an ISO string."""
    if v is None:
        return ""
    if isinstance(v, (bytes, bytearray)):
        if len(v) < 8:
            return ""
        v = int.from_bytes(v[:8], "little")
    if not isinstance(v, int) or v <= 0:
        return ""
    try:
        return datetime(1601, 1, 1, tzinfo=timezone.utc).fromtimestamp(
            (v - 116444736000000000) / 1e7, tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return ""
