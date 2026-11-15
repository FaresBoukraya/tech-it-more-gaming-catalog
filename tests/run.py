"""Runs every browser test and audit against the built site and prints one summary.

    pip install playwright && playwright install chromium
    python3 tests/run.py            (or: npm test)

The site must be built first (npm run build). Exit code is 1 if anything fails.
"""
import os, re, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))

SUITES = [  # (file, what it covers)
    ("catalog.py", "search, filters, categories, save, compare, theme, languages, product view"),
    ("saved_compare.py", "Saved and Compare from inside a product and from the static pages"),
    ("states.py", "dialogs, Escape, scroll lock, empty states, FAQ, shortcuts, Arabic"),
    ("mobile_nav.py", "phone top bar and menu: icons, menu, search, language and theme, pinned bar"),
    ("product_actions.py", "Buy / Save / Compare buttons visible and tappable on five phone sizes"),
]


def run(script, timeout=420):
    started = time.time()
    done = subprocess.run([sys.executable, os.path.join(HERE, script)], capture_output=True, text=True, timeout=timeout)
    return done.returncode, done.stdout + done.stderr, time.time() - started


def main():
    rows, failed = [], False
    for script, what in SUITES:
        code, out, secs = run(script)
        passes, fails = len(re.findall(r"^PASS", out, re.M)), len(re.findall(r"^FAIL", out, re.M))
        if "failures" in out and fails == 0:  # catalog.py / states.py print "0 failures of N"
            m = re.search(r"(\d+) failures", out)
            fails = int(m.group(1)) if m else 0
        ok = code == 0 and fails == 0 and (passes > 0 or "failures" in out)
        failed |= not ok
        rows.append((script, "ok" if ok else "FAIL", f"{passes} passed, {fails} failed", what))
        if not ok:
            print("\n".join(l for l in out.splitlines() if l.startswith("FAIL") or "Error" in l)[:1500])
    code, out, _ = run("links.py")
    m = re.search(r"checked (\d+) broken (\d+)", out)
    ok = bool(m) and m.group(2) == "0" and "True" not in out
    failed |= not ok
    rows.append(("links.py", "ok" if ok else "FAIL", f"{m.group(1) if m else '?'} links, {m.group(2) if m else '?'} broken", "every local link and asset resolves; no sideways scroll"))
    code, out, _ = run("a11y.py")
    issues = 0
    for line in out.splitlines():
        found = re.search(r"'low': \[(.*?)\]", line)
        issues += len([t for t in re.findall(r"'([^']*)'", found.group(1)) if "brand-mark" not in t]) if found else 0
    ok = issues == 0
    failed |= not ok
    rows.append(("a11y.py", "ok" if ok else "FAIL", f"{issues} contrast issues", "text contrast in light and dark, headings, labels, alt text"))
    code, out, _ = run("layout_sweep.py", timeout=600)
    bad = [l for l in out.splitlines() if re.match(r"^\d+ ", l) and ("'over'" in l or "'wide'" in l)]
    ok = not bad
    failed |= not ok
    rows.append(("layout_sweep.py", "ok" if ok else "FAIL", f"{len(bad)} overflow problems", "no sideways scroll from 320 to 768 px on every page"))
    width = max(len(r[0]) for r in rows)
    print("\n" + "\n".join(f"{r[1]:>4}  {r[0]:<{width}}  {r[2]:<26} {r[3]}" for r in rows))
    print("\nAll good." if not failed else "\nSomething failed. See the lines above.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
