import sys, collections
from Evtx.Evtx import Evtx
for p in sys.argv[1:]:
    comps = collections.Counter(); first = last = None; n = 0
    with Evtx(p) as log:
        for rec in log.records():
            x = rec.xml(); n += 1
            i = x.find("<Computer>"); j = x.find("</Computer>")
            if i >= 0: comps[x[i+10:j]] += 1
            t = rec.timestamp()
            first = t if first is None or t < first else first
            last = t if last is None or t > last else last
            if n >= 3000: break
    print(p.split("\\")[-1], "| records(sampled):", n, "| range:", first, "->", last, "| computers:", dict(comps.most_common(3)))
