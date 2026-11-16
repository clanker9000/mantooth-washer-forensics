"""System & user profile from SOFTWARE + SYSTEM + SAM hives (read-only).

Usage: python -I reg_system_profile.py <SOFTWARE> <SYSTEM> <SAM> <SECURITY>
"""
import struct
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from reglib import filetime, key, kts, open_hive, subkeys, val, values  # noqa: E402

soft_p, sys_p, sam_p, sec_p = sys.argv[1:5]
SOFT = open_hive(soft_p)
SYS = open_hive(sys_p)
SAM = open_hive(sam_p)


def cur():
    sel = val(key(SYS, "Select"), "Current")
    return f"ControlSet{sel:03d}" if sel else "ControlSet001"


CS = cur()
print("=" * 70, "\nSYSTEM IDENTITY\n", "=" * 70)
cv = values(key(SOFT, "Microsoft\\Windows NT\\CurrentVersion"))
for f in ("ProductName", "EditionID", "ReleaseId", "CurrentBuild", "CurrentBuildNumber", "BuildLab",
          "RegisteredOwner", "RegisteredOrganization", "InstallTime"):
    if f in cv:
        v = cv[f]
        if f == "InstallTime":
            v = filetime(v)
        print(f"  {f:24s}: {v}")
it = cv.get("InstallDate")
if isinstance(it, int):
    import datetime as _dt
    print(f"  {'InstallDate':24s}: {_dt.datetime.fromtimestamp(it, _dt.timezone.utc):%Y-%m-%d %H:%M:%S} UTC")
cn = val(key(SYS, f"{CS}\\Control\\ComputerName\\ComputerName"), "ComputerName")
print(f"  {'ComputerName':24s}: {cn}  (active controlset: {CS})")
tz = values(key(SYS, f"{CS}\\Control\\TimeZoneInformation"))
print(f"  {'TimeZone':24s}: {tz.get('TimeZoneKeyName')} bias={tz.get('ActiveTimeBias')} (min)")
shut = val(key(SYS, f"{CS}\\Control\\Windows"), "ShutdownTime")
print(f"  {'Last ShutdownTime':24s}: {filetime(shut)}")

print("\n" + "=" * 70, "\nLOCAL USERS (SAM)\n", "=" * 70)
names = key(SAM, "SAM\\Domains\\Account\\Users\\Names")
for sub in subkeys(names):
    nk = sub.name
    uk = key(SAM, f"SAM\\Domains\\Account\\Users\\Names\\{nk}")
    # the Names subkey's default value *type* encodes the RID
    rid = ""
    try:
        d = uk.value("(Default)")
        rid = d.type
    except Exception:
        pass
    fk = values(key(SAM, f"SAM\\Domains\\Account\\Users\\{rid:08X}")) if isinstance(rid, int) else {}
    f = fk.get("F")
    lastlogin = ""
    if isinstance(f, (bytes, bytearray)) and len(f) >= 24:
        lastlogin = filetime(int.from_bytes(f[8:16], "little"))
    print(f"  user={nk!r:22s} RID={rid if isinstance(rid, int) else '?':<6} created={kts(sub)} last_login={lastlogin}")

print("\n" + "=" * 70, "\nNETWORK PROFILES (known networks)\n", "=" * 70)
for sub in subkeys(key(SOFT, "Microsoft\\Windows NT\\CurrentVersion\\NetworkList\\Profiles")):
    vv = values(sub)
    print(f"  {vv.get('ProfileName')!r} created={filetime(vv.get('DateCreated'))} "
          f"last={filetime(vv.get('DateLastConnected'))} managed_by_dhcp={vv.get('NameType')}")

print("\n" + "=" * 70, "\nNETWORK INTERFACES (DHCP/IP)\n", "=" * 70)
for sub in subkeys(key(SYS, f"{CS}\\Services\\Tcpip\\Parameters\\Interfaces")):
    vv = values(sub)
    if vv.get("DhcpIPAddress") or vv.get("IPAddress"):
        print(f"  {sub.name}: dhcp_ip={vv.get('DhcpIPAddress')} ip={vv.get('IPAddress')} "
              f"gw={vv.get('DhcpDefaultGateway')} domain={vv.get('DhcpDomain')} server={vv.get('DhcpServer')} "
              f"lease={vv.get('LeaseObtainedTime')}")

print("\n" + "=" * 70, "\nUSB / USBSTOR DEVICE HISTORY\n", "=" * 70)
for sub in subkeys(key(SYS, f"{CS}\\Enum\\USBSTOR")):
    for inst in subkeys(sub):
        vv = values(inst)
        print(f"  {sub.name}")
        print(f"      serial={inst.name}  friendly={vv.get('FriendlyName')!r}")
mounted = values(key(SOFT, "Microsoft\\Windows Portable Devices\\Devices"))
for sub in subkeys(key(SOFT, "Microsoft\\Windows Portable Devices\\Devices")):
    vv = values(sub)
    if vv.get("FriendlyName"):
        print(f"  WPD {sub.name} -> {vv.get('FriendlyName')!r}")

print("\n" + "=" * 70, "\nINSTALLED SOFTWARE (uninstall entries)\n", "=" * 70)
seen = set()
for base in ("Microsoft\\Windows\\CurrentVersion\\Uninstall",
             "WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall"):
    for sub in subkeys(key(SOFT, base)):
        vv = values(sub)
        n = vv.get("DisplayName")
        if n and n not in seen:
            seen.add(n)
            print(f"  {n}  {vv.get('DisplayVersion', '')}  [{vv.get('Publisher', '')}] {vv.get('InstallDate', '')}")
