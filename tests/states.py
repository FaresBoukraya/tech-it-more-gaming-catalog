import os,http.server,threading,socketserver
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8882),H); threading.Thread(target=s.serve_forever,daemon=True).start()
B="http://127.0.0.1:8882"
res=[]
def ok(n,c,d=""): res.append((n,bool(c),d)); print(("PASS " if c else "FAIL ")+n,d)

def fill_search(pg, text):
    """On phones the search field is tucked away behind the search icon, so open it the way a person would."""
    if not pg.evaluate("document.querySelector('#search-input').getBoundingClientRect().height>0"):
        pg.click("#search-toggle"); pg.wait_for_timeout(300)
    pg.fill("#search-input", text)
locked="document.body.style.overflow==='hidden'||document.body.classList.contains('tm-lock')"
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for mob in (False,True):
        vw,vh=(390,780) if mob else (1366,850); t="mob" if mob else "desk"
        ctx=b.new_context(viewport={"width":vw,"height":vh},has_touch=mob,is_mobile=mob); pg=ctx.new_page(); errs=[]
        pg.on("pageerror",lambda x:errs.append(str(x)[:140]))
        pg.goto(B+"/index.html"); pg.wait_for_timeout(900)
        # product dialog: open from card, Escape closes, scroll lock released
        pg.locator(".tm-open").first.click(); pg.wait_for_timeout(700)
        ok(t+" product opens from card",pg.evaluate("!document.querySelector('#product-dialog').hidden"))
        ok(t+" body scroll locked while open",pg.evaluate(locked))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(500)
        ok(t+" Escape closes product",pg.evaluate("document.querySelector('#product-dialog').hidden"))
        ok(t+" scroll lock released",not pg.evaluate(locked))
        ok(t+" URL hash cleared after close","product=" not in pg.url,pg.url[-30:])
        # compare modal: select 2 -> open -> Escape
        pg.locator(".tm-compare-check input").nth(0).check(force=True); pg.locator(".tm-compare-check input").nth(1).check(force=True); pg.wait_for_timeout(300)
        pg.click("#compare-open"); pg.wait_for_timeout(600)
        ok(t+" compare opens with 2",pg.evaluate("!document.querySelector('#compare-modal').hidden"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        ok(t+" Escape closes compare",pg.evaluate("document.querySelector('#compare-modal').hidden"))
        ok(t+" scroll unlocked after compare",not pg.evaluate(locked))
        # 4th compare is refused with a message
        for i in (2,3):
            pg.locator(".tm-compare-check input").nth(i).click(force=True); pg.wait_for_timeout(120)
        ok(t+" compare capped at 3",pg.evaluate("document.querySelectorAll('.tm-compare-check input:checked').length")==3)
        # saved empty state
        pg.goto("about:blank"); pg.goto(B+"/index.html#saved"); pg.wait_for_timeout(900)
        txt=pg.inner_text("#product-grid")+pg.inner_text("#empty-state")
        ok(t+" empty saved list explains itself",len(txt.strip())>10,txt.strip()[:60].replace("\n"," "))
        # search -> no results state
        pg.goto("about:blank"); pg.goto(B+"/index.html"); pg.wait_for_timeout(700)
        fill_search(pg,"zzzzqqq"); pg.wait_for_timeout(600)
        ok(t+" no-results state shows",pg.evaluate("!document.querySelector('#empty-state').hidden"))
        fill_search(pg,""); pg.keyboard.press("Escape"); pg.evaluate("document.activeElement.blur()"); pg.wait_for_timeout(300)
        # load more
        n0=pg.locator("#product-grid > *").count()
        if pg.evaluate("!document.querySelector('#load-more').hidden"):
            pg.click("#load-more"); pg.wait_for_timeout(500); ok(t+" load more adds products",pg.locator("#product-grid > *").count()>n0)
        else: ok(t+" all products fit one page (no load more needed)",n0>=52,n0)
        # FAQ toggles
        pg.locator(".tm-faq summary").first.scroll_into_view_if_needed(); pg.locator(".tm-faq summary").first.click(); pg.wait_for_timeout(250)
        ok(t+" FAQ opens",pg.evaluate("document.querySelector('.tm-faq details').open"))
        # language: RTL + product dialog
        if mob: pg.click("#menu-toggle"); pg.wait_for_timeout(300)
        pg.select_option("#language-select","ar"); pg.wait_for_timeout(500)
        ok(t+" arabic: no horizontal scroll",not pg.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth+1"))
        pg.select_option("#language-select","en"); pg.wait_for_timeout(300)
        if mob: pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
        # keyboard shortcut
        pg.keyboard.press("/"); pg.wait_for_timeout(200)
        ok(t+" '/' focuses search",pg.evaluate("document.activeElement.id")=="search-input")
        ok(t+" no js errors",not errs,errs[:2]); ctx.close()
    b.close()
print(sum(1 for r in res if not r[1]),"failures of",len(res))
