import os,http.server,threading,socketserver
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8896),H); threading.Thread(target=s.serve_forever,daemon=True).start()
B="http://127.0.0.1:8896"
def ok(n,c,d=""): print(("PASS " if c else "FAIL ")+n,d)
HIT="""sel=>{const e=document.querySelector('#product-dialog '+sel);if(!e)return 'missing';const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;if(y<0||y>innerHeight)return 'offscreen';const t=document.elementFromPoint(x,y);return (t&&e.contains(t))?'ok':'covered by '+(t?(t.id||t.className||t.tagName):'nothing')}"""
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for name,vw,vh in (("iPhone SE",375,667),("iPhone 14",390,844),("small Android",360,640),("large phone",430,932),("landscape",740,360)):
        for th in ("light","dark"):
            ctx=b.new_context(viewport={"width":vw,"height":vh},color_scheme=th,has_touch=True,is_mobile=True); pg=ctx.new_page()
            pg.goto(B+"/index.html#product=razer-huntsman-v3-pro"); pg.wait_for_timeout(1200)
            res={k:pg.evaluate(HIT,sel) for k,sel in (("Buy",".dx-cta"),("Save",".dx-act[data-dx-save]"),("Compare",".dx-act[data-dx-compare]"))}
            ok(f"{name} {th}: Buy, Save and Compare are visible and tappable",all(v=='ok' for v in res.values()),res)
            if th=="light" and name in ("iPhone 14",):
                pg.tap("#product-dialog .dx-act[data-dx-save]"); pg.wait_for_timeout(250)
                ok("  tapping Save saves",pg.get_attribute("#product-dialog .dx-act[data-dx-save]","aria-pressed")=="true")
                pg.tap("#product-dialog .dx-act[data-dx-compare]"); pg.wait_for_timeout(250)
                ok("  tapping Compare adds to compare",pg.get_attribute("#product-dialog .dx-act[data-dx-compare]","aria-pressed")=="true")
                y0=pg.evaluate("document.querySelector('#product-dialog').scrollTop"); pg.tap("#product-dialog .dx-cta"); pg.wait_for_timeout(800)
                ok("  tapping Buy scrolls to the store list",pg.evaluate("document.querySelector('#product-dialog').scrollTop")>y0)
                pg.evaluate("document.querySelector('#product-dialog').scrollTo(0,99999)"); pg.wait_for_timeout(250)
                last=pg.evaluate("(()=>{const p=document.querySelector('#product-dialog .dialog-panel');const kids=[...p.children].filter(e=>e.getBoundingClientRect().height>0&&getComputedStyle(e).position!=='fixed');const l=kids[kids.length-1].getBoundingClientRect().bottom;const a=document.querySelector('.dx-actions').getBoundingClientRect().top;return l<=a+1})()")
                ok("  last content is not hidden behind the action bar",last)
            ctx.close()
    b.close()
