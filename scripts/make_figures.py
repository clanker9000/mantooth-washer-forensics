"""Generate presentation/report figures (PNG) for the Mantooth/Washer case.

Usage: python -I make_figures.py <case_work_dir>
"""
import csv
import re
import sys
import textwrap
from collections import Counter
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
CW = Path(sys.argv[1])
A = CW / "04_Analysis"
FIG = CW / "05_Report" / "figures"
FIG.mkdir(parents=True, exist_ok=True)

# Okabe-Ito colourblind-safe palette + neutral ink
INK, MUTED, SURFACE, GRID = "#1a1a1a", "#5f6368", "#ffffff", "#d9dce1"
BLUE, ORANGE, GREEN, VERMIL, PURPLE, SKY = "#0072B2", "#E69F00", "#009E73", "#D55E00", "#CC79A7", "#56B4E9"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 11, "axes.edgecolor": GRID, "axes.labelcolor": INK,
    "text.color": INK, "xtick.color": MUTED, "ytick.color": MUTED, "axes.titleweight": "bold",
    "figure.facecolor": SURFACE, "axes.facecolor": SURFACE, "savefig.facecolor": SURFACE,
    "savefig.dpi": 170, "axes.titlecolor": INK,
})


def save(fig, name):
    out = FIG / name
    fig.savefig(out, bbox_inches="tight", pad_inches=0.25)
    plt.close(fig)
    print("wrote", out)


def node(ax, x, y, w, h, title, sub, color):
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h, boxstyle="round,pad=0.06,rounding_size=0.14",
                                linewidth=2.2, edgecolor=color, facecolor=SURFACE, zorder=3))
    ax.text(x, y + h * 0.16, title, ha="center", va="center", fontsize=11.5, fontweight="bold", zorder=4)
    ax.text(x, y - h * 0.2, sub, ha="center", va="center", fontsize=8.6, color=MUTED, zorder=4)


def edge(ax, p1, p2, color, label, lpos, dashed=False, lw=2.6):
    ax.add_patch(FancyArrowPatch(p1, p2, arrowstyle="-", linewidth=lw, color=color, zorder=1,
                                 linestyle=(0, (5, 4)) if dashed else "-"))
    ax.text(*lpos, label, ha="center", va="center", fontsize=8.8, zorder=5, color=INK,
            bbox=dict(boxstyle="round,pad=0.3", fc=SURFACE, ec=color, lw=1.2))


# ---------------- email data (shared by figs 2 & 6) ----------------
PEOPLE = {"chkwasher": "John Washer", "dollarhyde86": "Wes Mantooth", "txkidd": "“Rasco Badguy”",
          "smee.rox": "Mr Smee", "skimmerman27": "David Thomas"}


def handles(s):
    return [h for h in PEOPLE if h in s.replace(" ", "")]


msgs = {}
with open(A / "email_headers.csv", newline="", encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        if not r["date"]:
            continue
        snd = handles(r["from"])
        if not snd:
            continue
        key = (re.sub(r"\s+", " ", r["date"])[:31], snd[0])
        m = msgs.setdefault(key, {"from": snd[0], "to": set(), "devices": set()})
        m["to"].update(h for h in handles(r["to"]) if h != snd[0])
        m["devices"].add(r["device"])
shared_msgs = sum(1 for m in msgs.values() if {"Washer17", "Mantooth_E01"} <= m["devices"])
print(f"case-party messages={len(msgs)}  found on BOTH Washer PC and Mantooth drive={shared_msgs}")


# ---------------- Figure 1: integrity ----------------
def fig_integrity():
    rows = [
        ("Thumbdrive 05.E01", "FAT32 USB — seized from suspect", "40fc41a365f6d1c3f524661dc06eb912", "VERIFIED"),
        ("Washer 17.E01", "NTFS HDD — office PC WASHER1", "147307d626aa2c090bd6abfe4a9a1909", "VERIFIED"),
        ("Mantooth.E01", "NTFS — Vista PC, volume MANTOOTH", "31217210a1a69f272079a3bde3d9d8fc", "VERIFIED"),
    ]
    fig, ax = plt.subplots(figsize=(11.5, 3.3))
    ax.axis("off")
    ax.set_title("Figure 1  —  Evidence integrity: acquisition hashes recomputed from the working copies",
                 loc="left", pad=12)
    xs = [0.0, 0.2, 0.52, 0.87]
    for x, h in zip(xs, ["Image", "Description", "Media MD5 recomputed = logged", "Result"]):
        ax.text(x, 0.93, h, fontsize=10.5, fontweight="bold", transform=ax.transAxes)
    ax.plot([0, 1], [0.87, 0.87], color=GRID, lw=1, transform=ax.transAxes)
    for i, (img, desc, md5, st) in enumerate(rows):
        y = 0.76 - i * 0.16
        ax.text(xs[0], y, img, fontsize=10, transform=ax.transAxes, family="DejaVu Sans Mono")
        ax.text(xs[1], y, desc, fontsize=9.4, transform=ax.transAxes, color=MUTED)
        ax.text(xs[2], y, md5, fontsize=9.2, transform=ax.transAxes, family="DejaVu Sans Mono")
        ax.text(xs[3], y, "✓ " + st, fontsize=10, transform=ax.transAxes, color=GREEN, fontweight="bold")
    ax.text(0.0, 0.06,
            "Baseline: 157/157 supplied files hashed (MD5, SHA-1, SHA-256) before analysis; working copies byte-identical "
            "(0 mismatches). Each E01 media hash recomputed from the working copy equals the value in its FTK Imager "
            "acquisition log.",
            fontsize=8.3, transform=ax.transAxes, color=MUTED, va="top")
    save(fig, "fig1_integrity.png")


# ---------------- Figure 2: device links ----------------
def fig_devices():
    fig, ax = plt.subplots(figsize=(11.5, 6.2))
    ax.axis("off")
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 7.0)
    ax.set_title("Figure 2  —  Links between the three seized devices (identical files by MD5, shared e-mail)",
                 loc="left", pad=10)
    T, MU, W = (2.2, 5.4), (9.8, 5.4), (6.0, 1.3)
    edge(ax, T, MU, PURPLE, "4 identical files\n(debtor spreadsheet, images)", (6.0, 5.85))
    edge(ax, T, W, PURPLE, "2 KFF-named images\nDELETED on Washer", (2.7, 3.2))
    edge(ax, MU, W, VERMIL, f"same 2 images + {shared_msgs} identical\ne-mails on both devices", (9.3, 3.2))
    edge(ax, W, MU, VERMIL, "Washer’s own drive (serial 50172777)\nmounted on Mantooth’s machine, 2008-02-12",
         (6.0, 3.95), lw=2.4)
    node(ax, *T, 3.6, 1.5, "Thumbdrive 05", "FAT32 USB · seized at arrest", BLUE)
    node(ax, *MU, 3.6, 1.5, "Mantooth.E01", "Vista drive · volume ‘MANTOOTH’", ORANGE)
    node(ax, *W, 3.6, 1.5, "Washer office PC", "Windows XP · WASHER1 · John Washer", GREEN)
    save(fig, "fig2_device_links.png")


# ---------------- Figure 3: USB history ----------------
def fig_usb():
    devs = [("SanDisk Cruzer Mini", "20041101101b4bc0091b", True), ("SanDisk Cruzer Mini", "20043512300C4E62C465", True),
            ("SanDisk Cruzer Mini", "20043513310C7A22D0C8", True), ("Apple iPod", "000A270014B302AB", False),
            ("Flash Drive UT_USB20", "0000000000C9BA", False), ("TREK TD2SMART G3M", "10120515511949", False)]
    fig, ax = plt.subplots(figsize=(11.5, 3.9))
    ax.axis("off")
    ax.set_title("Figure 3  —  USB storage devices recorded on the Washer office PC "
                 "(SYSTEM\\ControlSet001\\Enum\\USBSTOR)", loc="left", pad=12)
    for x, h in ((0.0, "Device (vendor / product)"), (0.36, "Device instance serial")):
        ax.text(x, 0.92, h, fontsize=10.5, fontweight="bold", transform=ax.transAxes)
    ax.plot([0, 1], [0.86, 0.86], color=GRID, lw=1, transform=ax.transAxes)
    for i, (d, s, flag) in enumerate(devs):
        y = 0.76 - i * 0.115
        ax.text(0.0, y, ("▶ " if flag else "   ") + d, fontsize=10, transform=ax.transAxes,
                color=BLUE if flag else INK, fontweight="bold" if flag else "normal")
        ax.text(0.36, y, s, fontsize=9.6, transform=ax.transAxes, family="DejaVu Sans Mono")
    ax.text(0.0, 0.03, "▶ All three case images were acquired from a ‘SanDisk Cruzer Mini USB Device’ "
            "(FTK Imager logs). The Washer PC records three distinct Cruzer Mini serials.\nThe acquisition logs do not "
            "record the drives’ own serials, so a serial-for-serial match cannot be made — this shows model "
            "consistency only.", fontsize=8.4, transform=ax.transAxes, color=MUTED, va="top")
    save(fig, "fig3_usb.png")


# ---------------- Figure 4: keyword hits ----------------
def fig_keywords():
    data = {}
    with open(A / "keyword_hits.csv", newline="", encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            data.setdefault(r["image"], {})[r["term"]] = int(r["total_hits"])
    terms = ["txkidd", "chkwasher", "dollarhyde86", "rasco", "badguy", "washer", "john", "mantooth", "wes"]
    images = [("Washer 17.E01", GREEN), ("Mantooth.E01", ORANGE), ("Thumbdrive 05.E01", BLUE)]
    x = np.arange(len(terms))
    w = 0.26
    fig, ax = plt.subplots(figsize=(11.5, 5.0))
    for i, (img, c) in enumerate(images):
        vals = [data.get(img, {}).get(t, 0) for t in terms]
        ax.bar(x + (i - 1) * w, [min(v, 1000) for v in vals], w * 0.92, label=img, color=c, zorder=3)
    ax.set_xticks(x)
    ax.set_xticklabels(terms, fontsize=10)
    ax.set_ylabel("Raw hits (ASCII + UTF-16LE); bars capped at 1,000")
    ax.set_title("Figure 4  —  Case keyword list searched across full image streams (allocated + unallocated)",
                 loc="left", pad=12)
    ax.grid(axis="y", color=GRID, lw=0.8, zorder=0)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.legend(frameon=False, fontsize=9, ncol=3, loc="upper left")
    ax.text(0.0, -0.13, "The first three terms resolve to e-mail accounts: txkidd@swbell.net (“Rasco Badguy”), "
            "chkwasher@comcast.net (John Washer), dollarhyde86@comcast.net (Wes Mantooth). Bars are capped at 1,000 "
            "hits; the ‘wes’/‘mantooth’ counts are dominated by the user-profile path.",
            fontsize=8.4, transform=ax.transAxes, color=MUTED, va="top")
    save(fig, "fig4_keywords.png")


# ---------------- Figure 5: timeline ----------------
def fig_timeline():
    ev = [
        ("2007-03-06", "Mantooth: cheque images created/edited (Checks folder); prescription images (Scripts)", ORANGE),
        ("2007-04-13", "Mantooth: PGP keyrings created; EFS DOCS (CC Nums.xls, C money plates.doc)", ORANGE),
        ("2007-06-21", "E-mail thread Washer ↔ Mantooth (“Whats up in D town?”)", VERMIL),
        ("2007-07-12", "Mantooth opens ATM_THEFTS1.ppt + Business Ideas from FAMILY PIX USB; e-mails them", ORANGE),
        ("2007-07-14", "Mantooth: shared USB devices connected; CameraShy stego tool + ValidateCreditCard.zip deleted", ORANGE),
        ("2007-07-23/25", "E-mail burst; thumb drive populated; Washer EFS-encrypts 5 files", VERMIL),
        ("2007-08-04", "Washer deletes 6 Desktop items to Recycle Bin", GREEN),
        ("2007-08-14", "Mantooth: ‘My Confession.txt’ created and deleted (recovered)", ORANGE),
        ("2008-02-12", "Mantooth clears the Windows audit log (16:35); John Washer’s drive referenced as F: (18:16)", VERMIL),
        ("2008-02-13/14", "Washer PC: Zipwash/Zips staged; KFF-named images created then deleted", GREEN),
        ("2008-03 → 07", "Devices seized and imaged (Thumbdrive 05, Washer 17, Mantooth)", INK),
    ]
    n = len(ev)
    fig, ax = plt.subplots(figsize=(15, 6.0))
    ax.axhline(0, color=GRID, lw=2.4, zorder=1)
    for i, (d, label, c) in enumerate(ev):
        up = i % 2 == 0
        y = 1 if up else -1
        ax.plot([i, i], [0, y * 0.5], color=c, lw=1.6, zorder=2)
        ax.scatter([i], [0], s=95, color=c, zorder=4, edgecolor=SURFACE, linewidth=1.4)
        ax.text(i, y * 0.56, d + "\n" + "\n".join(textwrap.wrap(label, 22)), ha="center",
                va="bottom" if up else "top", fontsize=8.3,
                bbox=dict(boxstyle="round,pad=0.35", fc=SURFACE, ec=c, lw=1.3))
    ax.set_xlim(-0.6, n - 0.4)
    ax.set_ylim(-1.8, 1.8)
    ax.set_xticks([])
    ax.set_yticks([])
    for s in ax.spines.values():
        s.set_visible(False)
    ax.set_title("Figure 5  —  Reconstructed timeline (e-mail headers, NTFS/FAT times, INFO2, registry, acquisition logs)",
                 loc="left", pad=10)
    handles_ = [plt.Line2D([], [], marker="o", ls="", color=c, label=l, markersize=8) for c, l in
                ((VERMIL, "E-mail"), (BLUE, "Thumbdrive 05"), (GREEN, "Washer PC"), (ORANGE, "Wes Mantooth"),
                 (INK, "Seizure / acquisition"))]
    ax.legend(handles=handles_, frameon=False, ncol=5, loc="lower center", bbox_to_anchor=(0.5, -0.1), fontsize=9)
    ax.text(0.0, -0.13, "Sequence, not to scale. NTFS, registry and INFO2 times are UTC; e-mail times carry their own "
            "offsets; FAT times on Thumbdrive 05 are local time of the writing machine (zone unknown).",
            fontsize=8.3, transform=ax.transAxes, color=MUTED, va="top")
    save(fig, "fig5_timeline.png")


# ---------------- Figure 6: e-mail network ----------------
def fig_email():
    pair = Counter()
    for m in msgs.values():
        for t in m["to"]:
            pair[tuple(sorted((m["from"], t)))] += 1
    pos = {"chkwasher": (2.0, 3.6), "dollarhyde86": (8.0, 3.6), "txkidd": (5.0, 6.2),
           "smee.rox": (5.0, 1.0), "skimmerman27": (0.6, 6.2)}
    frac = {("dollarhyde86", "skimmerman27"): 0.3}  # label position along edge (from first handle)
    fig, ax = plt.subplots(figsize=(11.5, 7.0))
    ax.axis("off")
    ax.set_xlim(-1, 10.6)
    ax.set_ylim(0, 7.3)
    ax.set_title("Figure 6  —  E-mail network recovered from Washer PC (Outlook Express .dbx) and Mantooth drive (.eml)",
                 loc="left", pad=10)
    for (a, b), n in pair.items():
        if a in pos and b in pos:
            (x1, y1), (x2, y2) = pos[a], pos[b]
            ax.plot([x1, x2], [y1, y2], color=VERMIL, lw=1.2 + 0.7 * n, alpha=0.85, zorder=1, solid_capstyle="round")
            t = frac.get((a, b), 0.5)
            ax.text(x1 + t * (x2 - x1), y1 + t * (y2 - y1), f"{n} msg" + ("s" if n > 1 else ""), ha="center", va="center",
                    fontsize=9, zorder=5, bbox=dict(boxstyle="round,pad=0.25", fc=SURFACE, ec=VERMIL, lw=1))
    sub = {"chkwasher": "chkwasher@comcast.net", "dollarhyde86": "dollarhyde86@comcast.net",
           "txkidd": "txkidd@swbell.net", "smee.rox": "smee.rox@gmail.com", "skimmerman27": "skimmerman27@hotmail.com"}
    col = {"chkwasher": GREEN, "dollarhyde86": ORANGE, "txkidd": VERMIL, "smee.rox": SKY, "skimmerman27": SKY}
    for h, (x, y) in pos.items():
        node(ax, x, y, 3.0, 1.15, PEOPLE[h], sub[h], col[h])
    ax.text(-0.9, 0.05, f"{len(msgs)} distinct dated messages between case parties (de-duplicated by date + sender); "
            f"{shared_msgs} of them are present on BOTH the Washer PC and the Mantooth drive. Headers only — "
            "message bodies not reproduced.", fontsize=8.4, color=MUTED, va="bottom")
    save(fig, "fig6_email_network.png")
    return pair


def fig_searches():
    groups = [
        ("Cheque fraud", GREEN, ["how to steal checks", "check washing", "versacheck"]),
        ("Card manufacture", VERMIL, ["credit card printer", "debit card printer filetype:pdf",
                                      "make debit card", "atm card stealing"]),
        ("Identity / evasion", BLUE, ["fake identity", "change identity", "become invisible",
                                      "disappearing", "body disposal", "get away with murder"]),
        ("Anti-forensics / tools", ORANGE, ["hiding data", "encryping files", "strong passwords",
                                            "pgp", "winzip", "making meth"]),
    ]
    fig, ax = plt.subplots(figsize=(12, 6.0))
    ax.axis("off")
    ax.set_title("Figure 7  —  Notable web searches recovered from browser history "
                 "(Washer PC and Wes Mantooth PC)", loc="left", pad=12)

    def block(x, title, color, terms, y0=0.86):
        y = y0
        ax.text(x, y, title, fontsize=12, fontweight="bold", color=color, transform=ax.transAxes)
        y -= 0.06
        for t in terms:
            ax.text(x + 0.015, y, "•  “" + t + "”", fontsize=10.5, transform=ax.transAxes)
            y -= 0.05
        return y

    y1 = block(0.01, *groups[0])
    block(0.01, *groups[1], y0=y1 - 0.03)
    y2 = block(0.30, *groups[2])
    block(0.30, *groups[3], y0=y2 - 0.03)
    ax.text(0.62, 0.86, "What this shows", fontsize=12, fontweight="bold", color=INK, transform=ax.transAxes)
    notes = ["Searches tie to the physical evidence:", "", "•  cheque images + VersaCheck on the drives",
             "•  ‘ATM_THEFTS’ slides + ATM-hardware photos", "•  the EFS / PGP / TrueCrypt encryption",
             "•  the disguised-archive / ADS concealment", "",
             "Run on both machines; cached in IE", "Temporary Internet Files and History."]
    yy = 0.79
    for n in notes:
        ax.text(0.62, yy, n, fontsize=10, color=INK, transform=ax.transAxes)
        yy -= 0.055
    ax.text(0.01, 0.01, "192 distinct queries recovered in total; benign/entertainment queries omitted here. "
            "Full list: 04_Analysis/web_searches.csv.", fontsize=8.4, color=MUTED, transform=ax.transAxes)
    save(fig, "fig7_searches.png")


def fig_shared_media():
    # device, serial, on both?, note
    rows = [
        ("SanDisk Cruzer Mini", "20043513310C7A22D0C8", True, "Mantooth 2007-07-14 → Washer 2007-07-25"),
        ("Apple iPod", "000A270014B302AB", True, "on both machines"),
        ("TREK TD2SMART G3M", "10120515511949", True, "on both machines"),
        ("Flash Drive UT_USB20", "0000000000C9BA", True, "on both machines"),
        ("WASHER (vol. serial)", "50172777", True, "Washer’s own NTFS volume, referenced on Mantooth 2008-02-12"),
        ("FAMILY PIX", "4C4BB8E4", True, "ATM_THEFTS1.ppt + Business Ideas opened from it"),
        ("Thumbdrive 05 (seized)", "D861DB31", False, "the drive seized at arrest (not matched to the above)"),
    ]
    fig, ax = plt.subplots(figsize=(12, 5.2))
    ax.axis("off")
    ax.set_title("Figure 8  —  Removable media on both machines (USBSTOR device serials + volume serials)",
                 loc="left", pad=12)
    cols = [("Device", 0.0), ("Serial number", 0.26), ("On both?", 0.56), ("Note", 0.69)]
    for name, x in cols:
        ax.text(x, 0.92, name, fontsize=10.5, fontweight="bold", transform=ax.transAxes)
    ax.plot([0, 1], [0.87, 0.87], color=GRID, lw=1, transform=ax.transAxes)
    for i, (lab, ser, both, note) in enumerate(rows):
        y = 0.79 - i * 0.108
        ax.text(0.0, y, ("★ " if both else "   ") + lab, fontsize=9.6, transform=ax.transAxes,
                color=VERMIL if both else INK, fontweight="bold" if both else "normal")
        ax.text(0.26, y, ser, fontsize=8.8, transform=ax.transAxes, family="DejaVu Sans Mono")
        ax.text(0.585, y, "✓" if both else "–", fontsize=12, transform=ax.transAxes,
                color=VERMIL if both else MUTED, ha="center")
        ax.text(0.69, y, note, fontsize=8.5, transform=ax.transAxes, color=MUTED)
    ax.text(0.0, -0.03, "★ Present on BOTH Wes Mantooth’s PC and John Washer’s PC. The top four are matched "
            "by unique USBSTOR device serial (same physical device, not just the same model); the SanDisk Cruzer Mini "
            "moved from Mantooth’s PC to Washer’s within eleven days. Thumbdrive 05 (seized) has a different "
            "serial and is not matched to these.", fontsize=8.3, transform=ax.transAxes, color=MUTED, va="top")
    save(fig, "fig8_shared_media.png")


for f in (fig_integrity, fig_devices, fig_usb, fig_keywords, fig_timeline, fig_searches, fig_shared_media):
    f()
pair = fig_email()
print("pair counts:", dict(pair))
