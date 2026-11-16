"""Parse Windows .evtx logs for logon/account/log-management events and build a timeline.

Usage: python -I evtx_logons.py <out_csv> <evtx1> [evtx2 ...]
"""
import csv
import re
import sys
from pathlib import Path

from Evtx.Evtx import Evtx

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

INTEREST = {
    "4624": "Logon (success)", "4625": "Logon FAILED", "4634": "Logoff", "4647": "User-initiated logoff",
    "4648": "Logon with explicit creds", "4672": "Special privileges assigned", "4720": "Account CREATED",
    "4722": "Account enabled", "4723": "Password change attempt", "4724": "Password reset", "4725": "Account disabled",
    "4726": "Account DELETED", "4738": "Account changed", "4740": "Account locked out", "1102": "AUDIT LOG CLEARED",
    "104": "Event log cleared", "4616": "System time changed", "6005": "Event log started", "6006": "Event log stopped",
    "7045": "Service installed", "1100": "Event log service shutdown",
}
LTYPE = {"2": "Interactive", "3": "Network", "4": "Batch", "5": "Service", "7": "Unlock", "10": "RemoteInteractive(RDP)",
         "11": "CachedInteractive"}


def field(xml, name):
    m = re.search(rf'Name="{name}"[^>]*>([^<]*)<', xml) or re.search(rf"<{name}>([^<]*)</{name}>", xml)
    return m.group(1) if m else ""


rows = []
for path in sys.argv[2:]:
    log = Path(path).name
    try:
        with Evtx(path) as ev:
            for rec in ev.records():
                try:
                    xml = rec.xml()
                except Exception:
                    continue
                eid = field(xml, "EventID") or (re.search(r"<EventID[^>]*>(\d+)", xml) or [None, ""])[1]
                if eid not in INTEREST:
                    continue
                ts = (re.search(r'SystemTime="([^"]+)"', xml) or ["", ""])[1][:19]
                user = field(xml, "TargetUserName") or field(xml, "SubjectUserName")
                ltype = field(xml, "LogonType")
                ip = field(xml, "IpAddress")
                workstation = field(xml, "WorkstationName")
                rows.append([ts, log, eid, INTEREST[eid], user, LTYPE.get(ltype, ltype), ip or workstation])
                _ = field  # keep
    except Exception as exc:
        print(f"  (error reading {log}: {exc})")

rows.sort(key=lambda r: r[0])
with open(sys.argv[1], "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["time_utc", "log", "event_id", "meaning", "user", "logon_type", "ip/workstation"])
    w.writerows(rows)
print(f"{len(rows)} events of interest -> {sys.argv[1]}\n")
from collections import Counter
print("counts:", dict(Counter(f"{r[2]} {r[3]}" for r in rows)))
print("\n-- logon / account / log-clear events (chronological) --")
for r in rows:
    if r[2] in ("4624", "4625", "4720", "4726", "4740", "1102", "104", "4724", "4723"):
        print(f"  {r[0]}  {r[2]} {r[3]:22s} user={r[4]!r:18s} {r[5]:14s} {r[6]}")
