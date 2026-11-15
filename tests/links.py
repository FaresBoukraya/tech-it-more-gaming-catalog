import os,re,http.server,threading,socketserver
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# 1 broken local refs
bad=set(); n=0
for dp,_,fs in os.walk(root):
    if '/node_modules' in dp: continue
    for f in fs:
        if not f.endswith('.html'): continue
        p=os.path.join(dp,f); t=open(p,encoding='utf-8',errors='ignore').read()
        for u in re.findall(r'(?:href|src)="([^"#?][^"]*?)(?:[?#][^"]*)?"',t):
            if re.match(r'(https?:|mailto:|data:|tel:|//)',u): continue
            n+=1
            tgt=os.path.join(root,u.lstrip('/')) if u.startswith('/') else os.path.normpath(os.path.join(dp,u))
            if os.path.isdir(tgt): tgt=os.path.join(tgt,'index.html')
            if not os.path.exists(tgt): bad.add((os.path.relpath(p,root),u))
print("local refs checked",n,"broken",len(bad)); [print(" ",b) for b in sorted(bad)[:15]]
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def translate_path(self,p):
        p=p.split('?')[0].split('#')[0]; full=os.path.join(root,p.lstrip('/'))
        return os.path.join(full,'index.html') if os.path.isdir(full) else full
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.TCPServer(("127.0.0.1",8813),H); threading.Thread(target=s.serve_forever,daemon=True).start()
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for w in (320,360,414,768,1024,1440):
        for u in ("/index.html","/p/razer-deathadder-v3/index.html","/c/mice/index.html","/how-we-choose/index.html"):
            ctx=b.new_context(viewport={"width":w,"height":800}); pg=ctx.new_page(); pg.goto("http://127.0.0.1:8813"+u); pg.wait_for_timeout(500)
            r=pg.evaluate("""()=>{const d=document.documentElement;const o=d.scrollWidth>d.clientWidth+1;
            const small=[...document.querySelectorAll('a,button,select,input')].filter(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!='hidden'&&(r.height<36||r.width<36)&&e.type!='checkbox'&&!e.closest('[hidden]')}).map(e=>(e.id||e.className||e.tagName).toString().slice(0,30)+':'+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height));return {o,small:[...new Set(small)].slice(0,6)}}""")
            if r['o'] or (w<=414 and r['small']): print(w,u,r)
            ctx.close()
    b.close()
