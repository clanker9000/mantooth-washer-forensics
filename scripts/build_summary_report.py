"""Build a CONDENSED summary report (<=1500 words in the body, excluding cover page and
appendices). Separate file; does not touch the full report. DOCX only, no PDF.

Usage: python -I build_summary_report.py <case_work_dir>
"""
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
FIG = CW / "05_Report" / "figures"
OUT = CW / "05_Report" / "Mantooth_Washer_Summary_Report.docx"
INK, ACCENT, GREY, WHITE = RGBColor(0x1A, 0x1A, 0x1A), RGBColor(0x0A, 0x3D, 0x62), RGBColor(0x5F, 0x63, 0x68), RGBColor(0xFF, 0xFF, 0xFF)

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
for lvl, sz in (("Heading 1", 14), ("Heading 2", 11.5)):
    s = st[lvl]
    s.font.name, s.font.size, s.font.bold, s.font.color.rgb = "Calibri", Pt(sz), True, ACCENT
    s.paragraph_format.space_before, s.paragraph_format.space_after = Pt(10), Pt(3)
    s.paragraph_format.keep_with_next = True

BODY_WORDS = []  # collect body text for counting


def fontname(run, name):
    run.font.name = name
    rf = run._element.get_or_add_rPr().get_or_add_rFonts()
    for k in ("w:ascii", "w:hAnsi", "w:cs"):
        rf.set(qn(k), name)


def para(text="", size=10.5, bold=False, color=INK, italic=False, after=6, align=None, count=False):
    p = doc.add_paragraph()
    if align is not None:
        p.alignment = align
    p.paragraph_format.space_after = Pt(after)
    if text:
        r = p.add_run(text)
        r.font.size, r.bold, r.italic, r.font.color.rgb = Pt(size), bold, italic, color
        fontname(r, "Calibri")
        if count:
            BODY_WORDS.append(text)
    return p


def lead(label, body):
    """A run of bold label + body text (counts toward body)."""
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    r1 = p.add_run(label); r1.bold = True; r1.font.size = Pt(10.5); fontname(r1, "Calibri")
    r2 = p.add_run(body); r2.font.size = Pt(10.5); fontname(r2, "Calibri")
    BODY_WORDS.append(label + " " + body)
    return p


def h1(text):
    doc.add_heading(text, level=1)
    BODY_WORDS.append(text)


def shade(cell, hex_fill):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement("w:shd"); shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), hex_fill)
    tcPr.append(shd)


def table(headers, rows, widths, size=9.0, count=False):
    t = doc.add_table(rows=1, cols=len(headers)); t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.style = "Table Grid"; t.autofit = False
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]; c.width = Inches(widths[i]); shade(c, "0A3D62")
        r = c.paragraphs[0].add_run(h); r.bold, r.font.size, r.font.color.rgb = True, Pt(9), WHITE; fontname(r, "Calibri")
        if count:
            BODY_WORDS.append(h)
    for k, row in enumerate(rows):
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].width = Inches(widths[i])
            if k % 2:
                shade(cells[i], "EEF2F6")
            p = cells[i].paragraphs[0]; p.paragraph_format.space_after = Pt(0)
            r = p.add_run(str(v)); r.font.size = Pt(size); fontname(r, "Calibri")
            if count:
                BODY_WORDS.append(str(v))
    para(after=3)


def figure(name, caption, width=6.3):
    doc.add_picture(str(FIG / name), width=Inches(width))
    doc.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
    para(caption, size=8.6, italic=True, color=GREY, after=8, align=WD_ALIGN_PARAGRAPH.CENTER)  # captions not counted


# ============ COVER PAGE (not counted) ============
para(after=36)
para("DIGITAL FORENSIC EXAMINATION — SUMMARY REPORT", 19, True, ACCENT, after=4, align=WD_ALIGN_PARAGRAPH.CENTER)
para("Mantooth / Washer Investigation", 13.5, True, INK, after=20, align=WD_ALIGN_PARAGRAPH.CENTER)
t = doc.add_table(rows=0, cols=2); t.alignment = WD_TABLE_ALIGNMENT.CENTER
for k, v in [("Examiner (analysis)", "[Student Name / ID]"),
             ("Source case numbers", "08-1234 / AD-08-99 (Thumbdrive 05) · 08-12345 / AD-08-98 (Washer 17)"),
             ("Items examined", "Thumbdrive 05.E01 · Washer 17.E01 · Mantooth.E01"),
             ("Nature of data", "Forensic training images; persons and events are simulated")]:
    row = t.add_row().cells
    row[0].width, row[1].width = Inches(1.9), Inches(4.6)
    r = row[0].paragraphs[0].add_run(k); r.bold = True; r.font.size = Pt(10); fontname(r, "Calibri")
    r2 = row[1].paragraphs[0].add_run(v); r2.font.size = Pt(10); fontname(r2, "Calibri")
para("This is a condensed summary; the full examination record is held separately.", 9.5, italic=True,
     color=GREY, after=6, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ============ BODY (counted) ============
h1("1  Executive Summary")
para("Three forensic images were examined: a USB thumb drive seized at arrest (case 08-1234), John Washer’s "
     "Windows XP office PC, and Wes Mantooth’s Windows Vista computer (case 08-12345). The examination shows they "
     "are not three separate items but one connected operation combining drug trafficking with financial and document "
     "fraud. The devices are tied together at three independent levels: identical files (matching MD5 hashes, including "
     "a drug-debt ledger), shared removable media (the same USB drives by serial number on both computers, and John "
     "Washer’s own drive mounted on Mantooth’s machine), and e-mail (29 recovered messages between the "
     "principals, six present on both machines). A decrypted drug ledger lists John Washer as a customer; decrypted EFS "
     "documents record the suspects arranging credit-card fraud and bank-data theft in their own words. Both computers "
     "show deliberate concealment — encryption, steganography, a hidden Linux partition — and, in February "
     "2008, a cleared Windows audit log.", count=True)

h1("2  Scope and Methodology")
para("No case brief was supplied; the examination set its own objectives: verify integrity, recover deleted and "
     "encrypted data, identify users and activity, and determine how the items connect. All work was performed on "
     "verified working copies using the laboratory’s standard tools — AccessData FTK and FTK Imager, Registry "
     "Viewer and PRTK, with Autopsy for the Linux partition. NTFS, registry and event timestamps are reported in UTC; "
     "FAT timestamps are local time. Mantooth.vhd is a format copy of Mantooth.E01, not a separate exhibit. All 157 "
     "supplied files were hashed before analysis and the working copies matched exactly; each E01 reproduced the MD5 "
     "and SHA-1 recorded in its FTK Imager acquisition log (Appendix A), and the originals were never modified.",
     count=True)

h1("3  Correlation — How the Devices Connect")
figure("fig2_device_links.png", "Figure 1 — Links between the three seized devices.", 6.0)
lead("Shared hardware. ", "The USBSTOR registry keys on both computers record the same four USB devices by unique "
     "serial number — not merely the same models — including a SanDisk Cruzer Mini used on Mantooth’s PC "
     "on 14 July 2007 and then Washer’s on 25 July. A shortcut on the Mantooth drive shows John Washer’s own "
     "system volume (serial 50172777, matching Washer 17) mounted on Mantooth’s machine on 12 February 2008.")
lead("Identical files. ", "Four files match byte-for-byte by MD5 across the devices, including the spreadsheet "
     "“Those who owes.xls”; two alert-listed images link all three devices and were deleted on the Washer PC.")
lead("E-mail. ", "The case keyword list resolves to three accounts — John Washer (chkwasher@comcast.net), Wes "
     "Mantooth (dollarhyde86@comcast.net) and “Rasco Badguy” (txkidd@swbell.net). 29 distinct messages "
     "between them were recovered, six present on both machines, and their attachments are byte-identical to files on "
     "the seized thumb drive — the “New Venture” message’s three image attachments, for example, "
     "match files in the drive’s “Business Ideas” folder.")

h1("4  The Crimes and the Decrypted Evidence")
lead("Drugs. ", "“Those who owes.xls” (opened with the recovered password “smack”) is a drug-debt "
     "ledger: ten debtors; heroin, methamphetamine, ketamine and marijuana; and $8,601.42 outstanding. One debtor is "
     "John Washer, owing $250 for heroin — placing him as Mantooth’s customer, independent of the other links.")
lead("Fraud. ", "The drives hold credit-card data, cheque-washing material (VersaCheck, before-and-after cheque "
     "images), counterfeit-currency plates, forged prescriptions edited in MS Paint, and an ATM-thefts presentation. "
     "Web searches on both machines (“how to steal checks”, “credit card printer”, “atm card "
     "stealing”) match the tools and files found.")
lead("The seized thumb drive. ", "The drive taken at arrest holds the drug ledger, an ATM-thefts presentation and "
     "fraud images, all written in a single copy operation on 24 July 2007 — directly tying the arrest exhibit "
     "to the two computers.")
lead("Decrypted EFS documents. ", "Four EFS-encrypted files in Mantooth’s “EFS DOCS” folder were "
     "decrypted with his account password “tooth” (FTK Decrypt Files). They include a “Credit Card "
     "Numbers” spreadsheet and two messages that state intent plainly: “John.doc” arranges to “pass "
     "off the credit card number I got yesterday … they’ll be dropping off the radar as people complain they "
     "lost them”, and “Wes.doc” describes obtaining bank data “on a war dialer attack” and "
     "sending it “encrypted so we don’t have to worry about the cops ever reading it”.")

h1("5  Concealment and Anti-Forensics")
para("Both computers show a sustained, varied effort to hide data: EFS encryption, PGP keyrings, a TrueCrypt container "
     "(“CRACK_ME”) with volume-history logging deliberately disabled, and a deleted GIF/BMP steganography "
     "tool (CameraShy). Two innocuous-looking files, “readthis.txt” and “My poem.txt”, carry hidden "
     "NTFS alternate data streams (ADS) holding a password note — “the password … is: "
     "supercallifragilistic” — together with a ZIP archive and images, a method of passing protected "
     "documents and their passwords separately. A second, hidden Linux EXT2 partition that a Windows host will not "
     "mount contains a “/Stuff” folder with a car-theft guide and images, and a deleted-then-recovered file "
     "named “My Confession.txt” admits the activity. Most significantly, the Mantooth machine’s Windows "
     "Security audit log was cleared on 12 February 2008 (Event ID 1102), and a disguised ZIP archive (renamed "
     "“.piz”) appears on the Washer PC. On the Washer machine the Administrator also deleted six Desktop "
     "items — among them a “Confidential Business Letter” and blank-card images — on 4 August 2007, "
     "days after the key e-mails.", count=True)

h1("6  Internet Activity, Hidden Data and Credentials")
lead("Web history. ", "Both computers’ browsers were parsed; recovered searches include “how to steal "
     "checks”, “credit card printer”, “fake identity”, “check washing” and “atm "
     "card stealing”, mapping directly onto the tools and files found. Firefox history on the Mantooth machine "
     "also reaches cheque-washing and drug-manufacture pages.")
lead("Saved credentials. ", "The Firefox password store had no master password, so two saved Google/Gmail logins were "
     "recovered directly (usernames “smee.rox” and “mr.smee”, password “mynameismud”). A "
     "configured RealVNC server stored a remote-access password that decodes to “schmekl3”, showing the "
     "machine could be reached remotely; event logs then show several Remote Desktop logons from the same subnet.")
lead("Registry activity. ", "Wes Mantooth’s user hive records opening the fraud documents and the drug ledger, "
     "editing scanned prescriptions in MS Paint, and running a disk-wiping utility (gdisk32) and Remote Desktop. "
     "Shellbag records show folders opened across the network, including “\\\\TRAINING-KEN\\Johns Stuff” "
     "— a further Washer link — and a “My Internet Clearning Folder”.")

h1("7  Reconstructed Timeline")
figure("fig5_timeline.png", "Figure 2 — Key events (sequence, not to scale).", 6.6)
para("The artefacts reconstruct a clear arc. Through 2007 the operation is built: the PGP and EFS toolkit in spring, "
     "the e-mail thread and shared files in June–July, the thumb drive loaded in a single operation on 24 July, "
     "and the first Recycle Bin deletions in August. In February 2008 the behaviour shifts to concealment — the "
     "audit log is cleared, Washer’s drive is mounted on Mantooth’s machine, and archive-staging folders are "
     "created on the Washer PC. The drives were seized and imaged in March and July 2008.", count=True)

h1("8  Encryption and Passwords Recovered")
para("The recovered credentials unlocked the key evidence:", count=True)
table(["Credential", "Value"],
      [["Wes Mantooth — Windows logon (decrypts the EFS files)", "tooth"],
       ["Washer — Administrator logon", "meth"],
       ["Drug ledger — “Those who owes.xls”", "smack"],
       ["Protected document (per hidden ADS note)", "supercallifragilistic"]],
      [4.6, 2.0], count=True)
para("The five Washer EFS files decrypt with “meth”. The TrueCrypt container and the PGP private-key "
     "passphrase were not recovered — their secrets are not in the case vocabulary and would need a broader PRTK "
     "attack.", count=True)

h1("9  Conclusions")
para("The three devices are connected, and the connections are consistent across every artefact type.", count=True)
lead("Facts (observed). ", "The decrypted ledger and its named debtors; identical MD5 hashes across devices; "
     "Washer’s volume serial recorded as mounted on Mantooth’s machine; the audit-log-clearing event (ID "
     "1102); the recovered passwords; and the EFS, PGP, TrueCrypt, ADS and EXT2 artefacts.")
lead("Reasonable interpretations. ", "That the parties acted together; that the searches and tools reflect intent and "
     "knowledge; and that the deletions, log-clearing and encryption were attempts to conceal activity.")
lead("Assumptions (not proven). ", "That a named individual was at the keyboard for a given action — artefacts "
     "attribute activity to accounts, not persons; that the “FAMILY PIX” drive used on both PCs is the "
     "seized Thumbdrive 05 (the serials differ); and the ultimate real-world criminality, which is for the "
     "investigating authority to determine. This report establishes the technical facts.")

h1("10  Limitations")
para("Findings attribute activity to user accounts rather than named individuals. The shared USB devices are matched "
     "by registry serial numbers; only Thumbdrive 05 was physically seized. The TrueCrypt container and PGP passphrase "
     "remain unrecovered. The two alert-listed (KFF) images were identified by name and should be confirmed against "
     "the hash library.", count=True)

# ============ APPENDICES (not counted) ============
doc.add_page_break()
doc.add_heading("Appendix A  —  Hash Values", level=1)
table(["Item", "Algorithm", "Value", "Result"],
      [["Thumbdrive 05.E01", "MD5", "40fc41a365f6d1c3f524661dc06eb912", "verified"],
       ["", "SHA-1", "03c9f6ef36e7ee8dfaab7eb7c8ec0e21bc69ff41", "verified"],
       ["Washer 17.E01", "MD5", "147307d626aa2c090bd6abfe4a9a1909", "verified"],
       ["", "SHA-1", "94fad134e0f51da5c397da008ed5fca97d4c2246", "verified"],
       ["Mantooth.E01", "MD5", "31217210a1a69f272079a3bde3d9d8fc", "verified"],
       ["", "SHA-1", "12e4ac047e328ca2bd63a4d65df25b3ecba55769", "verified"]],
      [1.6, 0.9, 3.4, 0.8], size=8.4)
para("Media hashes recomputed from the working copies match each image’s FTK Imager acquisition log.",
     size=8.6, italic=True, color=GREY, after=8)

doc.add_heading("Appendix B  —  Glossary", level=1)
table(["Term", "Meaning"],
      [["EFS", "Encrypting File System — Windows per-file encryption tied to the user’s password."],
       ["MFT / NTFS", "The Master File Table indexes every NTFS file, including deleted records."],
       ["ADS", "Alternate Data Stream — hidden NTFS content not shown in a normal listing."],
       ["USBSTOR", "Registry key listing attached USB storage devices by model and serial number."],
       ["LNK", "Windows shortcut file recording a target’s path, volume serial and timestamps."],
       ["RC4", "Stream cipher used by legacy Microsoft Office “password to open”."],
       ["Event ID 1102", "Windows Security event meaning “the audit log was cleared”."],
       ["MD5 / SHA-1", "Hash values used to prove an image or file is unaltered."],
       ["FTK / PRTK", "AccessData Forensic Toolkit (analysis) and Password Recovery Toolkit."]],
      [1.5, 5.1], size=8.6)

OUT.parent.mkdir(parents=True, exist_ok=True)
doc.save(OUT)

# ---- word count of the body only ----
text = " ".join(BODY_WORDS)
words = re.findall(r"[A-Za-z0-9][A-Za-z0-9'’$.,/@-]*", text)
print(f"wrote {OUT}")
print(f"BODY word count (excl. cover page, appendices, figure captions): {len(words)}")
