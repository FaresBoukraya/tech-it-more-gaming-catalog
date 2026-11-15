import os,http.server,threading,socketserver
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8870),H); threading.Thread(target=s.serve_forever,daemon=True).start()
B="http://127.0.0.1:8870"
def ok(n,c,d=""): print(("PASS " if c else "FAIL ")+n,d)
dlg="document.querySelector('.product-dialog') && !document.querySelector('.product-dialog').hidden"
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for vw in (1366,390):
        tag=str(vw)
        ctx=b.new_context(viewport={"width":vw,"height":850}); pg=ctx.new_page(); errs=[]; pg.on("pageerror",lambda x:errs.append(str(x)[:150]))
        # --- A: inside the product view on the home page
        pg.goto("about:blank"); pg.goto(B+"/index.html#product=razer-huntsman-v3-pro"); pg.wait_for_timeout(1200)
        ok(tag+" A product view is open",pg.evaluate(dlg))
        pg.click("#watchlist-filter"); pg.wait_for_timeout(900)
        ok(tag+" A Saved click leaves the product",not pg.evaluate(dlg))
        ok(tag+" A Saved filter is on",pg.get_attribute("#watchlist-filter","aria-pressed")=="true")
        pg.click("#watchlist-filter"); pg.wait_for_timeout(300)
        pg.goto("about:blank"); pg.goto(B+"/index.html#product=razer-huntsman-v3-pro"); pg.wait_for_timeout(1200)
        pg.click("#compare-open")
        pg.wait_for_timeout(900)
        ok(tag+" A Compare click leaves the product",not pg.evaluate(dlg))
        ok(tag+" A product was added to compare",pg.inner_text("#compare-badge").strip()=="1",pg.inner_text("#compare-badge"))
        ok(tag+" A toast tells you what to do","one more" in pg.inner_text(".toast").lower(),pg.inner_text(".toast"))
        # logo leaves a product too
        pg.goto("about:blank"); pg.goto(B+"/index.html#product=razer-huntsman-v3-pro"); pg.wait_for_timeout(1000); pg.click(".brand"); pg.wait_for_timeout(700)
        ok(tag+" A logo leaves the product",not pg.evaluate(dlg))
        ctx.close()
        # --- B: static product page
        ctx=b.new_context(viewport={"width":vw,"height":850}); pg=ctx.new_page(); pg.on("pageerror",lambda x:errs.append(str(x)[:150]))
        pg.goto(B+"/p/razer-deathadder-v3/index.html"); pg.wait_for_timeout(600)
        pg.click("[data-dx-save]"); pg.wait_for_timeout(200)
        ok(tag+" B Save button toggles",pg.get_attribute("[data-dx-save]","aria-pressed")=="true" and pg.inner_text("[data-dx-save] span")=="Saved")
        ok(tag+" B heart count is 1",pg.inner_text("#watchlist-count").strip()=="1")
        pg.click("[data-dx-compare]"); pg.wait_for_timeout(200)
        ok(tag+" B Add to compare toggles",pg.get_attribute("[data-dx-compare]","aria-pressed")=="true")
        # second product on another page
        pg.goto(B+"/p/corsair-k70-pro-rgb/index.html" if os.path.exists(os.path.join(root,"p","corsair-k70-pro-rgb")) else B+"/p/razer-huntsman-v3-pro/index.html"); pg.wait_for_timeout(500)
        pg.click("[data-dx-compare]"); pg.wait_for_timeout(200)
        # saved heart link -> home with saved list
        pg.click("#watchlist-filter"); pg.wait_for_timeout(1200)
        ok(tag+" B heart link opens saved list on home",pg.get_attribute("#watchlist-filter","aria-pressed")=="true",pg.url[-30:])
        ok(tag+" B saved list shows the saved product", "DeathAdder" in pg.inner_text("#product-grid"))
        pg.goto("about:blank"); pg.goto(B+"/index.html#compare"); pg.wait_for_timeout(1200)
        ok(tag+" B compare list carried over (2 items)",(pg.inner_text("#compare-badge").strip()=="2"),"")
        ok(tag+" B /#compare opens the comparison",pg.evaluate("!document.querySelector('#compare-modal').hidden"))
        ok(tag+" no js errors",not errs,errs[:2]); ctx.close()
    b.close()
