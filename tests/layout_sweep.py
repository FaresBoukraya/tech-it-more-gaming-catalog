import os,http.server,threading,socketserver,json
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8880),H); threading.Thread(target=s.serve_forever,daemon=True).start()
B="http://127.0.0.1:8880"
CHECK="""()=>{const d=document.documentElement,W=d.clientWidth;
const over=d.scrollWidth>W+1;
const wide=[...document.querySelectorAll('body *')].filter(e=>{if(e.closest('.tm-catrail,.tm-chips,[class*=rail],.tm-cmp-table,table,pre,.tm-scroll,dialog,[hidden],.tm-tabbar'))return false;const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&cs.position!=='fixed'&&(r.right>W+2||r.left<-2)}).slice(0,4).map(e=>(e.id||e.className||e.tagName).toString().slice(0,34)+' L'+Math.round(e.getBoundingClientRect().left)+' R'+Math.round(e.getBoundingClientRect().right));
const small=[...document.querySelectorAll('a,button,select,summary,[role=button]')].filter(e=>{const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&!e.closest('[hidden]')&&(r.height<34||r.width<34)&&!e.matches('.skip-link,.tm-tab')}).map(e=>(e.id||e.className||e.tagName).toString().slice(0,30)+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height));
const clipped=[...document.querySelectorAll('h1,h2,h3,.tm-name,.tm-brand,button,a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible'&&getComputedStyle(e).textOverflow!=='ellipsis'}).slice(0,3).map(e=>(e.className||e.tagName).toString().slice(0,30));
return {over,wide,small:[...new Set(small)].slice(0,8),clipped}}"""
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for vw in (320,360,390,430,768):
        for name,u in (("home","/index.html"),("product","/p/razer-deathadder-v3/index.html"),("cat","/c/keyboards/index.html"),("guide","/how-we-choose/index.html"),("offline","/offline.html")):
            ctx=b.new_context(viewport={"width":vw,"height":800},has_touch=vw<700,is_mobile=vw<700); pg=ctx.new_page(); errs=[]
            pg.on("pageerror",lambda x:errs.append(str(x)[:120])); pg.goto(B+u); pg.wait_for_timeout(700)
            r=pg.evaluate(CHECK); flag=[k for k in("over","wide","small","clipped") if r[k]]
            if flag or errs: print(vw,name,{k:r[k] for k in flag},errs[:2])
            ctx.close()
    b.close()
print("sweep done")
