"""Compact summary of an ntfs_triage CSV: where the user data is, what was deleted, ADS, EFS, odd signatures.

Usage: python -I mft_summary.py <mft.csv> [max_rows]
"""
import sys
from collections import Counter

import pandas as pd

SYSTEM = ("WINDOWS\\", "Program Files\\", "$Extend", "System Volume Information", "Windows\\", "ProgramData\\",
          "Program Files (x86)\\")
MAGIC = {
    "ffd8ff": "jpg", "89504e47": "png", "47494638": "gif", "25504446": "pdf", "504b0304": "zip/ooxml",
    "d0cf11e0": "ole(doc/xls/ppt/msg)", "424d": "bmp", "4d5a": "exe/dll", "52617221": "rar", "377abcaf": "7z",
    "1f8b08": "gz", "7b5c7274": "rtf", "49492a00": "tif", "4d4d002a": "tif", "52494646": "riff(avi/wav)",
    "494433": "mp3", "fffb": "mp3", "3026b275": "asf/wmv/wma", "4c000000": "lnk", "2142444e": "pst",
    "53514c69": "sqlite", "000001ba": "mpg", "000001b3": "mpg", "4f676753": "ogg", "664c6143": "flac",
    "38425053": "psd", "3c3f786d": "xml", "3c68746d": "html", "3c21444f": "html",
}
EXT_OK = {
    "jpg": {"jpg", "jpeg", "jpe", "thm"}, "png": {"png"}, "gif": {"gif"}, "pdf": {"pdf"},
    "zip/ooxml": {"zip", "docx", "xlsx", "pptx", "jar", "odt", "ods", "kmz", "xpi", "apk", "docm", "xlsm"},
    "ole(doc/xls/ppt/msg)": {"doc", "xls", "ppt", "msg", "db", "msi", "dot", "xlt", "pps", "mpp", "vsd", "wps"},
    "bmp": {"bmp", "dib"}, "exe/dll": {"exe", "dll", "sys", "ocx", "scr", "cpl", "drv", "ax", "tlb", "mui", "com",
                                         "acm", "efi", "olb", "ime", "tsp", "nls", "rll", "flt", "msstyles"},
    "rar": {"rar"}, "7z": {"7z"}, "rtf": {"rtf", "doc"},
}


def kind(h):
    if not isinstance(h, str):
        return ""
    for k, v in MAGIC.items():
        if h.startswith(k):
            return v
    return ""


def main():
    path = sys.argv[1]
    cap = int(sys.argv[2]) if len(sys.argv) > 2 else 60
    df = pd.read_csv(path, dtype=str, keep_default_na=False)
    df["size_n"] = pd.to_numeric(df["size"], errors="coerce").fillna(0).astype("int64")
    df["sys"] = df["path"].str.startswith(SYSTEM) | df["path"].str.match(r"^\$[A-Z]")
    df["ext"] = df["path"].str.extract(r"\.([A-Za-z0-9]{1,6})$")[0].fillna("").str.lower()
    df["kind"] = df["header_hex"].map(kind)
    files = df[(df["is_dir"] != "Y")]
    print(f"rows={len(df)} files={len(files)} in_use={sum(df.in_use == 'Y')} deleted={sum(df.in_use == 'N')}")

    top = Counter()
    for p, s in zip(files["path"], files["size_n"]):
        parts = p.split("\\")
        top["\\".join(parts[:2]) if len(parts) > 2 else parts[0] if len(parts) > 1 else "<root>"] += 1
    print("\n-- file counts by top folders --")
    for k, v in top.most_common(25):
        print(f"  {v:6d}  {k}")

    def show(title, sub, cols=("in_use", "size", "si_created", "si_modified", "kind", "path", "stream")):
        print(f"\n-- {title} ({len(sub)}) --")
        for _, r in sub.head(cap).iterrows():
            print("  " + " | ".join(str(r[c]) for c in cols))
        if len(sub) > cap:
            print(f"  ... {len(sub) - cap} more")

    user = files[~files["sys"] & (files["in_use"] == "Y") & (files["stream"] == "")]
    show("allocated user-area files", user.sort_values("path"))
    dele = files[(files["in_use"] == "N") & (files["size_n"] > 0)]
    print("\n-- deleted files with data: extension counts --")
    print("  ", dict(Counter(dele["ext"]).most_common(20)))
    show("deleted files with data (non-system paths first)", dele.sort_values(["sys", "path"]))
    ads = files[(files["stream"] != "")]
    show("alternate data streams", ads)
    enc = files[files["encrypted"] == "Y"]
    show("EFS-encrypted streams", enc)
    mism = files[(files["kind"] != "") & (files["stream"] == "")]
    mism = mism[[k in EXT_OK and e not in EXT_OK[k] for k, e in zip(mism["kind"], mism["ext"])]]
    show("signature / extension mismatches", mism[~mism["sys"]])
    print(f"   (plus {len(mism[mism['sys']])} in system paths)")


if __name__ == "__main__":
    main()
