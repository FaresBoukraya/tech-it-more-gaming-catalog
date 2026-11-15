import os,http.server,threading,socketserver,re
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8820),H); threading.Thread(target=s.serve_forever,daemon=True).start()
JS="""()=>{
const lum=c=>{const m=c.match(/[\\d.]+/g).map(Number);const [r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
const bgOf=e=>{while(e){const c=getComputedStyle(e).backgroundColor;const m=c.match(/[\\d.]+/g);if(m&&(m.length<4||+m[3]>.9))return c;e=e.parentElement}return 'rgb(255,255,255)'};
const low=[];document.querySelectorAll('body *').forEach(e=>{if(!e.childNodes.length)return;const t=[...e.childNodes].filter(n=>n.nodeType==3&&n.nodeValue.trim()).length;if(!t)return;const r=e.getBoundingClientRect();if(!r.width||!r.height)return;const cs=getComputedStyle(e);if(cs.visibility=='hidden'||e.closest('[hidden]'))return;
const f=lum(cs.color),b=lum(bgOf(e));const cr=(Math.max(f,b)+.05)/(Math.min(f,b)+.05);const big=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.6&&+cs.fontWeight>=700);if(cr<(big?3:4.5))low.push((e.className||e.tagName).toString().slice(0,26)+' '+cr.toFixed(1)+' '+parseFloat(cs.fontSize)+'px')});
const ids={};document.querySelectorAll('[id]').forEach(e=>ids[e.id]=(ids[e.id]||0)+1);
const dup=Object.keys(ids).filter(k=>ids[k]>1);
const noalt=[...document.querySelectorAll('img:not([alt])')].length;
const unl=[...document.querySelectorAll('button,a,select,input')].filter(e=>!(e.innerText||'').trim()&&!e.getAttribute('aria-label')&&!e.getAttribute('title')&&!e.labels?.length&&!e.querySelector('img[alt]')&&e.type!='hidden').map(e=>(e.id||e.className||e.tagName).toString().slice(0,30));
const h=[...document.querySelectorAll('h1,h2,h3')].map(e=>e.tagName[1]).join('');
return {low:[...new Set(low)].slice(0,8),dup,noalt,unl:unl.slice(0,6),h1s:document.querySelectorAll('h1').length,heads:h.slice(0,30),lang:document.documentElement.lang}}"""
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for th in ("light","dark"):
        for u in ("/index.html","/p/razer-deathadder-v3/index.html","/c/mice/index.html","/how-we-choose/index.html"):
            ctx=b.new_context(viewport={"width":1280,"height":900},color_scheme=th); pg=ctx.new_page(); pg.goto("http://127.0.0.1:8820"+u); pg.wait_for_timeout(600)
            print(th,u,pg.evaluate(JS)); ctx.close()
    b.close()
