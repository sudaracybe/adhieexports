(function(){
var URL_=window.ADHIE_CHAT_URL;if(!URL_)return;
var hist=[],busy=false;try{hist=JSON.parse(sessionStorage.getItem('adhieChat')||'[]')}catch(e){}
function el(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!==undefined)n.textContent=x;return n}
var btn=el('button','chatbtn');btn.type='button';btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','chatpanel');
btn.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg><span>Ask AI</span>';
var p=el('div','chatpanel');p.id='chatpanel';p.setAttribute('role','dialog');p.setAttribute('aria-label','Adhie Exports chat assistant');p.hidden=true;
var hd=el('div','chathd');var im=new Image();im.src='logo-sm.png';im.alt='';im.width=32;im.height=32;
var tt=el('div','chattt');tt.appendChild(el('b','','Adhie Assistant'));tt.appendChild(el('small','','AI assistant for Adhie Exports'));
var x=el('button','chatx','\u00d7');x.type='button';x.setAttribute('aria-label','Close chat');hd.append(im,tt,x);
var log=el('div','chatlog');log.setAttribute('aria-live','polite');
var chips=el('div','chatchips');['What products do you export?','Do you offer private label?','How can I get a quote?'].forEach(function(q){var c=el('button','chip',q);c.type='button';c.onclick=function(){send(q)};chips.appendChild(c)});
var f=el('form','chatform');var inp=el('input');inp.type='text';inp.maxLength=500;inp.placeholder='Type your question...';inp.setAttribute('aria-label','Your message');
var sb=el('button','chatsend','Send');sb.type='submit';f.append(inp,sb);
var ft=el('div','chatnote','AI replies may be imperfect. For quotes and orders please email or WhatsApp us.');
p.append(hd,log,chips,f,ft);document.body.append(btn,p);
function link(box,t){var re=/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g,i=0,m;while((m=re.exec(t))){if(m.index>i)box.appendChild(document.createTextNode(t.slice(i,m.index)));var a=el('a','',m[0]);a.href=m[0].indexOf('@')>0&&m[0].indexOf('http')!==0?'mailto:'+m[0]:m[0];if(a.href.indexOf('http')===0){a.target='_blank';a.rel='noopener'}box.appendChild(a);i=m.index+m[0].length}
if(i<t.length)box.appendChild(document.createTextNode(t.slice(i)))}
function add(role,t){var b=el('div','msg '+role);link(b,t);log.appendChild(b);log.scrollTop=log.scrollHeight;return b}
function save(){try{sessionStorage.setItem('adhieChat',JSON.stringify(hist.slice(-12)))}catch(e){}}
function open_(o){p.hidden=!o;btn.setAttribute('aria-expanded',o);if(o){if(!log.children.length){add('bot','Hello! I can answer questions about our coco peat and coir products, OEM/private label and exports. How can I help?');hist.forEach(function(m){add(m.role==='user'?'user':'bot',m.content)})}inp.focus()}else btn.focus()}
btn.onclick=function(){open_(p.hidden)};x.onclick=function(){open_(false)};p.addEventListener('keydown',function(e){if(e.key==='Escape')open_(false)});
function send(t){t=(t||'').trim();if(!t||busy)return;busy=true;chips.hidden=true;add('user',t);hist.push({role:'user',content:t});inp.value='';sb.disabled=true;
var w=add('bot','...');w.classList.add('wait');
fetch(URL_,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.slice(-8)})}).then(function(r){return r.json()}).then(function(j){var r=j.reply||'Sorry, something went wrong. Please email info@adhieexports.com.';w.remove();add('bot',r);hist.push({role:'assistant',content:r});save()})
.catch(function(){w.remove();add('bot','Sorry, I could not connect. Please email info@adhieexports.com or WhatsApp +94 77 454 2610.')}).then(function(){busy=false;sb.disabled=false;inp.focus()})}
f.onsubmit=function(e){e.preventDefault();send(inp.value)}
})();
