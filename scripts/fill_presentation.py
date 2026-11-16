"""Fill the forensic-themed template with the Mantooth/Washer findings, preserving all
artwork. Replaces lorem text run-by-run, swaps the placeholder chart, adds speaker notes.

Usage: python -I fill_presentation.py <presentation.pptx>
"""
import sys
from pptx import Presentation

PPTX = sys.argv[1]
CHART = r"<CASE_ROOT>\Case_Work\05_Report\chart_new.png"
prs = Presentation(PPTX)
S = prs.slides


def set_text(shape, text):
    tf = shape.text_frame
    paras = tf.paragraphs
    p0 = paras[0]
    if p0.runs:
        p0.runs[0].text = text
        for r in p0.runs[1:]:
            r.text = ""
    else:
        p0.add_run().text = text
    for p in paras[1:]:
        p._p.getparent().remove(p._p)


def by_name(slide, name):
    for sh in slide.shapes:
        if sh.name == name:
            return sh
    return None


def apply(slide_idx, mapping):
    slide = S[slide_idx]
    for name, text in mapping.items():
        sh = by_name(slide, name)
        if sh is not None and sh.has_text_frame:
            set_text(sh, text)
        else:
            print(f"  [warn] slide {slide_idx+1}: shape {name!r} not found")


def replace_presenter(slide, new):
    for sh in slide.shapes:
        if sh.has_text_frame and "Michael Adebayo" in sh.text_frame.text:
            set_text(sh, new)


def notes(slide_idx, text):
    S[slide_idx].notes_slide.notes_text_frame.text = text


STUDENT = "[Student Name / ID]"

# --- Slide 1: title ---
replace_presenter(S[0], STUDENT)
notes(0, "Title slide. This is the Mantooth/Washer case: three forensic images reconstructed into one connected "
         "drug-and-fraud operation. Case numbers 08-1234 and 08-12345 come from the acquisition logs.")

# --- Slide 2: overview ---
apply(1, {"TextBox 15":
          "Three forensic images were examined: a USB thumb drive seized at arrest, John Washer\u2019s Windows XP "
          "office PC, and Wes Mantooth\u2019s Windows Vista computer. They are not three separate items but one "
          "connected operation \u2014 combining drug dealing with financial and document fraud. All 157 supplied "
          "files were hash-verified before analysis, and all work was done on verified copies, leaving the "
          "originals untouched."})
notes(1, "Set the thesis: three devices, one story. The thumb drive was taken from a suspect at arrest; the other "
         "two are the suspects' computers. Integrity first \u2014 157 of 157 files verified, originals never "
         "altered, so nothing rests on tampered evidence.")

# --- Slide 3: suspects ---
apply(2, {"TextBox 3": "suspects",
          "TextBox 17": "Three e-mail accounts, resolved from message headers, identify the principals \u2014 and "
                        "their own files and hardware tie them to one another.",
          "TextBox 13": "John Washer (chkwasher@comcast.net) \u2014 the office-PC owner, and a customer in the drug ledger.",
          "TextBox 14": "Wes Mantooth (dollarhyde86@comcast.net) \u2014 the hub: the ledger, the fraud files and the concealment tools.",
          "TextBox 15": "\u2018Rasco Badguy\u2019 (txkidd@swbell.net) \u2014 the third associate, driving the July message burst."})
notes(2, "The people. Three accounts resolve from the e-mail headers to three principals. Wes Mantooth is the hub "
         "\u2014 he recurs on every later slide. Note the handles themselves hint at the crimes: dollarhyde "
         "(counterfeiting), skimmerman (card skimming).")

# --- Slide 4: links ---
apply(3, {"TextBox 8": "links",
          "TextBox 9": "Identical files. Four files match byte-for-byte (MD5) across the devices, including the drug ledger.",
          "TextBox 10": "Shared hardware. Four USB devices by serial on both PCs; Washer\u2019s own drive was mounted on Mantooth\u2019s machine on 2008-02-12.",
          "TextBox 11": "Shared e-mail. 29 messages between the principals; six on both machines, with attachments matching the seized drive."})
notes(3, "This is the core of the case \u2014 the cork-board of connections. The links are concrete and at three "
         "layers: identical files by hash, the same physical USB drives by serial on both PCs (and Washer's own "
         "drive mounted on Mantooth's), and shared e-mail whose attachments are the seized files. Any one might be "
         "coincidence; all three together is a connected operation.")

# --- Slide 5: crimes ---
apply(4, {"TextBox 16": "crimes",
          "TextBox 17": "Two offence types run together. The decrypted spreadsheet \u2018Those who owes.xls\u2019 is a "
                        "drug-debt ledger: ten debtors and $8,601.42 outstanding, with John Washer owing $250 for "
                        "heroin \u2014 placing him as Mantooth\u2019s customer.",
          "TextBox 18": "Alongside the drugs: credit-card theft, cheque washing, counterfeit-currency plates, forged "
                        "prescriptions and ATM skimming \u2014 each backed by files on the drives and matching web searches."})
notes(4, "The case is drugs AND fraud. The password-protected ledger (opened with 'smack') lists ten drug debtors, "
         "and John Washer is one of them \u2014 a second, independent link between the suspects. The fraud is broad: "
         "cards, cheques, counterfeit currency, prescriptions, ATM skimming, all backed by real files.")

# --- Slide 6: the ledger (chart) ---
apply(5, {"TextBox 4": "the ledger",
          "TextBox 6": "Outstanding debt by drug :",
          "TextBox 7": "The ledger totals $8,601.42 across ten debtors. Heroin dominates the outstanding balance, "
                       "and John Washer is among the heroin debtors \u2014 an independent link to Wes Mantooth."})
# swap the placeholder chart image
for rel in list(S[5].part.rels.values()):
    if "image26" in rel.target_ref:
        rel.target_part._blob = open(CHART, "rb").read()
        print("  chart image swapped")
notes(5, "The ledger quantified. $8,601.42 across ten debtors, and heroin is most of it \u2014 driven by one $5,000 "
         "debt. John Washer sits in the heroin column, which is the independent drug link to Mantooth.")

# --- Slide 7: evidence (the decrypted smoking gun) ---
apply(6, {"TextBox 16": "evidence",
          "TextBox 17": "From \u2018John.doc\u2019, decrypted with the password \u2018tooth\u2019: \u201c\u2026 pass off "
                        "the credit card number I got yesterday. We\u2019ll have to hurry \u2026 they\u2019ll be "
                        "dropping off the radar as people complain they lost them. See you at the fountain \u2026 1230.\u201d",
          "TextBox 18": "From \u2018Wes.doc\u2019: \u201cI got this document from the bank on a war dialer attack \u2026 "
                        "send it to you encrypted so we don\u2019t have to worry about the cops ever reading it.\u201d"})
notes(6, "The strongest finding. Four EFS-encrypted files were decrypted with Mantooth's password 'tooth' (FTK's "
         "Decrypt Files). Two are messages that state intent in the suspects' own words \u2014 arranging a hand-off "
         "of stolen card numbers, and stealing bank data by war-dialer with an explicit plan to use encryption to "
         "defeat law enforcement. Let this slide breathe.")

# --- Slide 8: cover-up (anti-forensics) ---
apply(7, {"TextBox 3": "cover-up",
          "TextBox 12": "Across the drives, the suspects took deliberate, varied steps to hide the evidence \u2014 and, "
                        "in February 2008, to erase the trail.",
          "TextBox 13": "Encryption \u2014 EFS, PGP keyrings and a TrueCrypt container.",
          "TextBox 14": "Hidden data \u2014 alternate data streams, a deleted stego tool and a hidden Linux partition.",
          "TextBox 15": "Erasing the trail \u2014 the Security audit log was cleared (Event 1102), Feb 2008."})
notes(7, "What marks organised offenders is the breadth of concealment: layered encryption, hidden data in several "
         "forms, and \u2014 most tellingly \u2014 a cleared Windows audit log in February 2008. Each method is "
         "independent; together they show intent to defeat exactly this kind of examination.")

# --- Slide 9: conclusion ---
apply(8, {"TextBox 8": "Every independent line of evidence points the same way: e-mail, shared files, shared "
                       "hardware, a decrypted drug ledger and the suspects\u2019 own encrypted words describe one "
                       "connected drug-and-fraud operation, with deliberate steps taken to conceal it. Three "
                       "devices. One operation. Findings attribute activity to accounts, not provably to named "
                       "individuals; the ultimate characterisation is for the investigating authority."})
notes(8, "Close on the thesis. The value is corroboration \u2014 every line of evidence agrees. End with the "
         "honest caveat: artefacts attribute activity to accounts, not provably to named people, and the final "
         "legal characterisation is for the investigating authority.")

# --- Slide 10: Q&A --- (no text change)
notes(9, "Questions.")

# --- Slide 11: thank you ---
replace_presenter(S[10], STUDENT)
notes(10, "Thank you. The full written report carries the methodology, the full tables, and the appendices.")

prs.save(PPTX)
print("saved", PPTX)
