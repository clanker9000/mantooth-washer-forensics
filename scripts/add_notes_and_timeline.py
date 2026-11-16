"""Write a presentation-script into every slide's speaker notes and rebuild the timeline
slide with real months. Fixes the duplicated timeline slide's broken notes placeholder by
copying a working notesSlide's structure. Preserves the user's edits.

Usage: python -I add_notes_and_timeline.py <presentation.pptx>
"""
import sys
import zipfile
from pptx import Presentation

PPTX = sys.argv[1]

TIMELINE_IDX = 8  # 9th slide

NOTES = {
 0: ("Good afternoon. This is the Mantooth–Washer case — a digital forensic investigation built from three "
     "pieces of evidence handed to us with no case brief: a USB thumb drive taken from a suspect’s pocket at "
     "arrest, and the hard drives from two computers belonging to John Washer and Wes Mantooth. Our job was to find "
     "out what was on them, recover anything deleted or hidden, and — above all — work out whether these "
     "three items are connected. The short answer is yes: what we found is a single, coordinated criminal operation. "
     "Over the next few slides I’ll show you how the evidence builds to that conclusion."),
 1: ("First, the big picture. Three devices, but as we’ll see, one story. The thumb drive was seized at arrest. "
     "Washer 17 is John Washer’s Windows XP office machine. And Mantooth.E01 is Wes Mantooth’s Windows Vista "
     "computer, which turns out to be the hub of everything. Before touching any of it, we hashed all 157 supplied "
     "files and worked only on verified copies, so nothing we show you depends on altered evidence. The headline is "
     "that this isn’t a single crime — it’s drug dealing and financial fraud together, run by people "
     "who knew each other and worked hard to cover their tracks."),
 2: ("So who are we dealing with? Three e-mail accounts, pulled straight from the message headers, identify the three "
     "principals. John Washer owns the office PC — and, as we’ll see, he’s also a customer in the drug "
     "ledger. Wes Mantooth is the centre of gravity: his machine holds the ledger, the fraud documents and every "
     "concealment tool in the case. And a third associate signs himself ‘Rasco Badguy’ from the txkidd "
     "account. Even their online handles give them away — ‘dollarhyde’ is a counterfeiting reference, "
     "‘skimmerman’ points to card skimming. These are not random strangers who happen to share interests."),
 3: ("This slide is the heart of the case. It’s easy to claim two people are ‘linked’ — the real "
     "question is how strongly, and here the links are concrete and they stack up at three independent levels. First, "
     "identical files: four files are byte-for-byte identical across the devices by their MD5 hash, including the drug "
     "ledger. Second, shared hardware: the same four USB drives, matched by their unique serial numbers, appear on "
     "both computers — and John Washer’s own drive was plugged into Mantooth’s machine in February 2008. "
     "Third, e-mail: 29 messages between them, six sitting on both machines, with attachments that match files on the "
     "seized drive. Any one of these might be coincidence. All three together is a connected operation."),
 4: ("What were they actually doing? Two things at once. The first is drugs. A password-protected spreadsheet — "
     "which we cracked open — turns out to be a drug-debt ledger: ten debtors, close to nine thousand dollars "
     "outstanding, and John Washer himself owing two hundred and fifty dollars for heroin. That makes him "
     "Mantooth’s customer, which is a second, completely separate link between them. The other half is fraud, and "
     "it’s broad: stolen credit-card numbers, cheque washing, counterfeit money plates, forged prescriptions "
     "edited in Paint, ATM skimming. And the web searches on both machines — ‘how to steal checks’, "
     "‘credit card printer’ — line up exactly with the tools and files we recovered."),
 5: ("Here is that ledger broken down by drug. Close to nine thousand dollars is owed in total, and you can see heroin "
     "dominates, driven by a single five-thousand-dollar debt. But the reason this chart matters isn’t the money "
     "— it’s that John Washer’s name sits in that heroin column. The two men aren’t only e-mailing "
     "each other and passing USB sticks back and forth; one is buying drugs from the other. That is an independent "
     "thread tying them together that has nothing to do with files or hashes."),
 6: ("Now the single strongest piece of evidence. Four files on Mantooth’s drive were locked with Windows "
     "encryption. We recovered his password — ‘tooth’ — and decrypted them. Two are short "
     "messages, and they put intent in the suspects’ own words. The first arranges to hand off a stolen "
     "credit-card number, and even shows they know the cards will be cancelled — ‘they’ll be dropping "
     "off the radar as people complain they lost them.’ The second describes stealing data from a bank by a "
     "war-dialer attack, and then says, in plain English, to send it ‘encrypted so we don’t have to worry "
     "about the cops ever reading it.’ You very rarely get intent stated this clearly."),
 7: ("Which brings us to concealment — and this is what marks them out as organised rather than opportunistic. "
     "It isn’t one locked file; it’s layer after layer. Encryption in three forms: Windows EFS, PGP, and a "
     "TrueCrypt container with its history logging deliberately switched off. Hidden data: secret streams tucked "
     "inside innocent-looking text files, a steganography tool, and an entire hidden Linux partition that a Windows "
     "machine won’t even open. And then, most tellingly, in February 2008 the Windows security log on "
     "Mantooth’s machine was wiped clean. Every one of these is a deliberate choice to defeat exactly the kind of "
     "examination we were carrying out."),
 TIMELINE_IDX: (
     "Let me walk through the whole story in order, because the chronology is revealing. It begins on the 27th of "
     "February 2007, when Mantooth’s Vista machine is first built. Within weeks the toolkit goes in: on the 12th "
     "of April he orders PGP encryption software, and the next day the PGP keyrings and the encrypted ‘EFS "
     "DOCS’ fraud folder are created — so the infrastructure for a secretive operation is in place from the "
     "start. The operation runs over the summer. On the 21st of June, Washer and Mantooth are already e-mailing. "
     "Through July it accelerates: on the 12th he e-mails the ‘New Venture’ images we later find on the "
     "seized thumb drive; on the 14th the shared USB drives are connected and a steganography tool is deleted; the "
     "23rd and 24th bring a burst of messages between all three men — ‘Stuff’, ‘Sweet Info’, "
     "‘Paydirt.’ On the 24th the thumb drive is loaded in one operation, on the 25th five files on "
     "Washer’s PC are encrypted, and on the 4th of August Washer deletes six desktop items. On the 14th, "
     "Mantooth writes — and deletes — a file literally called ‘My Confession.’ Then it goes quiet "
     "until February 2008, and the mood changes completely: on the 12th he clears his security audit log, and the "
     "same day Washer’s own drive is mounted on his machine; the next day, ‘clearing’ folders appear "
     "on Washer’s PC. This is no longer building an operation — it’s erasing the trail. A few weeks "
     "later the drives are seized and imaged. That shift, from building to hiding, is itself a form of evidence."),
 9: ("So, pulling it together. Every independent line of evidence points the same way — e-mail, shared files, "
     "shared hardware, a decrypted drug ledger, and the suspects’ own encrypted words. They describe one "
     "connected operation mixing drugs with financial and document fraud, and a deliberate effort to hide it. Three "
     "devices, one operation. One honest caveat, which matters in a real case: our artefacts tie activity to user "
     "accounts, not provably to a particular person at the keyboard, and the final question of criminal guilt is for "
     "the court, not the examiner. What this examination does is establish the technical facts."),
 10: ("That’s the case. Thank you for listening — I’m happy to take any questions."),
}


def set_text(shape, text):
    tf = shape.text_frame
    p0 = tf.paragraphs[0]
    if p0.runs:
        p0.runs[0].text = text
        for r in p0.runs[1:]:
            r.text = ""
    else:
        p0.add_run().text = text
    for p in tf.paragraphs[1:]:
        p._p.getparent().remove(p._p)


def byname(slide, name):
    return next((sh for sh in slide.shapes if sh.name == name), None)


# -------- pass 1: timeline body text + notes on the 10 working slides --------
prs = Presentation(PPTX)
S = prs.slides
tl = S[TIMELINE_IDX]
set_text(byname(tl, "TextBox 3"), "TIMELINE")
set_text(byname(tl, "TextBox 17"),
         "Read in order, the artefacts tell a clear story: an operation built through 2007, then deliberately erased "
         "in early 2008.")
set_text(byname(tl, "TextBox 13"),
         "Feb–Apr 2007 — Setup. The Vista PC is built; PGP and the encrypted ‘EFS DOCS’ fraud "
         "folder are prepared.")
set_text(byname(tl, "TextBox 14"),
         "Jun–Aug 2007 — The operation. The e-mail thread, shared USB drives and files, the loaded thumb "
         "drive, and the first deletions.")
set_text(byname(tl, "TextBox 15"),
         "Feb 2008 — The cover-up. The audit log is wiped, Washer’s drive is mounted on Mantooth’s, "
         "and archive-staging begins before seizure.")
for idx, text in NOTES.items():
    if idx == TIMELINE_IDX:
        continue
    S[idx].notes_slide.notes_text_frame.text = text
prs.save(PPTX)

# -------- pass 2: replace timeline's broken notesSlide9 with a working one's structure --------
import os
tmp = PPTX + ".tmp"
with zipfile.ZipFile(PPTX, "r") as zin:
    good = zin.read("ppt/notesSlides/notesSlide1.xml")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "ppt/notesSlides/notesSlide9.xml":
                data = good  # working placeholder structure; its .rels still points to slide9
            zout.writestr(item, data)
os.replace(tmp, PPTX)

# -------- pass 3: now set the timeline notes --------
prs = Presentation(PPTX)
prs.slides[TIMELINE_IDX].notes_slide.notes_text_frame.text = NOTES[TIMELINE_IDX]
prs.save(PPTX)
print("done: timeline rebuilt (real months) + speaker-note script on all slides")
