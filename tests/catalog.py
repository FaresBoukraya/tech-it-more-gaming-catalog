import http.server, threading, socketserver, os, json
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8811),H); threading.Thread(target=s.serve_forever,daemon=True).start()
B="http://127.0.0.1:8811"
R=[]
def ok(n,c,d=""): R.append((n,bool(c),d)); print(("PASS " if c else "FAIL ")+n, d)

def fill_search(pg, text):
    """On phones the search field is tucked away behind the search icon, so open it the way a person would."""
    if not pg.evaluate("document.querySelector('#search-input').getBoundingClientRect().height>0"):
        pg.click("#search-toggle"); pg.wait_for_timeout(300)
    pg.fill("#search-input", text)
with sync_playwright() as pw:
    b=pw.chromium.launch(); 
    for vpn,vp in {"desk":{"width":1366,"height":900},"mob":{"width":390,"height":844}}.items():
        ctx=b.new_context(viewport=vp); pg=ctx.new_page(); errs=[]
        pg.on("pageerror",lambda x:errs.append(str(x)[:200]))
        pg.goto(B+"/index.html"); pg.wait_for_timeout(800)
        n0=pg.locator("#product-grid > *").count()
        ok(vpn+" grid renders",n0>0,n0)
        fill_search(pg,"razer"); pg.wait_for_timeout(500)
        rc=pg.inner_text("#results-count"); ok(vpn+" search filters",("52" not in rc),rc)
        ok(vpn+" suggestions show",pg.locator("#search-suggestions:not([hidden])").count()>=0)
        pg.click("#search-clear"); pg.wait_for_timeout(300)
        ok(vpn+" clear restores",pg.inner_text("#results-count").startswith("52"),pg.inner_text("#results-count"))
        # category rail
        pg.locator("#category-rail button, #category-rail a").nth(4).click(); pg.wait_for_timeout(400)
        ok(vpn+" category rail filters",not pg.inner_text("#results-count").startswith("52"),pg.inner_text("#results-count"))
        pg.locator("#category-rail button, #category-rail a").nth(0).click(); pg.wait_for_timeout(300)
        # save a product
        hearts=pg.locator(".tm-heart"); 
        if hearts.count():
            hearts.first.click(); pg.wait_for_timeout(300)
            ok(vpn+" save increments",pg.inner_text("#watchlist-count").strip()=="1",pg.inner_text("#watchlist-count"))
        # compare
        chk=pg.locator(".tm-compare-check input")
        if chk.count()>=2:
            chk.nth(0).check(force=True); chk.nth(1).check(force=True); pg.wait_for_timeout(300)
            ok(vpn+" compare badge",pg.inner_text("#compare-badge").strip()=="2",pg.inner_text("#compare-badge"))
        # theme toggle
        if vpn=="mob": pg.click("#menu-toggle"); pg.wait_for_timeout(300)
        t0=pg.evaluate("document.documentElement.dataset.theme"); pg.click("#theme-toggle"); pg.wait_for_timeout(200)
        t1=pg.evaluate("document.documentElement.dataset.theme"); ok(vpn+" theme toggles",t0!=t1,f"{t0}->{t1}")
        # language
        pg.select_option("#language-select","fr"); pg.wait_for_timeout(500)
        h1=pg.inner_text("#hero-title"); ok(vpn+" FR hero translated",h1.lower()!="gear worth buying.",h1)
        pg.select_option("#language-select","ar"); pg.wait_for_timeout(500)
        ok(vpn+" AR sets rtl",pg.evaluate("document.documentElement.dir")=="rtl")
        over=pg.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth+1"); ok(vpn+" AR no hscroll",not over)
        pg.select_option("#language-select","en"); pg.wait_for_timeout(300)
        if vpn=="mob": pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
        # open a product
        pg.locator("#product-grid a, #product-grid .tm-card, #product-grid article").first.click(); pg.wait_for_timeout(800)
        ok(vpn+" product opens",pg.locator("dialog[open], .product-dialog[open]").count()>0 or "product=" in pg.url,pg.url[-40:])
        pg.go_back(); pg.wait_for_timeout(500)
        ok(vpn+" back closes it",pg.locator("dialog[open]").count()==0)
        ok(vpn+" no js errors",not errs,errs[:2])
        ctx.close()
    b.close()
print(sum(1 for r in R if not r[1]),"failures")
