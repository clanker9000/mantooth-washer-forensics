"""Append self-contained appendices (Glossary, Key Artefact Locations) to the USER-EDITED
report docx, preserving all existing content and screenshots. Does NOT regenerate the report.

Usage: python -I append_appendices.py <report.docx>
"""
import sys
from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

INK, ACCENT, GREY, WHITE = RGBColor(0x1A, 0x1A, 0x1A), RGBColor(0x0A, 0x3D, 0x62), RGBColor(0x5F, 0x63, 0x68), RGBColor(0xFF, 0xFF, 0xFF)
path = sys.argv[1]
doc = Document(path)


def fontname(run, name):
    run.font.name = name
    rf = run._element.get_or_add_rPr().get_or_add_rFonts()
    for k in ("w:ascii", "w:hAnsi", "w:cs"):
        rf.set(qn(k), name)


def para(text="", size=10.5, bold=False, color=INK, italic=False, after=6, align=None):
    p = doc.add_paragraph()
    if align is not None:
        p.alignment = align
    p.paragraph_format.space_after = Pt(after)
    if text:
        r = p.add_run(text)
        r.font.size, r.bold, r.italic, r.font.color.rgb = Pt(size), bold, italic, color
        fontname(r, "Calibri")
    return p


def shade(cell, hex_fill):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    tcPr.append(shd)


def table(headers, rows, widths, caption=None, mono=(), size=9.0):
    t = doc.add_table(rows=1, cols=len(headers))
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.style = "Table Grid"
    t.autofit = False
    trPr = t.rows[0]._tr.get_or_add_trPr()
    hdr = OxmlElement("w:tblHeader")
    hdr.set(qn("w:val"), "true")
    trPr.append(hdr)
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]
        c.width = Inches(widths[i])
        shade(c, "0A3D62")
        r = c.paragraphs[0].add_run(h)
        r.bold, r.font.size, r.font.color.rgb = True, Pt(9), WHITE
        fontname(r, "Calibri")
    for k, row in enumerate(rows):
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].width = Inches(widths[i])
            if k % 2:
                shade(cells[i], "EEF2F6")
            p = cells[i].paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(str(v))
            r.font.size = Pt(size)
            fontname(r, "Consolas" if i in mono else "Calibri")
    if caption:
        para(caption, size=8.6, italic=True, color=GREY, after=10)
    else:
        para(after=4)


doc.add_page_break()

# ---------- Appendix B: Glossary ----------
doc.add_heading("Appendix B  —  Glossary of Technical Terms", level=1)
para("Plain-language definitions of the technical terms used in this report.", italic=True, color=GREY, after=8)
table(["Term", "Meaning"],
      [["E01 / EWF", "EnCase Evidence File — a verifiable, bit-for-bit forensic image of a drive, with built-in hashes."],
       ["MD5 / SHA-1", "Cryptographic hash values; a single changed bit changes the hash, so they prove an image or file is unaltered."],
       ["NTFS / FAT32 / EXT2", "File systems: modern Windows (NTFS), older Windows and most USB drives (FAT32), and Linux (EXT2)."],
       ["MFT", "Master File Table — the NTFS index of every file, which also retains records of deleted files."],
       ["EFS", "Encrypting File System — Windows per-file encryption tied to the user account’s password."],
       ["DPAPI", "Data Protection API — the Windows mechanism that protects a user’s EFS key with their password."],
       ["FEK", "File Encryption Key — the per-file key EFS uses to encrypt the content; unlocked via the user’s key."],
       ["ADS", "Alternate Data Stream — hidden NTFS content attached to a file that a normal directory listing does not show."],
       ["INFO2 / $I–$R", "Recycle Bin records (Windows XP / Vista+) holding deleted files’ original names, paths and deletion times."],
       ["USBSTOR", "A registry key that lists USB storage devices that have been attached, by model and unique serial number."],
       ["Shellbags (BagMRU)", "Registry records of folders opened in Windows Explorer, including folders on network shares."],
       ["LNK", "A Windows shortcut file; records the target’s path, the volume serial number and timestamps."],
       ["RC4", "The stream cipher used by legacy Microsoft Office “password to open” protection."],
       ["DESX / AES-256", "The block ciphers EFS uses for file content — DESX on Windows XP, AES-256 on Windows Vista."],
       ["PGP", "Pretty Good Privacy — public-key encryption; the private key sits in a passphrase-protected keyring."],
       ["TrueCrypt", "On-the-fly volume encryption; the container is a file with high entropy and no file signature."],
       ["Event ID 1102", "A Windows Security event meaning “the audit log was cleared” — an anti-forensic indicator."],
       ["KFF", "Known File Filter — FTK’s hash library for flagging files already known to investigators."],
       ["FTK / PRTK", "AccessData Forensic Toolkit (analysis) and Password Recovery Toolkit (password attacks)."]],
      [1.6, 5.1])

# ---------- Appendix C: Key artefact locations ----------
doc.add_heading("Appendix C  —  Key Artefact Locations", level=1)
para("A quick reference to where the principal artefacts sit on the evidence images.", italic=True, color=GREY, after=8)
table(["Artefact", "Location on the evidence", "Significance"],
      [["Drug-debt ledger", "Mantooth.E01 — Users\\Wes Mantooth\\Desktop\\Those who owes.xls",
        "RC4-protected (“smack”); the drug ledger. Same file on Thumbdrive 05."],
       ["EFS fraud documents", "Mantooth.E01 — Users\\Wes Mantooth\\Documents\\EFS DOCS\\",
        "CC Nums.xls, C money plates.doc, John.doc, Wes.doc — decrypted with “tooth”."],
       ["PGP keyrings", "Mantooth.E01 — Users\\Wes Mantooth\\Documents\\PGP\\",
        "pubring.pkr and secring.skr (passphrase-protected private key)."],
       ["TrueCrypt container", "Mantooth.E01 — Users\\Wes Mantooth\\Documents\\CRACK_ME",
        "1 MB encrypted volume; password not recovered."],
       ["Hidden Linux partition", "Mantooth.E01 — Partition 2 (EXT2)",
        "/Stuff folder; car-theft article and images a Windows host will not mount."],
       ["Alternate data streams", "Mantooth.E01 — Documents\\ADS\\readthis.txt; Documents\\My poem.txt",
        "Hidden password note, a ZIP and images."],
       ["Washer EFS files", "Washer 17 — Administrator\\My Documents\\",
        "The Dealz.doc, X marks the spot.doc, three images — decrypt with “meth”."],
       ["Disguised archive", "Washer 17 — Administrator\\Desktop\\cool tool.piz",
        "A ZIP renamed “.piz”; recovered from the Recycle Bin (Dc2.piz)."],
       ["E-mail stores", "Mantooth Windows Mail (Local Folders, .eml); Washer Outlook Express (.dbx)",
        "The recovered case correspondence (Section 7.2)."],
       ["USB device history", "SYSTEM\\…\\USBSTOR on both machines",
        "The shared removable media matched by serial number (Table 6a)."],
       ["WinVNC password", "Mantooth.E01 — SOFTWARE\\RealVNC\\WinVNC4",
        "Obfuscated value decoded to “schmekl3” (RealVNC fixed key)."]],
      [1.5, 2.8, 2.4], size=8.6)

doc.save(path)
print("appended Appendix B (Glossary) and Appendix C (Key Artefact Locations) to", path)
