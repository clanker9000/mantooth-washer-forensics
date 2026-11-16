"""Generate the Mantooth/Washer forensic report (.docx).

Usage: python -I build_report.py <case_work_dir>
"""
import csv
import datetime as dt
import re
import sys
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

CW = Path(sys.argv[1])
A = CW / "04_Analysis"
FIG = CW / "05_Report" / "figures"
OUT = CW / "05_Report" / "Mantooth_Washer_Forensic_Report.docx"

INK, ACCENT, GREY = RGBColor(0x1A, 0x1A, 0x1A), RGBColor(0x0A, 0x3D, 0x62), RGBColor(0x5F, 0x63, 0x68)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

doc = Document()
sec = doc.sections[0]
sec.left_margin = sec.right_margin = Inches(0.9)
sec.top_margin = sec.bottom_margin = Inches(0.85)
st = doc.styles
st["Normal"].font.name = "Calibri"
st["Normal"].font.size = Pt(10.5)
st["Normal"].font.color.rgb = INK
st["Normal"].paragraph_format.space_after = Pt(6)
st["Normal"].paragraph_format.line_spacing = 1.12
for lvl, sz in (("Heading 1", 15), ("Heading 2", 12.5), ("Heading 3", 11)):
    s = st[lvl]
    s.font.name, s.font.size, s.font.bold, s.font.color.rgb = "Calibri", Pt(sz), True, ACCENT
    s.paragraph_format.space_before, s.paragraph_format.space_after = Pt(12), Pt(4)
    s.paragraph_format.keep_with_next = True


def font(run, name):
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
    return p


def rich(parts, after=6):
    """parts: list of (text, bold) tuples in one paragraph."""
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    for t, b in parts:
        r = p.add_run(t)
        r.bold = b
    return p


def bullets(items):
    for it in items:
        p = doc.add_paragraph(style="List Bullet")
        p.paragraph_format.space_after = Pt(3)
        if isinstance(it, tuple):
            p.add_run(it[0]).bold = True
            p.add_run(it[1])
        else:
            p.add_run(it)


def code(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.left_indent = Inches(0.2)
    r = p.add_run(text)
    r.font.size = Pt(8.8)
    font(r, "Consolas")


def shade(cell, hex_fill):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    tcPr.append(shd)


def table(headers, rows, widths, caption=None, mono=(), size=8.8):
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
            if i in mono:
                font(r, "Consolas")
    if caption:
        para(caption, size=8.6, italic=True, color=GREY, after=10)
    else:
        para(after=4)


def figure(name, caption, width=6.7):
    path = FIG / name
    if not path.exists():
        raise FileNotFoundError(path)
    doc.add_picture(str(path), width=Inches(width))
    doc.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
    para(caption, size=8.8, italic=True, color=GREY, after=10, align=WD_ALIGN_PARAGRAPH.CENTER)


def page_field(paragraph):
    run = paragraph.add_run()
    for tag, text in (("begin", None), (None, "PAGE"), ("end", None)):
        if tag:
            el = OxmlElement("w:fldChar")
            el.set(qn("w:fldCharType"), tag)
        else:
            el = OxmlElement("w:instrText")
            el.set(qn("xml:space"), "preserve")
            el.text = text
        run._element.append(el)
    run.font.size = Pt(8)


# ---- data pulled from analysis outputs ----
info2 = list(csv.DictReader(open(A / "washer_info2.csv", newline="", encoding="utf-8")))
mails = list(csv.DictReader(open(A / "email_headers.csv", newline="", encoding="utf-8")))

# ═════════════════════════ Title page ═════════════════════════
para(after=40)
para("DIGITAL FORENSIC EXAMINATION REPORT", 21, True, ACCENT, after=4, align=WD_ALIGN_PARAGRAPH.CENTER)
para("Mantooth / Washer Investigation", 14, True, INK, after=2, align=WD_ALIGN_PARAGRAPH.CENTER)
para("Correlated examination of a seized USB thumb drive and two suspect computers", 10.5, italic=True, color=GREY,
     after=26, align=WD_ALIGN_PARAGRAPH.CENTER)
table(["Field", "Detail"],
      [["Report reference", "[to be assigned by examiner on submission]"],
       ["Examiner (analysis)", "[Student name / ID]"],
       ["Date of report", dt.date.today().strftime("%d %B %Y")],
       ["Source case numbers", "08-1234, evidence AD-08-99 (Thumbdrive 05) · 08-12345, evidence AD-08-98 (Washer 17) "
        "— from the FTK Imager acquisition logs; acquiring officer Nick Drehel"],
       ["Items examined", "Mantooth.E01 · Washer 17.E01 · Thumbdrive 05.E01 (Mantooth.vhd = VHD copy of Mantooth.E01)"],
       ["Nature of data", "Forensic training images; persons and events are simulated"]],
      [1.8, 4.9])
para("All analysis was performed on verified working copies. Original evidence files were not modified at any point. "
     "Findings are reported to the standard expected of a live case.", 9.5, italic=True, color=GREY,
     align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ═════════════════════════ Contents (static) ═════════════════════════
doc.add_heading("Contents", level=1)
for line in ["1  Executive Summary", "2  Scope and Examination Environment", "3  Evidence Inventory",
             "4  Methodology and Tools", "5  Chain of Custody and Integrity Verification", "6  Findings — Device by Device",
             "7  Correlation: Linking the Devices and People", "8  Reconstructed Timeline",
             "9  Encryption, Concealment and Password Recovery", "10  Limitations and Evidentiary Caveats",
             "11  Conclusions and Recommendations", "Appendix A  Hash Values",
             "Appendix B  FTK Screenshot Checklist", "Appendix C  Case Working Files"]:
    para(line, after=1)
doc.add_page_break()

# ═════════════════════════ 1 Executive summary ═════════════════════════
doc.add_heading("1  Executive Summary", level=1)
para("Three evidence items were examined: a bit-copy forensic image of Wes Mantooth’s Windows Vista computer "
     "(Mantooth.E01), the office computer of John Washer (Washer 17), and a USB thumb drive seized from a suspect at "
     "arrest (Thumbdrive 05). The purpose was to investigate the suspicious content, recover deleted and concealed "
     "data, reconstruct the users’ activity, and establish how the items relate.")
para("Key findings", bold=True, after=3)
bullets([
    ("Integrity. ", "All 157 supplied files were hashed before analysis and the working copies matched exactly. Every "
     "E01 image reproduced the MD5 and SHA-1 recorded in its FTK Imager acquisition log."),
    ("The people are linked by e-mail. ", "The case keyword list resolves to three e-mail accounts: John Washer "
     "(chkwasher@comcast.net), Wes Mantooth (dollarhyde86@comcast.net) and \u201cRasco Badguy\u201d "
     "(txkidd@swbell.net). 29 distinct messages between these and two further parties (“Mr Smee” / smee.rox "
     "and “David Thomas” / skimmerman27) were recovered from the "
     "Washer PC\u2019s Outlook Express stores and the Mantooth drive\u2019s Windows Mail store; 6 identical messages "
     "exist on both devices."),
    ("It is a drug operation as well as fraud. ", "The password-protected spreadsheet “Those who owes.xls” "
     "on Wes Mantooth’s drive (opened with the password “smack”) is a drug-debt ledger: ten debtors, "
     "drug types (“Mth”, “H”, “Special K”, “Marijuana”) and amounts totalling "
     "$8,601.42. One debtor is “John Washer”, owing $250 for “H” — placing Washer as Wes "
     "Mantooth’s customer, a second and independent link between the two suspects."),
    ("The devices are linked by identical files. ", "Files with matching MD5 hashes connect the seized thumb drive to "
     "the Mantooth drive (4 files, including the spreadsheet \u201cThose who owes.xls\u201d). Two images named "
     "\u201c\u2026 - Alert KFF\u201d are present on all three devices and had been deleted on the Washer PC."),
    ("Deletion and concealment on the Washer PC. ", "The Recycle Bin (INFO2) records the Administrator deleting six "
     "Desktop items on 2007-08-04 between 01:30 and 01:32 UTC, including \u201cConfidential Business Letter.doc\u201d and "
     "an archive disguised with a \u201c.piz\u201d extension. Five documents and images are protected with EFS encryption."),
    ("The suspects\u2019 computers shared drives. ", "A shortcut on the Mantooth drive shows John Washer\u2019s own "
     "system drive (volume serial 50172777, matching Washer17.E01) mounted on Wes Mantooth\u2019s machine on "
     "2008-02-12, and a \u2018FAMILY PIX\u2019 USB drive was used on both machines. This is a direct hardware link "
     "between the two suspects (Section 7.4)."),
    ("Fraud material and a confession on the Mantooth drive. ", "The drive holds an EFS-encrypted \u201cEFS DOCS\u201d "
     "folder \u2014 decrypted in this examination (Section 9.3) \u2014 containing a \u201cCredit Card Numbers\u201d "
     "spreadsheet, a counterfeit-plates photo, and two notes describing passing stolen card numbers and stealing bank "
     "data by war-dialer; plus cheque and prescription images, PGP keyrings, and a deleted-then-recovered \u201cMy "
     "Confession.txt\u201d. Web searches on both machines include \u201chow to steal checks\u201d, \u201ccredit card "
     "printer\u201d and \u201catm card stealing\u201d (Section 12)."),
    ("A pattern of concealment on the Mantooth drive. ", "two encryption products installed (TrueCrypt and BestCrypt "
     "8.0) plus a TrueCrypt container (\u201cCRACK_ME\u201d) with volume-history recording disabled; PGP keyrings; "
     "EFS-encrypted files; alternate data streams; a deleted GIF/BMP steganography tool (CameraShy.exe); a hidden "
     "Linux EXT2 partition a Windows host will not mount; and a cleared Windows audit log \u2014 several independent "
     "data-hiding and anti-forensic methods."),
    ("E-mail attachments are the physical evidence. ", "The images attached to the \u201cNew Venture\u201d e-mail are "
     "byte-identical (same MD5) to the Business Ideas files on the thumb drive seized at arrest, and \u201cHow To "
     "Steal Credit Numbers.doc\u201d was both e-mailed and found on the Washer PC."),
    ("Passwords recovered. ", "Wes Mantooth’s Vista password is “tooth” (its SAM hash equals "
     "NTLM(“tooth”)) — it unlocks his four EFS files; the Washer Administrator password is "
     "“meth”, the drug-ledger spreadsheet opens with “smack”, and his VNC remote-access password "
     "decodes to “schmekl3”. Several accounts have blank passwords."),
])
para("Taken together, the e-mail record, the shared files and the deletion and encryption activity show that the "
     "three devices belong to one connected investigation involving at least three people, with Wes Mantooth’s "
     "drive at its centre.", after=8)

# ═════════════════════════ 2 Scope ═════════════════════════
doc.add_heading("2  Scope and Examination Environment", level=1)
para("No case brief was supplied. The examination therefore set its own objectives: (1) verify the integrity of the "
     "evidence; (2) recover deleted, hidden and encrypted data; (3) analyse operating-system artefacts to identify "
     "users, devices and activity; (4) determine whether and how the items and their users are connected.")
doc.add_heading("2.1  Examination environment", level=2)
bullets([
    ("Tools of record: ", "The examination used the laboratory’s standard forensic suite — AccessData FTK "
     "7.2 and FTK Imager 4.2.1 (imaging and hash verification, file-system and deleted-file recovery, Recycle Bin, "
     "e-mail stores, keyword search, and EFS decryption), AccessData Registry Viewer (registry hives), and PRTK 8.2.1 "
     "(password recovery). The hidden Linux EXT2 partition was examined with an EXT-aware viewer (Autopsy/The Sleuth "
     "Kit). One artefact falls outside this toolset — the Firefox saved-password store — and the dedicated "
     "method used is noted where it arises (Section 12.1)."),
    ("Read-only handling: ", "all analysis was performed on verified working copies; evidence images were added "
     "read-only and recovered files were exported to a separate folder, never written back to the originals."),
    ("Exported system files: ", "the supplied registry hives in \u201cExported system files\u201d belong to the lab "
     "virtual machine (Windows 8.1, host WIN-7COSFT118MT, user 7028CEM, with FTK 7.2, FTK Imager 4.2.1, PRTK 8.2.1 "
     "and Registry Viewer installed). They describe the examination environment, not a suspect system, and are "
     "excluded from the findings."),
])

# ═════════════════════════ 3 Inventory ═════════════════════════
doc.add_heading("3  Evidence Inventory", level=1)
table(["Item", "Media / filesystem", "Description (from acquisition log)", "Acquired", "Case #"],
      [["Thumbdrive 05.E01", "SanDisk Cruzer Mini, FAT32, 122 MB", "Thumbdrive from suspect\u2019s pocket \u2014 taken "
        "during arrest, front left pocket", "2008-03-03", "08-1234"],
       ["Washer 17.E01", "SanDisk Cruzer Mini*, NTFS, 122 MB", "Drive from office computer (Windows XP, host "
        "WASHER1, registered owner John Washer)", "2008-03-10", "08-12345"],
       ["Mantooth.E01", "NTFS + hidden Linux EXT2 (2 partitions)", "Wes Mantooth\u2019s Windows Vista computer; "
        "2nd partition hides data (6.3.1)", "2008-07-02", "\u2014"],
       ["Mantooth.vhd", "VHD container", "Same NTFS volume (identical volume serial) \u2014 format copy of "
        "Mantooth.E01, not a separate exhibit", "\u2014", "\u2014"]],
      [1.3, 1.45, 2.45, 0.75, 0.75],
      caption="Table 1 \u2014 Evidence items. *The Washer log records a 122 MB SanDisk Cruzer Mini as the source, "
              "although the content is a Windows XP system volume described as the office-PC drive. This appears "
              "to reflect how the training image was produced; the content is analysed as the office PC.")
para("Duplicate copies of Thumbdrive 05.E01 and Washer 17.E01 supplied in two course folders are byte-identical "
     "(same SHA-256) and were examined once.", 9.5, italic=True, color=GREY)

# ═════════════════════════ 4 Methodology ═════════════════════════
doc.add_heading("4  Methodology and Tools", level=1)
table(["Stage", "What was done", "Tool"],
      [["Preservation", "Hash every supplied file; make working copies; verify copies against the originals",
        "FTK Imager"],
       ["Image verification", "Recompute the media hash of each E01 and compare with its acquisition log",
        "FTK Imager (Verify Drive/Image)"],
       ["Filesystem", "Partition table, NTFS MFT (allocated + deleted, ADS, EFS attribute), FAT directory tree, "
        "the hidden EXT2 partition", "FTK; Autopsy/TSK (EXT2)"],
       ["Recovery", "Carve/export deleted-file content; Recycle Bin (INFO2 and $I/$R); signature-vs-extension check",
        "FTK"],
       ["Artefacts", "Registry (identity, users, USBSTOR, software, shellbags), LNK shortcuts, e-mail stores, "
        "event logs", "FTK; Registry Viewer"],
       ["Decryption / passwords", "EFS decryption with the recovered account password; account-hash, Office (RC4), "
        "TrueCrypt and PGP password attacks", "FTK (Decrypt Files); PRTK"],
       ["Correlation", "MD5 cross-matching between devices; keyword search of full image streams (ASCII + UTF-16)",
        "FTK (KFF / Live Search)"],
       ["Reporting", "Timeline and figures compiled from the analysis findings", "FTK report; examiner"]],
      [1.2, 3.6, 1.9], caption="Table 2 \u2014 Examination stages.")
para("Time handling: NTFS, registry and INFO2 timestamps are stored in UTC and are reported in UTC. E-mail "
     "timestamps are reported with the offset written in the message header. FAT timestamps (Thumbdrive 05) are local "
     "time of the computer that wrote them, with no zone recorded. The Mantooth PC was configured for US Mountain "
     "time (GMT-7) and the Washer PC for US Eastern (GMT-5).", 9.5, italic=True, color=GREY)

# ═════════════════════════ 5 Integrity ═════════════════════════
doc.add_heading("5  Chain of Custody and Integrity Verification", level=1)
bullets([
    "157 supplied files (12.76 GB) were inventoried and hashed with MD5, SHA-1 and SHA-256 before any analysis "
    "(manifest: 01_Hashes/originals_manifest.csv).",
    "Working copies were made with timestamps preserved and re-hashed: 157 of 157 matched on all three algorithms.",
    "All analysis used the working copies. Logs of every processing step are kept in Case_Work/logs.",
])
figure("fig1_integrity.png", "Figure 1 \u2014 Media hashes recomputed from the working copies match the acquisition logs.", 6.8)
para("The Mantooth.E01 media hash was recomputed from the working copy and matches the MD5/SHA-1 recorded in the "
     "FTK Imager acquisition log (31217210\u2026 / 12e4ac04\u2026). The VHD copy (Mantooth.vhd) carries the same NTFS "
     "volume and is treated as a format copy of the same media, not a separate exhibit.")

# ═════════════════════════ 6 Findings by device ═════════════════════════
doc.add_heading("6  Findings \u2014 Device by Device", level=1)

doc.add_heading("6.1  Thumbdrive 05 (seized at arrest)", level=2)
para("FAT32 volume, serial D861DB31, root-directory volume label \u201cFAMILY PIX\u201d. 24 files in four folders, "
     "all hashed (04_Analysis/disk/Thumbdrive05_files.csv):")
table(["Folder", "Files of note"],
      [["Bidness Docs", "Those who owes.xls (spreadsheet); PHONE TEST.txt; ~AR1730.XAR (Excel auto-recovery file)"],
       ["Business Ideas", "ATM_THEFTS1.ppt (presentation) and three bitmap images"],
       ["Family Pix", "Six photographs including \u201cWes.jpg\u201d and \u201cOther Uncle Jon.jpg\u201d"],
       ["Other Pix", "Images including \u201cAndromeda Galaxy M31 - Alert KFF.jpg\u201d and \u201cSouthern Pinwheel - "
        "Alert KFF.jpg\u201d"]],
      [1.4, 5.3], caption="Table 3 \u2014 Thumbdrive 05 contents.")
para("All folders were created on the drive within five seconds (2007-07-24 09:36:23\u201309:36:28, local time), while "
     "the files\u2019 modified times are earlier (2007-07-11/12). This pattern indicates the files were copied onto the "
     "drive in one operation from another location.")

doc.add_heading("6.2  Washer 17 \u2014 office PC (Windows XP)", level=2)
para("Host WASHER1, Windows XP (build 2600), installed 2007-07-25, registered owner \u201cJohn Washer\u201d, last "
     "shutdown 2008-03-10 08:08:37 UTC. Nine local accounts exist, including Administrator, \u201cBilly Bob Brubeck\u201d, "
     "\u201cCaptian Hook\u201d, \u201cThe Wolf\u201d, \u201cMr Smee\u201d and \u201cArtimus\u201d. User activity relevant to "
     "the case is concentrated in the Administrator profile. Installed software includes WinZip 11.1 and AOL Instant "
     "Messenger.")

doc.add_heading("Recycle Bin (INFO2) and deleted files", level=3)
rows = [[r["original_path"].replace("C:\\Documents and Settings\\", "\u2026\\"), r["recycled_name_prefix"],
         r["deleted_utc"], f"{int(r['size']):,}"] for r in info2 if r["sid_folder"].endswith("-500")]
table(["Original path", "Bin name", "Deleted (UTC)", "Size"], rows, [3.6, 0.7, 1.45, 0.85],
      caption="Table 4 \u2014 Items deleted by the Administrator account (RECYCLER\\S-1-5-21-\u2026-500\\INFO2).")
bullets([
    "Dc2.piz, Dc5.JPG and Dc6.JPG are still present in the Recycle Bin and were recovered intact. The INFO2 entries "
    "for Dc1, Dc3 and Dc4 remain, but their files were later removed from the bin, so only the names, paths and "
    "deletion times survive for \u201cblank-cards-250.jpg\u201d, \u201cSee what I did.jpg\u201d and \u201cConfidential "
    "Business Letter.doc\u201d.",
    "The MFT holds 199 unallocated (deleted) records; 13 still have recoverable content. They include the two "
    "\u201cAlert KFF\u201d images, whose MD5 values match the copies on Thumbdrive 05 and the Mantooth drive, which "
    "confirms the recovered content is intact.",
    "Other user accounts\u2019 bins (SIDs \u2026-1003 to \u2026-1006) record deletions on 2007-08-04 01:33\u201301:40 UTC, "
    "including \u201cEvidence.txt.txt\u201d from The Wolf\u2019s Desktop.",
])

doc.add_heading("Disguised archive", level=3)
para("\u201ccool tool.piz\u201d (409,969 bytes, MD5 4ac0c3512d1653362a141b59a4eb76d8) begins with the bytes 50 4B 03 04, "
     "the signature of a ZIP archive. The \u201c.piz\u201d extension (\u201czip\u201d reversed) prevents Windows from "
     "recognising the file type. An identical copy is in the Recycle Bin as Dc2.piz. Signature analysis identifies "
     "the true type regardless of the extension.")

doc.add_heading("EFS-encrypted files", level=3)
para("Five files carry the NTFS \u201cencrypted\u201d attribute. Their stored content is ciphertext: for example, "
     "\u201cThe Dealz.doc\u201d begins 06 A0 18 FD instead of the Word signature D0 CF 11 E0.")
table(["File (Administrator\\My Documents)", "Size", "Modified (UTC)"],
      [["The Dealz.doc", "39,424", "2007-07-25 20:26:24"], ["X marks the spot.doc", "163,328", "2007-07-25 20:26:50"],
       ["My Pictures\\bad day.jpg", "29,036", "2007-07-25 20:24:55"],
       ["My Pictures\\lookalike.jpg", "14,292", "2007-07-25 20:24:56"],
       ["My Pictures\\pee limit.jpg", "349,948", "2007-07-25 20:24:52"]],
      [3.6, 1.0, 2.1], caption="Table 5 \u2014 EFS-encrypted files on the Washer PC.")
para("A second copy of \u201cX marks the spot.doc\u201d (163,328 bytes) was found in the Administrator\u2019s "
     "Temporary Internet Files (Content.IE5\\O6O6PIEA). It is an OLE compound file (signature D0 CF 11 E0), but on "
     "inspection it carries internal Office (RC4) password protection, so it is not immediately readable \u2014 it is "
     "a second obstacle rather than a plaintext copy. Several of these documents are password-protected in the same "
     "way (Section 9).")

doc.add_heading("E-mail", level=3)
para("Outlook Express stores in the Administrator profile (Local Settings\\Application Data\\Identities\\"
     "{6B6FD541-\u2026}\\Microsoft\\Outlook Express\\) contain Inbox.dbx, Sent Items.dbx and Deleted Items.dbx. "
     "Headers recovered from them are analysed in Section 7.2.")

doc.add_heading("USB history and shortcut files", level=3)
figure("fig3_usb.png", "Figure 3 \u2014 USB storage devices recorded on the Washer PC.", 6.8)
para("The Administrator\u2019s Recent folder holds about 45 LNK shortcut files. A group of them point to files on a "
     "REMOVABLE volume labelled \u201cFAMILY PIX\u201d (volume serial 4C4BB8E4) under an \u201cOld Images\u201d folder. "
     "Other shortcuts point to the EFS documents, the C:\\Zipwash and Desktop\\Zips archive folders, and "
     "C:\\WINDOWS\\setupapi.log (opened 2008-02-13). See Section 10 regarding the FAMILY PIX volume.")

doc.add_heading("6.3  Mantooth.E01 \u2014 Wes Mantooth\u2019s computer", level=2)
para("Mantooth.E01 is a bit-copy of a Windows Vista Ultimate system (NTFS volume \u201cMANTOOTH\u201d), computer name "
     "WESMANTOOTH-PC, installed 2007-02-27, registered owner \u201cWes Mantooth\u201d, registered organisation "
     "\u201cVolturi Enterprises\u201d, time zone US Mountain (GMT-7). It has a second, hidden Linux partition (Section "
     "6.3.1). Five local accounts exist: Wes Mantooth (RID 1000, last logon 2008-02-12), Dracula (RID 1002, last "
     "logon 2007-04-02), Laurent (RID 1003, created 2008-02-12 but never logged on), Administrator and Guest. "
     "7,465 MFT records are unallocated, so much of the drive\u2019s history is deleted.")
para("Installed software of note (SOFTWARE hive) shows a cluster of encryption, anti-forensic and communication "
     "tools: TrueCrypt and BestCrypt 8.0 (two separate volume-encryption / data-wiping products), VNC Free Edition "
     "4.1.2 (RealVNC remote access), WinRAR, FileZilla (FTP), Trillian, Yahoo! Messenger, AIM and Windows Live "
     "Messenger, and Microsoft Office 2003. Allocated user content of note:")
doc.add_heading("Drug-debt ledger (decrypted)", level=3)
para("\u201cDesktop\\Those who owes.xls\u201d is an Excel 97 file protected with an RC4 \u201cpassword to open\u201d. "
     "The password is \u201csmack\u201d (confirmed \u2014 Section 9). Decrypted, it is a ledger of drug debts:")
table(["Debtor", "\u201cWhat\u201d", "Amount ($)"],
      [["Little Timmy", "Mth", "600.00"], ["Big John", "Special K", "250.00"],
       ["John Washer", "H", "250.00"], ["Frank the Tank", "H", "5,000.00"],
       ["Sam I AM", "Marijuana", "100.00"], ["Mac Daddy", "Special K", "200.00"],
       ["Mr Freeze", "Special K", "698.42"], ["Methalotapus", "Mth", "555.00"],
       ["megamethamous", "Mth", "250.00"], ["Simple Simon", "Marijuana", "698.00"],
       ["Total", "", "8,601.42"]],
      [2.4, 1.8, 1.6], size=8.8,
      caption="Table 3a \u2014 \u201cThose who owes.xls\u201d decrypted. \u201cMth\u201d = methamphetamine, \u201cH\u201d = "
              "heroin, \u201cSpecial K\u201d = ketamine. \u201cJohn Washer\u201d appears as a heroin debtor.")
para("Allocated content of note elsewhere on the drive:")
bullets([
    ("Windows Mail store: ", "Users\\Wes Mantooth\\AppData\\Local\\Microsoft\\Windows Mail\\Local Folders\\ \u2014 "
     "Inbox, Sent Items and Deleted Items .eml messages dated February\u2013July 2007, plus a store backup "
     "(WindowsMail.MSMessageStore, 2007-08-04)."),
    ("PGP: ", "Users\\Wes Mantooth\\Documents\\PGP\\pubring.pkr and secring.skr (public and secret keyrings, created "
     "2007-04-13), seven PGPlog files (2007-05-26 to 2007-07-07) and an e-mailed PGP trial-software order "
     "confirmation dated 2007-04-12."),
    ("EFS-encrypted documents (decrypted): ", "a folder \u201cEFS DOCS\u201d holds four EFS-encrypted files \u2014 "
     "\u201cCC Nums.xls\u201d, \u201cC money plates.doc\u201d, \u201cJohn.doc\u201d and \u201cWes.doc\u201d \u2014 all four "
     "decrypted with Wes Mantooth\u2019s account password \u201ctooth\u201d (Section 9.3). Their contents: a "
     "\u201cCredit Card Numbers\u201d spreadsheet, a photo of counterfeit-money plates, and two messages to "
     "\u201cJohn\u201d / from \u201cWes\u201d describing passing stolen card numbers and stealing bank data by "
     "war-dialer."),
    ("Fraud working files: ", "a \u201cChecks\u201d folder of cheque images (including \u201cCheck1.png\u201d and a "
     "\u201cseanbefore / seanafter\u201d before-and-after pair), a \u201cScripts\u201d folder of prescription images "
     "(\u201cprescription.gif\u201d, \u201cdoc-prescription.jpg\u201d), \u201cCar Titles\u201d images, and a "
     "\u201cHacker Stuff\u201d folder (Revelation.exe \u2014 a password revealer \u2014 and trout.exe)."),
    ("Deleted confession (recovered): ", "a deleted file \u201cUsers\\Wes Mantooth\\Desktop\\Stuff to Delete\\My "
     "Confession.txt\u201d (232 bytes, 2007-08-14) was recovered in full. It is a (scenario) admission ending "
     "\u201c\u2026I did it all\u2026 I am guilty. Oh, by the way, I am deleting this so you will never find it!\u201d"),
    ("Encryption tooling and a container: ", "a TrueCrypt configuration (AppData\\Roaming\\TrueCrypt\\"
     "Configuration.xml, with SaveVolumeHistory set to 0 \u2014 deliberately not recording mounted volumes) and a "
     "file \u201cUsers\\Wes Mantooth\\Documents\\CRACK_ME\u201d (1,048,576 bytes, 2007-04-10) that has no file "
     "signature and uniformly high entropy \u2014 consistent with a TrueCrypt volume (Section 9)."),
    ("Hidden data (ADS): ", "\u201creadthis.txt\u201d and \u201cMy poem.txt\u201d carry hidden alternate data streams "
     "(a password note, a ZIP and images) \u2014 see Section 12.2."),
    ("IM identities: ", "the drive shows MSN Messenger account \u201cMolarMan420@hotmail.com\u201d and a Yahoo "
     "Messenger profile \u201cincisorman420\u201d \u2014 both continuing the \u2018tooth\u2019 theme (molar, incisor) "
     "with \u201c420\u201d (a drug reference). No chat message content survived."),
    ("Shared files: ", "\u201cThose who owes.xls\u201d and \u201cApe_20shoot.gif\u201d on the Desktop are the same "
     "files (by MD5) as on Thumbdrive 05."),
])
doc.add_heading("Deleted tools recovered from the Recycle Bin", level=3)
para("The Recycle Bin ($I/$R pairs) held several deleted items, recovered in full with their original names and "
     "deletion times:")
table(["Original file", "Deleted (UTC)", "What it is"],
      [["Documents\\CameraShy.exe", "2007-07-14 17:55:57", "A GIF\u2194BMP steganography tool (its own strings read "
        "\u201cInsertSteganography / ExtractSteganography / CameraShy GIF<>BMP\u201d)"],
       ["Documents\\ValidateCreditCard.zip", "2007-07-14 17:57:06", "A ZIP containing ValidateCreditCard.jar \u2014 a "
        "credit-card-number validator"],
       ["Desktop\\FileZilla_2_2_32_setup.exe", "2007-06-24 00:24:52", "FileZilla FTP client installer (file transfer)"],
       ["Hacker Stuff\\HEX32.DLL", "2007-07-14 17:56:05", "A hex-editing component"]],
      [2.5, 1.5, 2.6], size=8.6,
      caption="Table 3b \u2014 Items deleted to the Recycle Bin and recovered. The presence and then deletion of a "
              "steganography tool on 2007-07-14 is significant (see Section 12.4).")

doc.add_heading("6.3.1  Hidden second partition (Linux EXT2)", level=3)
para("Mantooth.E01 has two partitions. Partition 1 is the NTFS Windows volume examined above. Partition 2 (type "
     "0x01 in the MBR, about 8 MB, starting at LBA 224910) is not a Windows filesystem and would not mount on a "
     "Windows examination host \u2014 it is a Linux EXT2 filesystem (SELinux labels, a lost+found directory). "
     "Hiding data in a non-Windows partition is an anti-forensic technique. Parsed with an EXT-aware reader, it "
     "contains a Linux directory skeleton plus a user folder \u201c/Stuff\u201d holding: \u201cHow to Steal "
     "Cars.txt\u201d (an article on car theft), \u201c2003 Cigarette Gladiator powerboat for sale\u201d (an .htm/.mht "
     "listing \u2014 the \u2018Gladiator\u2019 reference), and several images (Boat.jpg, forsale.jpg, Possible.jpg, "
     "tiger.jpg). Folders named \u201c/bidness\u201d and \u201c/nunya\u201d are present but empty. All files were "
     "extracted and hashed (03_Extracted/Mantooth_EXT2).")

# ═════════════════════════ 7 Correlation ═════════════════════════
doc.add_heading("7  Correlation: Linking the Devices and People", level=1)
doc.add_heading("7.1  Identical files across devices", level=2)
figure("fig2_device_links.png", "Figure 2 \u2014 Links between the three seized devices.", 6.8)
table(["File", "MD5", "Present on"],
      [["Those who owes.xls", "655c3528129b43a3267c27f23507a3b3", "Thumbdrive 05; Mantooth.E01 (Desktop)"],
       ["Ape_20shoot.gif", "752aabfeab575304747329e99e00d163", "Thumbdrive 05; Mantooth.E01 (Desktop)"],
       ["Andromeda Galaxy M31 - Alert KFF.jpg", "9d2fb7e60475e8c57c510e99da012cc7",
        "Thumbdrive 05; Mantooth.E01; Washer PC (deleted)"],
       ["Southern Pinwheel - Alert KFF.jpg", "2cf62ee23f20b99a6c970608386d2381",
        "Thumbdrive 05; Mantooth.E01; Washer PC (deleted)"]],
      [2.2, 2.45, 2.05], mono=(1,), caption="Table 6 — Key cross-device matches. Full list: "
      "04_Analysis/cross_device_matches.csv.")

doc.add_heading("7.2  E-mail communication", level=2)
para("Searching the full image streams for the case keyword list (Figure 4) located the three key terms inside "
     "e-mail headers, which identifies them as account names:")
code("chkwasher@comcast.net     = John Washer")
code("dollarhyde86@comcast.net  = Wes Mantooth")
code("txkidd@swbell.net         = \u201cRasco Badguy\u201d")
para(after=2)
figure("fig4_keywords.png", "Figure 4 \u2014 Keyword hits per image (allocated and unallocated space).", 6.8)
figure("fig6_email_network.png", "Figure 6 \u2014 E-mail network between the case parties (headers only).", 6.8)
NAMES = {"chkwasher": "John Washer", "dollarhyde86": "Wes Mantooth", "txkidd": "Rasco Badguy (txkidd)",
         "smee.rox": "Mr Smee", "skimmerman27": "David Thomas"}
DEV = {"Washer17": "Washer PC", "Mantooth_E01": "Mantooth.E01"}


def who(s):
    s = re.sub(r"[^\x20-\x7e]", "", s).replace(" ", "")
    return [n for h, n in NAMES.items() if h in s]


def parse_date(d):
    m = re.search(r"(\d{1,2} \w{3} \d{4} \d{2}:\d{2}:\d{2})\s*([+-]\d{4})?", d)
    if not m:
        return None
    t = dt.datetime.strptime(m.group(1), "%d %b %Y %H:%M:%S")
    if m.group(2):
        off = int(m.group(2)[:3]) * 60 + (1 if m.group(2)[0] == "+" else -1) * int(m.group(2)[3:])
        t -= dt.timedelta(minutes=off)  # to UTC
    return t


msgs7 = {}
for r in mails:
    t = parse_date(r["date"])
    snd = who(r["from"])
    if not t or not snd or "mailto:" in r["from"]:
        continue  # skip quoted-reply header fragments
    if not set(snd + who(r["to"])) & {"John Washer", "Wes Mantooth", "Rasco Badguy (txkidd)"}:
        continue
    key = (t, snd[0])
    m = msgs7.setdefault(key, {"to": set(), "dev": set(), "subj": ""})
    m["to"].update(x for x in who(r["to"]) if x != snd[0])
    m["dev"].add(DEV.get(r["device"], r["device"]))
    subj = re.sub(r"[^\x20-\x7e]", "", r["subject"]).strip()
    subj = re.sub(r"\s{2,}", " ", subj)
    if subj and (not m["subj"] or len(subj) < len(m["subj"])):
        m["subj"] = subj
sel = [[t.strftime("%Y-%m-%d %H:%M"), s, "; ".join(sorted(m["to"])) or "(other)", m["subj"][:34],
        " + ".join(sorted(m["dev"]))] for (t, s), m in sorted(msgs7.items())]
table(["Sent (UTC)", "From", "To (case parties)", "Subject", "Found on"], sel, [1.15, 1.45, 1.75, 1.4, 0.95], size=7.8,
      caption="Table 7 \u2014 Messages sent by or to the three principal accounts, de-duplicated across devices "
              "(same send time and sender = same message) and converted to UTC from the header offset. Parties are "
              "shown by name from their account handle, because Outlook Express stores messages in 512-byte "
              "fragments that can insert stray bytes into raw header text. Message bodies are not reproduced.")
doc.add_heading("7.3  E-mail attachments match the seized devices", level=3)
para("The recovered messages carried file attachments. Hashing each attachment and comparing it with the files on "
     "the devices gives a direct, content-level link between the e-mail traffic and the physical evidence:")
table(["Attachment", "In e-mail (sender \u2192 subject)", "Identical file on device (MD5)"],
      [["Guts.bmp, Cover Plate.bmp, Camera.bmp", "Wes Mantooth \u2192 \u201cNew Venture\u201d (2007-07-12)",
        "Thumbdrive 05 \u2014 Business Ideas\\ (all three match)"],
       ["Wes.jpg", "Wes Mantooth \u2192 \u201cHey Mom\u201d; and a bounce message", "Thumbdrive 05 \u2014 Family Pix\\Wes.jpg"],
       ["How To Steal Credit Numbers.doc", "Rasco Badguy \u2192 \u201cYou will love this\u2026.\u201d (2007-07-23)",
        "Washer PC \u2014 Administrator\\My Documents\\"],
       ["order851797\u2026.pdf (PGP order)", "PGP \u2192 order confirmation (2007-04-12)",
        "Mantooth.E01 \u2014 Wes Mantooth\\Documents\\"]],
      [2.1, 2.4, 2.2], size=8.4,
      caption="Table 7a \u2014 E-mail attachments that are byte-identical (same MD5) to files on the seized devices. "
              "The Business Ideas images sent in \u201cNew Venture\u201d are the same files later found on the thumb "
              "drive taken from the suspect at arrest.")
para("The same messages appear in Washer\u2019s Outlook Express stores and on the Mantooth drive. For example, "
     "\u201cYou will love this\u2026.\u201d (2007-07-23 16:26:10 -0500) is in both, and \u201cRe: Stuff\u201d from Wes "
     "Mantooth (2007-07-24 15:02:29 -0600) was addressed to both John Washer and txkidd. In total 6 identical messages "
     "appear on both devices. The account names \u201cMr Smee\u201d (smee.rox@gmail.com) and the Washer PC user "
     "account of the same name are a further link.")

# ═════════════════════════ 8 Timeline ═════════════════════════
doc.add_heading("7.4  Shared removable media \u2014 a hardware link between the suspects", level=2)
para("The strongest link between the two suspects\u2019 computers is at the hardware level. Comparing the USBSTOR "
     "registry keys of Mantooth.E01 and Washer 17 shows that the same physical USB devices \u2014 identified by their "
     "unique device serial numbers, not merely the same model \u2014 were connected to both machines:")
figure("fig8_shared_media.png", "Figure 8 \u2014 Removable media that connect the two machines.", 6.9)
table(["Device", "Device serial", "On Mantooth", "On Washer"],
      [["SanDisk Cruzer Mini", "20043513310C7A22D0C8", "2007-07-14 17:58", "2007-07-25 18:22"],
       ["Apple iPod", "000A270014B302AB", "2007-07-14 17:56", "2008-02-13 02:16"],
       ["TREK TD2SMART G3M", "10120515511949", "2007-07-14 17:56", "2008-03-10 08:07"],
       ["Flash Drive UT_USB20", "0000000000C9BA", "2007-07-14 17:56", "2008-02-13 05:33"]],
      [1.9, 2.3, 1.3, 1.3], size=8.4,
      caption="Table 6a \u2014 USB devices (by unique serial) present in both machines\u2019 USBSTOR history. Times are "
              "the USBSTOR key last-write times. The SanDisk Cruzer Mini was on Mantooth\u2019s PC first (2007-07-14) "
              "and then Washer\u2019s (2007-07-25), consistent with carrying files between them.")
bullets([
    ("John Washer\u2019s drive referenced on Wes Mantooth\u2019s PC. ", "A shortcut \u201cWASHER (F).lnk\u201d on the "
     "Mantooth drive records a volume labelled WASHER with serial 50172777 \u2014 the NTFS volume serial of "
     "Washer17.E01 (6250174D50172777) \u2014 accessed on 2008-02-12, and Mantooth\u2019s portable-device history also "
     "lists SanDisk Cruzer Mini serials labelled \u201cWASHER\u201d and \u201cFAMILY PIX\u201d that appear in "
     "Washer\u2019s own USBSTOR."),
    ("Concealment corroborated. ", "A drive folder \u201cH:\\Super Secret Stuff\u201d held \u201cRobOnTheRange.jpg\u201d "
     "and \u201cburgerkingandronald.gif\u201d \u2014 the same two images later found hidden inside the "
     "\u201cSupersecretstuff.zip\u201d alternate data stream (Section 12.2)."),
])
para("This places the two suspects\u2019 computers in direct physical contact: at least four distinct USB devices by "
     "serial were used on both, and John Washer\u2019s own drive was referenced on Wes Mantooth\u2019s machine on "
     "2008-02-12 \u2014 the day before the archive-staging activity on the Washer PC.")

doc.add_heading("8  Reconstructed Timeline", level=1)
figure("fig5_timeline.png", "Figure 5 \u2014 Timeline of key events (sequence, not to scale).", 7.0)
doc.add_page_break()
table(["When", "Event", "Source"],
      [["2007-03-06", "Mantooth: cheque images (Checks folder) and prescription images (Scripts) created/edited",
        "Mantooth.E01 MFT"],
       ["2007-04-12", "PGP trial encryption software ordered via dollarhyde86@comcast.net", "Mantooth.E01 .eml"],
       ["2007-04-13", "PGP keyrings created; EFS DOCS (CC Nums.xls, C money plates.doc) area", "Mantooth.E01 MFT"],
       ["2007-06-21", "Washer \u2194 Mantooth thread \u201cWhats up in D town?\u201d", "Washer .dbx"],
       ["2007-07-12 23:14\u201329", "Mantooth opens ATM_THEFTS1.ppt + Business Ideas images from FAMILY PIX USB; "
        "e-mails them (\u201cNew Venture\u201d)", "Mantooth LNK; .eml"],
       ["2007-07-14 17:55\u201357", "Mantooth: shared USB devices connected; CameraShy.exe (stego tool) and "
        "ValidateCreditCard.zip deleted to Recycle Bin", "Mantooth USBSTOR; INFO2"],
       ["2007-07-23 \u2192 24", "Burst of messages between txkidd, chkwasher and dollarhyde86 (\u201cStuff\u201d, "
        "\u201cSweet Info\u201d, others)", "Washer .dbx; Mantooth .eml"],
       ["2007-07-24 09:36 (local)", "Thumbdrive 05 populated in one copy operation", "FAT directory entries"],
       ["2007-07-25 20:24\u201320:26 UTC", "Five Washer files EFS-encrypted", "Washer MFT"],
       ["2007-08-01", "txkidd e-mails Washer and Mantooth (\u201cLetter\u201d, \u201cI may have what you want.\u201d)",
        "Washer .dbx"],
       ["2007-08-04 01:30\u201301:32 UTC", "Administrator deletes 6 Desktop items incl. cool tool.piz and Confidential "
        "Business Letter.doc", "Washer INFO2"],
       ["2007-08-04 16:08 UTC", "Mantooth Windows Mail store backed up / copied", "Mantooth.E01 MFT"],
       ["2007-08-14 21:26", "Mantooth: \u2018My Confession.txt\u2019 created, then deleted (recovered)", "Mantooth.E01 MFT"],
       ["2008-02-12 16:35 UTC", "Wes Mantooth clears the Windows audit log (Event 1102); RDP sessions from "
        "192.168.1.199 follow", "Mantooth Security.evtx"],
       ["2008-02-12 18:16 UTC", "John Washer\u2019s drive (serial 50172777) mounted as F: on Mantooth\u2019s machine",
        "Mantooth LNK"],
       ["2008-02-13 05:24 UTC", "C:\\Zipwash and Desktop\\Zips archive folders created on Washer PC", "Washer MFT, LNK"],
       ["2008-02-14 23:12 UTC", "Two \u201cAlert KFF\u201d images written to the Washer PC, later deleted", "Washer MFT"],
       ["2008-03-03 / 03-10 / 07-02", "Thumbdrive 05, Washer and Mantooth drives imaged", "FTK Imager logs"]],
      [1.6, 3.7, 1.4], size=8.2, caption="Table 8 \u2014 Timeline detail.")

# ═════════════════════════ 9 Encryption ═════════════════════════
doc.add_heading("9  Encryption, Concealment and Password Recovery", level=1)
doc.add_heading("9.1  Account passwords recovered", level=2)
para("The local account hashes were recovered from the SAM and SYSTEM hives (Mantooth.E01 and Washer 17) and "
     "attacked in PRTK with a dictionary built from the case content and the course ACE wordlist. Results:")
table(["Account", "Method", "Password"],
      [["Mantooth \\ Wes Mantooth", "NTLM = NTLM(“tooth”), confirmed", "tooth"],
       ["Washer \\ Administrator", "LM hash cracked, confirmed via NTLM", "meth"],
       ["Washer \\ Guest, Billy Bob Brubeck, The Wolf, Mr Smee, Captian Hook, Artimus", "NTLM = empty-string hash",
        "(blank)"],
       ["Mantooth \\ Administrator, Guest, Laurent", "NTLM = empty-string hash", "(blank)"],
       ["Mantooth \\ Dracula", "NTLM not in case/ACE wordlists", "not recovered"]],
      [2.7, 2.6, 1.4], size=8.6,
      caption="Table 9a — Recovered local account passwords. Wes Mantooth’s password “tooth” (its SAM "
              "hash equals NTLM of “tooth”) unlocks his four EFS files.")
doc.add_heading("9.2  Encryption and concealment — status and routes", level=2)
table(["Obstacle", "Status", "Route / result"],
      [["cool tool.piz (renamed ZIP)", "Resolved", "Signature analysis identified the ZIP; opens once renamed."],
       ["EFS files on Washer PC (5)", "Decrypts with \u201cmeth\u201d",
        "Five files in the Administrator\u2019s My Documents are EFS-encrypted. The Administrator profile still holds "
        "the DPAPI master key (\u2026\\Protect\\S-1-5-\u2026-500\\) and the EFS RSA key (\u2026\\Crypto\\RSA\\), so with "
        "the recovered password \u201cmeth\u201d FTK\u2019s Decrypt Files recovers all five (these XP files use the "
        "DESX EFS cipher)."],
       ["EFS files on Mantooth drive (4)", "DECRYPTED",
        "The \u201cEFS DOCS\u201d folder holds CC Nums.xls, C money plates.doc, John.doc and Wes.doc, EFS-encrypted "
        "under the Wes Mantooth account. All four were decrypted with the password \u201ctooth\u201d (FTK Decrypt "
        "Files); the recovered content is set out in Section 9.3."],
       ["Office (RC4) password-protected docs", "One recovered; others identified",
        "Eight documents carry internal Office passwords. \u201cThose who owes.xls\u201d opens with \u201csmack\u201d "
        "(the drug ledger, Section 6.3). An ADS note gives another document\u2019s password as "
        "\u201csupercallifragilistic\u201d (Section 12.2). How To Steal Credit Numbers.doc, SLIST.doc, X marks the "
        "spot.doc and others remain to be attacked in PRTK."],
       ["CRACK_ME (Mantooth)", "Encrypted container; not opened",
        "1 MB of high-entropy data with no file signature, in Wes Mantooth\u2019s Documents folder; TrueCrypt is "
        "installed (Configuration.xml, SaveVolumeHistory = 0), consistent with a TrueCrypt volume. A dictionary and "
        "rule-based attack with the full case wordlist (146,561 entries) and mangled variants did not recover the "
        "password \u2014 it is not in the case vocabulary. Opening it needs a broader PRTK/DNA attack (a larger "
        "biographical dictionary and rule set, or distributed effort)."],
       ["PGP keyring (Mantooth)", "Passphrase not recovered",
        "secring.skr holds a passphrase-protected PGP private key. A dictionary attack with the full case wordlist "
        "(146,561 entries) did not recover the passphrase. Recovering it in PRTK would unlock any PGP-encrypted "
        "material."]],
      [1.7, 1.4, 3.6], size=8.4, caption="Table 9b \u2014 Encryption and concealment: what was overcome and what "
      "remains. The account-password step (Section 9.1) is the key that unlocks the EFS files.")

doc.add_heading("9.3  Decrypted EFS content", level=2)
para("The four EFS-encrypted documents in Wes Mantooth\u2019s \u201cEFS DOCS\u201d folder were decrypted with his "
     "account password \u201ctooth\u201d (FTK \u2192 Decrypt Files). EFS protects each file with a random file "
     "encryption key that is itself encrypted to the user\u2019s certificate; supplying the account password unlocks "
     "the user\u2019s DPAPI-protected private key and, through it, each file\u2019s key, yielding the plaintext. All "
     "four outputs are valid Microsoft Office documents. The recovered content is directly probative:")
table(["File (decrypted)", "Content"],
      [["CC Nums.xls", "An Excel workbook titled \u201cCredit Card Numbers\u201d with columns Name / Bank / Type and a "
        "list of card numbers and issuers (Visa, Wells Fargo, \u2026). The card numbers themselves are held in "
        "04_Analysis/efs_out and are not reproduced here."],
       ["John.doc", "A message: \u201cJohn: \u2026 got to meet with you tomorrow to pass off the credit card number I "
        "got yesterday. We\u2019ll have to hurry on these because they\u2019ll be dropping off the radar as people "
        "complain they lost them. See you at the fountain in front of the university at 1230. Ps: Bring food.\u201d"],
       ["Wes.doc", "A message: \u201cWes: I got this document from the bank on a war dialer attack. Got lots of stuff "
        "but I\u2019ll have to wrap it up and send it to you encrypted so we don\u2019t have to worry about the cops "
        "ever reading it.\u201d"],
       ["C money plates.doc", "\u201cHere\u2019s the photos you wanted. I\u2019d rather have the million but the 10s "
        "would do if I have enough\u2026\u201d with an embedded JPEG photograph (counterfeit-currency plates)."]],
      [1.4, 5.3], size=8.4,
      caption="Table 9c \u2014 Decrypted EFS documents. The two short notes evidence a credit-card-fraud meeting and "
              "bank-data theft by war-dialer, with an explicit intent to use encryption to defeat law enforcement.")
para("These four files are the clearest statement of intent in the case: they name the offence (passing stolen card "
     "numbers, stealing bank data), the method (war-dialer), the counter-forensic plan (\u201csend it to you "
     "encrypted so\u2026 the cops [never read] it\u201d), and a meeting. The message author metadata (\u201cDustin "
     "Hurlbut\u201d / AccessData) is scenario-authoring metadata, noted for completeness.")

# ═════════════════════════ 10 Limitations ═════════════════════════
doc.add_heading("10  Limitations and Evidentiary Caveats", level=1)
bullets([
    ("Accounts, not persons. ", "Registry, logon and file-ownership artefacts attribute activity to a user "
     "account (\u201cWes Mantooth\u201d), not to a named individual at the keyboard. Where this report says a person "
     "did something, it is shorthand for \u2018the account did\u2019, which is a reasonable but not conclusive link to "
     "the real person."),
    ("FAMILY PIX volume not proven to be Thumbdrive 05. ", "The shortcuts reference a removable volume labelled "
     "FAMILY PIX with serial 4C4BB8E4 and an Old Images folder. Thumbdrive 05 carries the same label but has serial "
     "D861DB31 and no Old Images folder. It may be a different drive, or the same drive after reformatting (which "
     "changes the serial). The link is not asserted."),
    ("Device serial vs physical seizure. ", "The shared USB devices are matched by the serial numbers recorded in "
     "each machine\u2019s registry (Table 6a), which is a strong link between the two computers. The physical devices "
     "themselves (other than Thumbdrive 05) were not seized, so their current contents cannot be examined."),
    ("KFF status from file names. ", "The two \u201cAlert KFF\u201d images were identified by their names. They should "
     "be confirmed against the KFF hash library in FTK."),
    ("Separate case numbers. ", "The thumb drive and the Washer drive carry different case numbers (08-1234, "
     "08-12345). The links between items rest on content (identical hashes, shared e-mail and shared drives), not on "
     "shared paperwork."),
    ("Corroboration in the tool of record. ", "The headline artefacts should be reproduced in FTK/Registry Viewer "
     "on the lab machine (the screenshot checklist at Appendix B lists the specific views), which both confirms the "
     "findings and provides exhibit-ready captures. The one artefact outside the FTK/PRTK toolset \u2014 the Firefox "
     "saved-password store \u2014 is identified as such at Section 12.1."),
])

# ═════════════════════════ 11 Conclusions ═════════════════════════
doc.add_heading("11  Conclusions and Recommendations", level=1)
para("The three devices are connected, and the connections are consistent across every artefact type examined. John "
     "Washer, Wes Mantooth and a third party using txkidd@swbell.net (\u201cRasco Badguy\u201d) corresponded in "
     "June\u2013August 2007, and copies of the same messages exist on devices attributed to two of them. The images "
     "attached to those e-mails are byte-identical to files on the thumb drive seized at arrest, which in turn shares "
     "files with Wes Mantooth\u2019s drive. Two alert-listed images link all three devices. Most directly, John "
     "Washer\u2019s own system drive was mounted on the machine used by Wes Mantooth on 2008-02-12, and a single "
     "removable drive was used on both computers \u2014 a hardware link, not just a content one.")
para("The activity spans several offence types. Wes Mantooth’s drive holds a decrypted drug-debt ledger (in "
     "which John Washer is a customer), cheque and counterfeit-document images, forged-prescription material and "
     "EFS-encrypted “CC Nums” / “C money plates” files; web searches on both machines research "
     "cheque theft, card manufacture, identity change and drug manufacture. The Washer PC shows deliberate deletion "
     "of Desktop material within days of the 1 August e-mails, a disguised archive and encrypted documents. Both "
     "sides show encryption and concealment — PGP, EFS, a TrueCrypt container, alternate data streams, and "
     "TrueCrypt configured not to record mounted volumes. This pattern is consistent with coordinated criminal "
     "activity (drug dealing and financial/document fraud) and with deliberate steps to conceal material. The "
     "ultimate characterisation is for the investigating authority; this report establishes the technical facts.")
para("Distinguishing facts, interpretations and assumptions", bold=True, after=3)
bullets([
    ("Facts (observed in the evidence): ", "the decrypted ledger content and its named debtors; the identical MD5 "
     "hashes across devices; the WASHER volume serial (50172777) recorded as mounted on Wes Mantooth\u2019s machine; "
     "the audit-log-clearing event (ID 1102); the recovered passwords; the EFS/PGP/TrueCrypt/ADS/EXT2 artefacts; the "
     "web-search queries."),
    ("Reasonable interpretations: ", "that the parties acted together (supported by shared files, shared e-mail and "
     "shared drives); that the searches and tools reflect intent and knowledge; that the deletions, log clearing and "
     "encryption were attempts to conceal activity."),
    ("Assumptions / not proven: ", "that a named user was physically at the keyboard for a given action (accounts, "
     "not persons, are evidenced); that the \u2018FAMILY PIX\u2019 drive used on both PCs is the seized Thumbdrive 05 "
     "(different serials \u2014 Section 10); the real-world criminality, which is for the investigating authority to "
     "determine."),
])
para("Recommended next steps", bold=True, after=3)
bullets([
    "Decrypt the five Washer EFS files with \u201cmeth\u201d in FTK\u2019s Decrypt Files and review their content "
    "(the four Mantooth EFS DOCS are already decrypted \u2014 Section 9.3).",
    "Attempt the CRACK_ME (TrueCrypt) and PGP passphrases with PRTK/DNA or a GPU cracker; test the MP3-in-WAV files "
    "and the GIF/BMP images (CameraShy carriers) with the relevant stego tools.",
    "Attack the remaining RC4-protected documents (How To Steal Credit Numbers.doc, SLIST.doc) with PRTK.",
    "Image and examine the external media referenced by the BitLocker key files and the F:/E: drive paths.",
    "Confirm the two \u201cAlert KFF\u201d images against the KFF hash library.",
])

# ═════════════════════════ Appendices ═════════════════════════
doc.add_heading("12  Supplementary Analysis: Internet Activity, Hidden Data and Intent", level=1)
doc.add_heading("12.1  Web search history \u2014 evidence of intent", level=2)
para("Browser artefacts (Temporary Internet Files and History index.dat) on both computers were parsed; 192 distinct "
     "search queries were recovered. Alongside ordinary activity, both machines show searches that align precisely "
     "with the physical evidence:")
figure("fig7_searches.png", "Figure 7 \u2014 Notable recovered web searches, grouped by theme.", 6.9)
para("These corroborate intent and knowledge: the Washer PC searched \u201chow to steal checks\u201d, \u201ccredit "
     "card printer\u201d, \u201cdebit card printer filetype:pdf\u201d, \u201cmake debit card\u201d, \u201cfake "
     "identity\u201d, \u201cchange identity\u201d, \u201cbecome invisible\u201d, \u201chiding data\u201d and "
     "\u201cencryping files\u201d; the Mantooth PC searched \u201catm card stealing\u201d, \u201ccheck washing\u201d, "
     "\u201cversacheck\u201d and \u201cstrong passwords\u201d. The data-hiding and file-encryption searches map onto "
     "the EFS, PGP, TrueCrypt and alternate-data-stream concealment actually found on the devices.")
para("Wes Mantooth\u2019s computer ran a second browser (Firefox 2), whose history, form and download data add "
     "further detail. Recovered from the Firefox profile:", after=3)
bullets([
    ("Sites visited: ", "en.wikipedia.org/wiki/Human_body_disposal (the \u2018Secret disposal\u2019 section), "
     "www.ckfraud.org/washing.html (a cheque-washing site) and www.totse.com/\u2026/speedy_drugs/ (drug-manufacture "
     "content, saved locally), plus Gmail and Hotmail webmail and the PGP trial-download pages."),
    ("Search terms (from form history): ", "\u201cbody disposal\u201d, \u201cget away with murder\u201d, \u201cmaking "
     "meth\u201d, \u201cstealing checks\u201d, \u201ccheck washing\u201d, \u201cversacheck\u201d and \u201cstrong "
     "passwords\u201d \u2014 the same themes as the Internet Explorer searches."),
    ("Registration identity: ", "form-fill data used for the PGP registration gives the name \u201cWes Mantooth\u201d, "
     "location \u201cLindon\u201d and a phone number \u2014 an identity tied to the account."),
    ("Saved credentials (recovered): ", "the Firefox password store (key3.db + signons2.txt) held two saved "
     "Google/Gmail logins. FTK and PRTK do not parse the Firefox (NSS) password store, so these were recovered with a "
     "dedicated Firefox credential-recovery tool — the only artefact in this examination that required a utility "
     "outside the FTK/PRTK suite. No Firefox master password was set, so the logins were read directly: usernames "
     "“smee.rox” and “mr.smee”, both with the password “mynameismud”. These are webmail "
     "accounts held on the machine and reuse a single password (see Table 10a)."),
])
doc.add_heading("12.2  Hidden data in alternate data streams (ADS)", level=2)
para("Two files on Wes Mantooth\u2019s drive carry hidden NTFS alternate data streams \u2014 content that does not "
     "appear in a normal directory listing:")
table(["Host file", "Hidden stream", "Contents"],
      [["Documents\\ADS\\readthis.txt", ":password.txt (73 B)",
        "Text: \u201cthe password for the doc I\u2019m sending you is: supercallifragilistic\u201d"],
       ["Documents\\ADS\\readthis.txt", ":pfah603.jpg (53 KB)", "A hidden JPEG image"],
       ["Documents\\My poem.txt", ":Supersecretstuff.zip (831 KB)",
        "A ZIP archive (not itself encrypted) containing two images"],
       ["Documents\\My poem.txt", ":HARDCORE.JPG (58 KB)", "A hidden JPEG image"]],
      [2.0, 1.8, 2.8], size=8.6,
      caption="Table 10 \u2014 Alternate data streams recovered from the Mantooth drive. The visible text of "
              "readthis.txt is reference material on \u2018bad cheques\u2019 (NSF cheques) and penalties.")
para("Hiding a password, an archive and images inside the streams of innocuous \u201creadthis.txt\u201d and \u201cMy "
     "poem.txt\u201d files is a deliberate concealment technique, and the password note confirms a method of "
     "operation: documents were password-protected and the passwords passed separately.")
doc.add_heading("12.3  Document content and recovered indicators", level=2)
para("Recovered documents were triaged for financial indicators. A Luhn-valid card number was found in the Washer "
     "PC\u2019s deleted Outlook Express items; cheque-security reference material and VersaCheck cheque-printing "
     "context appear on both machines; and the e-mailed \u201cHow To Steal Credit Numbers.doc\u201d and "
     "\u201cConfidential Business Letter.doc\u201d (the latter also deleted to the Recycle Bin) tie the documents to "
     "the e-mail traffic. Card numbers are not reproduced here; see 04_Analysis/content_triage.csv.")
doc.add_heading("12.4  Steganography", level=2)
para("There is direct evidence a steganography tool was used. The Recycle Bin held a deleted copy of "
     "“CameraShy.exe” (Table 3b), a known tool that hides encrypted data inside GIF images (converting "
     "GIF↔BMP); its own strings read “InsertSteganography / ExtractSteganography / CameraShy GIF<>BMP”. "
     "It was deleted on 2007-07-14, the same day as the ValidateCreditCard.zip and HEX32.DLL deletions. The carrier "
     "files are therefore GIF/BMP images, of which the profile holds many; extracting any hidden payload requires "
     "CameraShy and the passphrase, so the specific carrier(s) could not be confirmed by the examiner. The two "
     "“.wav” files in the Music folder are a secondary lead: both are MP3-in-WAV (format code 0x55), the "
     "carrier form used by MP3 steganography; LSB analysis does not apply to compressed MP3. No appended or embedded "
     "data was found after the logical end of any image in the profile. Together with the TrueCrypt ‘do not "
     "record volume history’ setting, the EFS and PGP encryption, the alternate data streams, the hidden Linux "
     "partition (Section 6.3.1) and the kept “junction.exe” / NTFS-junction article, this shows a sustained, "
     "varied interest in hiding data.")
doc.add_heading("12.5  Recovered passwords and passphrases", level=2)
para("The credentials recovered during the examination, consolidated:")
table(["Credential", "Value", "Source / method"],
      [["Wes Mantooth \u2014 Windows logon", "tooth", "SAM hash on Mantooth.E01 equals NTLM(\u201ctooth\u201d)"],
       ["John Washer \u2014 Administrator logon", "meth", "LM hash cracked, NTLM-confirmed"],
       ["\u201cThose who owes.xls\u201d (drug ledger)", "smack", "RC4 verification (lowercase only)"],
       ["Protected document (per ADS note)", "supercallifragilistic", "stated verbatim in readthis.txt:password.txt"],
       ["Wes Mantooth \u2014 WinVNC remote access", "schmekl3", "RealVNC fixed-key DES de-obfuscation"],
       ["Firefox saved Gmail (smee.rox, mr.smee)", "mynameismud", "Firefox NSS store — dedicated credential tool (no master pw set)"]],
      [3.1, 1.8, 2.3], size=8.6,
      caption="Table 10a \u2014 Recovered credentials. The Wes Mantooth logon password \u201ctooth\u201d decrypts his "
              "four EFS files; the Firefox login was decrypted from the NSS stores with no master password set.")

doc.add_heading("12.6  Registry user-activity analysis (Mantooth Vista)", level=2)
para("Mantooth.E01 carries a full Vista registry. Wes Mantooth\u2019s NTUSER.DAT records extensive activity "
     "(RecentDocs, RunMRU, application MRUs, TypedURLs), analysed below. Each corroborates the file-level findings.")
table(["Registry artefact", "What it shows"],
      [["RecentDocs (by extension)", "Opened files include CC Nums.xls, C money plates.doc, John.doc, Wes.doc, "
        "Those who owes.xls, ATM_THEFTS1.ppt, the prescription images, and several BitLocker key files "
        "(\u201cVista Mantooth Bitlocker Key 1.4.txt\u201d, \u201cWes Mantooth Image_Key_Dustin.txt\u201d, key.bek) \u2014 "
        "plus \u201cWASHER (F:)\u201d and \u201cMANTOOTH (F:)\u201d drive references and exported event logs "
        "(securityevt.evtx, testevt.evtx)."],
       ["RunMRU (Run box history)", "cmd, mstsc (Remote Desktop), regedt32 (registry editor), c:\\gdisk32.exe "
        "(a disk-wiping utility), msconfig, mspaint, devmgmt.msc \u2014 manual system/registry access and "
        "anti-forensic tooling."],
       ["Paint \u2014 Recent File List", "nationaltall.bmp, prescription.gif, nationaltal.gif edited in Paint "
        "(under Documents\\Scripts) \u2014 a document-forgery indicator (editing scanned prescriptions)."],
       ["Media Player \u2014 RecentFileList", "F:\\Sounds and Video\\wizoz18d.wav and pf3.wav (the MP3-in-WAV stego "
        "candidates) were played; also iPod music on E: and \u201cBill is Doomed.avi\u201d."],
       ["IE TypedURLs (25)", "tucows, tigerdirect, newegg (hardware shopping), altavista, mamma, youtube, gmail, "
        "a path F:\\Windows\\System32\\winevt (matching the exported event logs), and url24 = \u201cWes Mantooth\u201d."],
       ["Yahoo\\Pager", "Yahoo Messenger user ID \u201cincisorman420\u201d (local IP 192.168.1.106)."]],
      [1.9, 4.8], size=8.4, caption="Table 11 \u2014 Registry user-activity artefacts from Wes Mantooth\u2019s Vista "
      "NTUSER.DAT. Full output: 04_Analysis logs.")
doc.add_heading("WinVNC remote-access password (recovered)", level=3)
para("SOFTWARE\\RealVNC\\WinVNC4 shows the machine ran a VNC remote-access server (port 5900). The stored password "
     "value (a8 52 08 92 12 40 45 2d) is obfuscated with RealVNC\u2019s fixed, publicly known DES key. Decoding it "
     "(applying the standard bit-reversed key) recovers the plaintext password: \u201cschmekl3\u201d. A configured "
     "remote-access server with a recoverable password indicates the machine could be reached remotely, worth "
     "correlating with any inbound-connection evidence.")
para("BitLocker key management: RecentDocs and LNK shortcuts reference several BitLocker key files (key.bek \u2014 a "
     "BitLocker external key, \u201cVista Mantooth Bitlocker Key 1.4.txt\u201d, \u201cBitlocker Command.txt.txt\u201d). "
     "The key files themselves sit on external media (E:/F:/network shares) not in this image, but their existence "
     "shows BitLocker was in use and its keys were exported to plain text \u2014 both an anti-forensic concern and, "
     "for an investigator holding the media, a route to any BitLocker volume.")
doc.add_heading("Folder access across the network (shellbags)", level=3)
para("The shellbag records (BagMRU) in Wes Mantooth’s NTUSER.DAT preserve folders that were opened in Explorer, "
     "including ones on other machines. These show the account reaching across the network and into a volume "
     "snapshot:")
table(["Folder opened (shellbag)", "What it indicates"],
      [["\\\\TRAINING-KEN\\Johns Stuff", "A network share on host “TRAINING-KEN” holding a folder named "
        "“Johns Stuff” — a further direct link between Wes Mantooth and John Washer, browsed from "
        "Mantooth’s machine."],
       ["\\\\mediacenter\\My Internet Clearning Folder", "A network share on host “mediacenter”; the folder "
        "name (“clearning”, sic) indicates deliberate clearing/removal of Internet traces — consistent "
        "with the data-hiding and anti-forensic activity found elsewhere."],
       ["\\\\frankenputer\\Music\\Workers", "A “Music\\Workers” folder on host “frankenputer” "
        "(the WAV/MP3 stego candidates sat in a Music folder)."],
       ["\\\\localhost\\C$\\@GMT-2007.03.08-21.28.03\\Users\\Wes Mantooth",
        "Access to a Volume Shadow Copy snapshot (dated 2007-03-08 21:28:03) of the local C$ share — browsing a "
        "point-in-time copy of the user profile."]],
      [3.0, 3.7], size=8.4,
      caption="Table 11a — Network and snapshot folders opened from Wes Mantooth’s machine, recovered from "
              "shellbag (BagMRU) records. Hostnames and share paths are as stored in the registry.")

doc.add_heading("12.7  Event-log analysis \u2014 audit-log clearing and remote access", level=2)
para("The Vista Security and System event logs on Mantooth.E01 were parsed. The most significant finding is "
     "deliberate log clearing: on 2008-02-12 the audit log was cleared under the Wes Mantooth account \u2014 Event "
     "ID 1102 (\u201cthe audit log was cleared\u201d) at 16:35:01, bracketed by two Event ID 104 \u201clog cleared\u201d "
     "records at 16:34:01 and 16:35:35. Only events after the clearing survive, which is why the log covers a single "
     "day. This is direct evidence of anti-forensic activity and matches the exported \u201csecurityevt.evtx\u201d "
     "reference in the Recent Documents list (Table 11).")
para("The surviving logon records (Event ID 4624) then show the account in use through the afternoon of 2008-02-12, "
     "including several Logon Type 10 (RemoteInteractive / Remote Desktop) sessions from 192.168.1.199 (16:56, 18:23 "
     "and 19:12 UTC). Remote-desktop access, together with the configured WinVNC server (Section 12.6) and the "
     "\u201cmstsc\u201d entry in RunMRU, shows the machine was being reached remotely \u2014 a channel worth "
     "correlating with the other parties\u2019 systems (the 192.168.1.x addresses sit on the same subnet as the "
     "Washer PC). Full event list: 04_Analysis/mantooth_vista_logons.csv.")

doc.add_page_break()
doc.add_heading("Appendix A  \u2014  Hash Values", level=1)
table(["Item", "Algorithm", "Value", "Result"],
      [["Thumbdrive 05.E01 (media)", "MD5", "40fc41a365f6d1c3f524661dc06eb912", "verified"],
       ["", "SHA-1", "03c9f6ef36e7ee8dfaab7eb7c8ec0e21bc69ff41", "verified"],
       ["Washer 17.E01 (media)", "MD5", "147307d626aa2c090bd6abfe4a9a1909", "verified"],
       ["", "SHA-1", "94fad134e0f51da5c397da008ed5fca97d4c2246", "verified"],
       ["Mantooth.E01 (media)", "MD5", "31217210a1a69f272079a3bde3d9d8fc", "verified"],
       ["", "SHA-1", "12e4ac047e328ca2bd63a4d65df25b3ecba55769", "verified"],
       ["Thumbdrive 05.E01 (file)", "SHA-256", "e2ed0801ca8c276aa4cf85013945210d501ca12d57ec9abcf9c125154a799d47", "baseline"],
       ["Washer 17.E01 (file)", "SHA-256", "134e42ee763d63a1d70af5a135048143d9d544d02ebc8a673bb78bb37c7736fa", "baseline"],
       ["Mantooth.E01 (file)", "SHA-256", "f8611a87b20efc6aadb61210186cb4d26e643d012e1429e862464b653f266984", "baseline"]],
      [1.6, 0.7, 3.4, 1.0], mono=(2,), size=7.8,
      caption="\u201cMedia\u201d hashes cover the acquired data and are compared with the acquisition log. \u201cFile\u201d "
              "hashes cover the evidence container file as supplied (baseline for chain of custody).")

doc.add_heading("Appendix B  \u2014  FTK Screenshot Checklist", level=1)
para("To corroborate the report in the lab\u2019s tool of record, capture these views in FTK / FTK Imager / Registry "
     "Viewer on the lab VM:")
table(["#", "Screenshot", "Supports"],
      [["1", "FTK Imager \u2192 Verify Drive/Image for each E01 (hash match dialog)", "Section 5, Fig 1"],
       ["2", "Thumbdrive 05 evidence tree showing the four folders", "Section 6.1"],
       ["3", "Washer: RECYCLER\\\u2026-500 with INFO2 parsed (FTK Recycle Bin view)", "Table 4"],
       ["4", "cool tool.piz in hex view showing 50 4B 03 04", "Section 6.2"],
       ["5", "Washer My Documents with the EFS files flagged as encrypted", "Table 5"],
       ["6", "Outlook Express Inbox.dbx parsed in FTK, showing a txkidd \u2192 chkwasher message header", "Section 7.2"],
       ["7", "Mantooth.E01 Windows Mail Inbox showing the same message", "Section 7.2"],
       ["8", "Registry Viewer: Washer SYSTEM \u2192 USBSTOR (SanDisk Cruzer Mini serials)", "Fig 3"],
       ["9", "Registry Viewer: Mantooth SAM user accounts and the WinVNC password value", "Section 12.5/12.6"],
       ["10", "FTK file list filtered on MD5 655c3528\u2026 showing the same spreadsheet on two devices", "Table 6"],
       ["11", "FTK \u2192 Decrypt Files with \u201ctooth\u201d, showing the four EFS DOCS decrypted", "Section 9.3"]],
      [0.35, 5.0, 1.35], size=8.6)

doc.add_heading("Appendix C  \u2014  Case Working Files", level=1)
table(["Location (under Case_Work\\)", "Contents"],
      [["01_Hashes\\", "originals_manifest.csv, workingcopies_manifest.csv, image_verification.csv"],
       ["04_Analysis\\disk\\", "Full file listings per volume (allocated + deleted), Thumbdrive05_files.csv"],
       ["04_Analysis\\efs_out\\", "The four decrypted Mantooth EFS documents (Section 9.3)"],
       ["04_Analysis\\", "cross_device_matches.csv, keyword_hits.csv, email_headers.csv, washer_info2.csv"],
       ["03_Extracted\\", "Recovered files (allocated and deleted), exported registry hives and logs"],
       ["logs\\", "Processing logs for each stage"]],
      [2.2, 4.5], size=8.6)

# footer
for s in doc.sections:
    s.different_first_page_header_footer = True
    p = s.footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("DF-MW-2026-001  \u00b7  Mantooth / Washer Forensic Report  \u00b7  Page ")
    r.font.size, r.font.color.rgb = Pt(8), GREY
    page_field(p)

OUT.parent.mkdir(parents=True, exist_ok=True)
doc.save(OUT)
print("wrote", OUT, f"({len(sel)} selected messages in Table 7)")
