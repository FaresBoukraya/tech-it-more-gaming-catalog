"""Phone top bar and menu: logo, search, saved, compare and a menu button; no bottom bar."""
import os, http.server, threading, socketserver
from playwright.sync_api import sync_playwright

root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def translate_path(self, p):
        p = p.split('?')[0].split('#')[0]; full = os.path.join(root, p.lstrip('/'))
        return os.path.join(full, 'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address = True
s = socketserver.TCPServer(("127.0.0.1", 8950), H); threading.Thread(target=s.serve_forever, daemon=True).start()
B = "http://127.0.0.1:8950"
def ok(n, c, d=""): print(("PASS " if c else "FAIL ") + n, d)

HIT = """sel=>{const e=document.querySelector(sel);if(!e)return 'missing';const r=e.getBoundingClientRect();if(r.width<44||r.height<44)return 'too small '+Math.round(r.width)+'x'+Math.round(r.height);const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return (t&&e.contains(t))?'ok':'covered by '+(t?(t.id||t.className||t.tagName):'nothing')}"""
BAR = """()=>{const h=document.querySelector('.tm-header').getBoundingClientRect();return {top:Math.round(h.top),h:Math.round(h.height),vh:innerHeight}}"""
INMENU = """()=>({lang:!!document.querySelector('#site-menu .tm-language'),theme:!!document.querySelector('#site-menu #theme-toggle'),links:document.querySelectorAll('#site-menu .tm-menu-nav a').length})"""

with sync_playwright() as pw:
    b = pw.chromium.launch()
    for vw, vh in ((360, 640), (390, 844), (430, 932)):
        for page, u in (("home", "/index.html"), ("product page", "/p/razer-deathadder-v3/index.html"), ("category", "/c/mice/index.html"), ("guide", "/how-we-choose/index.html")):
            for th in ("light", "dark"):
                ctx = b.new_context(viewport={"width": vw, "height": vh}, color_scheme=th, has_touch=True, is_mobile=True); pg = ctx.new_page(); pg.goto(B + u); pg.wait_for_timeout(800)
                n = f"{vw} {page} {th}"
                bar = pg.evaluate(BAR)
                ok(n + ": slim top bar at the very top", bar['top'] == 0 and bar['h'] <= 72, bar)
                ok(n + ": no tab bar anywhere", pg.locator(".tm-tabbar").count() == 0)
                for label, sel in (("search", "#search-toggle"), ("saved", "#watchlist-filter"), ("compare", "#compare-open"), ("menu", "#menu-toggle")):
                    r = pg.evaluate(HIT, sel)
                    ok(n + f": {label} button visible and tappable", r == 'ok', r)
                pg.evaluate("window.scrollTo(0,1500)"); pg.wait_for_timeout(500)
                ok(n + ": bar stays pinned while scrolling", pg.evaluate(BAR)['top'] == 0)
                ok(n + ": shadow appears once scrolled", pg.evaluate("getComputedStyle(document.querySelector('.tm-header')).boxShadow") != 'none')
                pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(300)
                ctx.close()

    ctx = b.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True); pg = ctx.new_page(); errs = []; pg.on("pageerror", lambda x: errs.append(str(x)[:140]))
    pg.goto(B + "/index.html"); pg.wait_for_timeout(900)
    ok("menu starts closed", pg.evaluate("document.querySelector('#site-menu').hidden") and pg.get_attribute("#menu-toggle", "aria-expanded") == "false")
    ok("language picker and theme button are inside the menu on a phone", pg.evaluate(INMENU)['lang'] and pg.evaluate(INMENU)['theme'])
    pg.tap("#menu-toggle"); pg.wait_for_timeout(400)
    ok("menu opens", not pg.evaluate("document.querySelector('#site-menu').hidden") and pg.get_attribute("#menu-toggle", "aria-expanded") == "true")
    ok("menu has Browse, Saved, Compare, Guides, How it works, Questions", pg.evaluate(INMENU)['links'] == 6)
    ok("menu panel fits under the bar on screen", pg.evaluate("(()=>{const r=document.querySelector('#site-menu').getBoundingClientRect();return r.bottom<=innerHeight})()"))
    ok("page behind is dimmed by a backdrop", pg.evaluate("!document.querySelector('.tm-menu-backdrop').hidden"))
    pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
    ok("Escape closes the menu and returns focus to its button", pg.evaluate("document.querySelector('#site-menu').hidden") and pg.evaluate("document.activeElement.id") == "menu-toggle")
    pg.tap("#menu-toggle"); pg.wait_for_timeout(300); pg.mouse.click(195, 760); pg.wait_for_timeout(300)
    ok("tapping outside the menu closes it", pg.evaluate("document.querySelector('#site-menu').hidden"))
    # theme from the menu
    pg.tap("#menu-toggle"); pg.wait_for_timeout(300); t0 = pg.evaluate("document.documentElement.dataset.theme"); pg.tap("#site-menu #theme-toggle"); pg.wait_for_timeout(300)
    ok("dark-mode switch works from the menu", pg.evaluate("document.documentElement.dataset.theme") != t0)
    pg.tap("#site-menu #theme-toggle"); pg.wait_for_timeout(200)
    # saved + compare counts show in the menu, links work
    pg.keyboard.press("Escape"); pg.locator(".tm-heart").nth(0).tap(); pg.locator(".tm-heart").nth(1).tap(); pg.wait_for_timeout(300)
    pg.tap("#menu-toggle"); pg.wait_for_timeout(300)
    ok("menu shows the saved count", pg.inner_text("#menu-saved-count").strip() == "2", pg.inner_text("#menu-saved-count"))
    pg.tap('#site-menu a[data-tone="saved"]'); pg.wait_for_timeout(900)
    ok("Saved link closes the menu and shows only saved items", pg.evaluate("document.querySelector('#site-menu').hidden") and pg.locator("#product-grid > *").count() == 2, pg.locator("#product-grid > *").count())
    pg.tap("#watchlist-filter"); pg.wait_for_timeout(500)
    # menu while a product is open
    pg.goto("about:blank"); pg.goto(B + "/index.html#product=razer-huntsman-v3-pro"); pg.wait_for_timeout(1300)
    pg.tap("#menu-toggle"); pg.wait_for_timeout(400)
    ok("menu opens over the product view", not pg.evaluate("document.querySelector('#site-menu').hidden"))
    pg.tap('#site-menu a[data-menu="browse"]'); pg.wait_for_timeout(800)
    ok("Browse in the menu leaves the product", pg.evaluate("document.querySelector('#product-dialog').hidden"))
    # search
    pg.goto("about:blank"); pg.goto(B + "/index.html"); pg.wait_for_timeout(900)
    ok("search field starts tucked away", not pg.evaluate("(()=>{const e=document.querySelector('.tm-search');return e.getBoundingClientRect().height>0})()"))
    pg.tap("#search-toggle"); pg.wait_for_timeout(400)
    ok("search icon opens the field and focuses it", pg.evaluate("document.activeElement.id") == "search-input" and pg.evaluate("document.querySelector('.tm-search').getBoundingClientRect().height>0"))
    pg.fill("#search-input", "razer"); pg.wait_for_timeout(500)
    ok("search still filters", not pg.inner_text("#results-count").startswith("52"), pg.inner_text("#results-count"))
    ok("no js errors", not errs, errs[:2]); ctx.close()

    # static page: menu works without app.js, theme persists
    ctx = b.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True); pg = ctx.new_page()
    pg.goto(B + "/p/razer-deathadder-v3/index.html"); pg.wait_for_timeout(800)
    pg.tap("#menu-toggle"); pg.wait_for_timeout(400)
    ok("static page: menu opens with language and theme inside", not pg.evaluate("document.querySelector('#site-menu').hidden") and pg.evaluate(INMENU)['theme'] and pg.evaluate(INMENU)['lang'])
    pg.tap("#site-menu #theme-toggle"); pg.wait_for_timeout(300)
    ok("static page: dark mode switches from the menu", pg.evaluate("document.documentElement.dataset.theme") == "dark")
    pg.goto("about:blank"); pg.goto(B + "/how-we-choose/index.html"); pg.wait_for_timeout(500)
    ok("static page: the choice carries to the next page", pg.evaluate("document.documentElement.dataset.theme") == "dark")
    ctx.close()

    # controls move between header and menu when the window size changes
    ctx = b.new_context(viewport={"width": 1100, "height": 800}); pg = ctx.new_page(); pg.goto(B + "/index.html"); pg.wait_for_timeout(800)
    ok("desktop: language and theme sit in the header", pg.evaluate("!!document.querySelector('.tm-actions .tm-language') && !!document.querySelector('.tm-actions #theme-toggle')"))
    ok("desktop: menu button and panel are hidden", pg.evaluate("getComputedStyle(document.querySelector('#menu-toggle')).display==='none' && getComputedStyle(document.querySelector('#site-menu')).display==='none'"))
    pg.set_viewport_size({"width": 390, "height": 844}); pg.wait_for_timeout(500)
    ok("shrinking to a phone moves them into the menu", pg.evaluate(INMENU)['lang'] and pg.evaluate(INMENU)['theme'])
    pg.tap("#menu-toggle") if False else pg.click("#menu-toggle"); pg.wait_for_timeout(300)
    pg.set_viewport_size({"width": 1100, "height": 800}); pg.wait_for_timeout(500)
    ok("growing back closes the menu and returns them to the header", pg.evaluate("document.querySelector('#site-menu').hidden && !!document.querySelector('.tm-actions .tm-language') && !!document.querySelector('.tm-actions #theme-toggle')"))
    ctx.close()
    b.close()
