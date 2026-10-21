(function(){
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function dots(box,n,go){box.innerHTML='';for(var i=0;i<n;i++){(function(i){var d=document.createElement('i');d.onclick=function(){go(i)};box.appendChild(d)})(i)}}
function mark(box,i){[].forEach.call(box.children,function(d,k){d.classList.toggle('on',k===i)})}
/* Home: featured products slideshow */
var hs=document.querySelector('.hs');
if(hs){var sl=hs.querySelectorAll('.hslide'),dt=hs.querySelector('.dots'),cur=0,t;
function show(i){cur=(i+sl.length)%sl.length;[].forEach.call(sl,function(s,k){s.classList.toggle('on',k===cur)});mark(dt,cur)}
dots(dt,sl.length,function(i){show(i);rs()});show(0);
hs.querySelector('.prev').onclick=function(){show(cur-1);rs()};hs.querySelector('.next').onclick=function(){show(cur+1);rs()};
function rs(){clearInterval(t);if(!reduce)t=setInterval(function(){show(cur+1)},6000)}rs();
hs.onmouseenter=function(){clearInterval(t)};hs.onmouseleave=rs}
/* Product page: photo gallery. Uses images/<slug>-1.jpg ... -8.jpg */
var g=document.querySelector('.gallery');
if(g){var slug=g.dataset.slug,found=[],left=8;
for(var n=1;n<=8;n++){(function(n){var im=new Image();im.alt=slug.replace(/-/g,' ')+' photo '+n;
im.onload=function(){found[n]=im;done()};im.onerror=function(){done()};im.src='/images/'+slug+'-'+n+'.jpg'})(n)}
function done(){if(--left)return;var ims=found.filter(Boolean);if(!ims.length)return;
var box=document.createElement('div');box.className='gal';var tr=document.createElement('div');tr.className='track';
ims.forEach(function(im){var s=document.createElement('div');s.className='sl';s.appendChild(im);tr.appendChild(s)});box.appendChild(tr);
g.innerHTML='';g.appendChild(box);if(ims.length<2)return;
var i=0,t,dd=document.createElement('div');dd.className='dots';box.insertAdjacentHTML('beforeend','<button class="prev" aria-label="Previous photo">&#8249;</button><button class="next" aria-label="Next photo">&#8250;</button>');box.appendChild(dd);
var th=document.createElement('div');th.className='thumbs';ims.forEach(function(im,k){var c=new Image();c.src=im.src;c.alt='Photo '+(k+1);c.onclick=function(){go(k);rs()};th.appendChild(c)});g.appendChild(th);
function go(k){i=(k+ims.length)%ims.length;tr.style.transform='translateX(-'+i*100+'%)';mark(dd,i);[].forEach.call(th.children,function(c,j){c.classList.toggle('on',j===i)})}
dots(dd,ims.length,function(k){go(k);rs()});go(0);
box.querySelector('.prev').onclick=function(){go(i-1);rs()};box.querySelector('.next').onclick=function(){go(i+1);rs()};
var x=null;box.ontouchstart=function(e){x=e.touches[0].clientX};box.ontouchend=function(e){if(x===null)return;var d=e.changedTouches[0].clientX-x;if(Math.abs(d)>40){go(i+(d<0?1:-1));rs()}x=null};
function rs(){clearInterval(t);if(!reduce)t=setInterval(function(){go(i+1)},5000)}rs()}}

/* Hero: load the extra background photos after the page has loaded */
window.addEventListener('load',function(){[].forEach.call(document.querySelectorAll('.hbg i[data-bg]'),function(i){i.style.backgroundImage='url('+i.dataset.bg+')'})});
/* Contact form: sends via Web3Forms; falls back to the visitor's email app if no key is set */
var f=document.getElementById('f');
if(f){f.addEventListener('submit',function(ev){ev.preventDefault();
var st=document.getElementById('fs'),b=f.querySelector('button[type=submit]'),d=new FormData(f),key=d.get('access_key')||'';
if(d.get('botcheck'))return;
if(!key||key.indexOf('YOUR_')===0){var body='';d.forEach(function(v,k){if(['access_key','subject','from_name','botcheck'].indexOf(k)<0&&v)body+=k.replace('_',' ')+': '+v+'\n'});
location.href='mailto:info@adhieexports.com?subject='+encodeURIComponent('Website enquiry: '+d.get('product'))+'&body='+encodeURIComponent(body);return}
b.disabled=true;st.textContent='Sending...';
fetch('https://api.web3forms.com/submit',{method:'POST',body:d}).then(function(r){return r.json()}).then(function(j){
if(!j.success)throw new Error();track('generate_lead',{form:'contact'});clearQuote();f.reset();st.textContent=f.dataset.ok||'Thank you! Your enquiry has been sent. We will reply within 1-2 business days.'})
.catch(function(){st.textContent=f.dataset.err||'Sorry, it could not be sent. Please email info@adhieexports.com or WhatsApp +94 77 454 2610.'})
.then(function(){b.disabled=false})})}

/* Email button: a mailto link does nothing on computers without a mail app, so offer Gmail, Outlook, mail app and copy */
var eb=document.querySelector('.em');
if(eb){var ADDR='info@adhieexports.com',SUB=encodeURIComponent('Enquiry from adhieexports.com'),pop=document.createElement('div');pop.className='empop';pop.hidden=true;
pop.innerHTML='<b>Email us</b><span>'+ADDR+'</span>'
+'<a target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1&to='+ADDR+'&su='+SUB+'">Open in Gmail</a>'
+'<a target="_blank" rel="noopener" href="https://outlook.live.com/mail/0/deeplink/compose?to='+ADDR+'&subject='+SUB+'">Open in Outlook</a>'
+'<a href="mailto:'+ADDR+'?subject='+SUB+'">Open my email app</a><button type="button">Copy email address</button>';
document.body.appendChild(pop);var cp=pop.querySelector('button');
eb.addEventListener('click',function(ev){ev.preventDefault();pop.hidden=!pop.hidden});
cp.addEventListener('click',function(){function ok(){cp.textContent='Copied!';setTimeout(function(){cp.textContent='Copy email address'},1800)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(ADDR).then(ok,function(){window.prompt('Copy this address:',ADDR)})}else{window.prompt('Copy this address:',ADDR)}});
document.addEventListener('click',function(ev){if(!pop.hidden&&!pop.contains(ev.target)&&!eb.contains(ev.target))pop.hidden=true});
document.addEventListener('keydown',function(ev){if(ev.key==='Escape')pop.hidden=true})}

/* Prefill the enquiry form from product buttons; track key actions (Google Analytics 4 when an ID is set in analytics-config.js) */
var qs=new URLSearchParams(location.search),ff=document.getElementById('f');
if(ff){var ty=qs.get('type'),pr=qs.get('product'),sl=ff.querySelector('select[name=product]'),pn='';
if(sl&&pr){[].forEach.call(sl.options,function(o){if(o.dataset.slug===pr){sl.value=o.value;pn=o.value}})}
var it=ff.querySelector('input[name=inquiry_type]');if(it&&(ty==='samples'||ty==='wholesale'))it.value=ty==='samples'?'Request samples':'Request wholesale pricing';
var ta=ff.querySelector('textarea'),tp=ty==='samples'?ff.dataset.msamples:ty==='wholesale'?ff.dataset.mwholesale:'';if(ta&&tp&&!ta.value)ta.value=tp.replace('[product]',pn)}
var GA=window.ADHIE_GA4;
function track(n,p){if(window.gtag){try{window.gtag('event',n,p||{})}catch(e){}}}
/* Cookie consent: Google Analytics loads only after the visitor accepts */
var CK='adhieConsent',gaOn=false;
function cget(){try{return localStorage.getItem(CK)}catch(e){return null}}
function cset(v){try{localStorage.setItem(CK,v)}catch(e){}}
function loadGA(){if(gaOn||!GA)return;gaOn=true;window['ga-disable-'+GA]=false;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};var gs=document.createElement('script');gs.async=true;gs.src='https://www.googletagmanager.com/gtag/js?id='+GA;document.head.appendChild(gs);window.gtag('js',new Date());window.gtag('config',GA)}
function clearGA(){window['ga-disable-'+GA]=true;window.gtag=undefined;document.cookie.split(';').forEach(function(c){var k=c.split('=')[0].trim();if(k.indexOf('_ga')===0){var h=location.hostname.split('.');['',h.join('.'),'.'+h.slice(-2).join('.')].forEach(function(d){document.cookie=k+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'+(d?';domain='+d:'')})}})}
var CT={en:['We use cookies to measure visits and clicks on this website (Google Analytics). You can accept or decline.','Accept','Decline','Privacy policy','Cookie settings'],
es:['Usamos cookies para medir las visitas y los clics en este sitio web (Google Analytics). Puede aceptarlas o rechazarlas.','Aceptar','Rechazar','Política de privacidad','Configuración de cookies'],
ar:['نستخدم ملفات تعريف الارتباط لقياس الزيارات والنقرات على هذا الموقع (Google Analytics). يمكنك القبول أو الرفض.','قبول','رفض','سياسة الخصوصية','إعدادات ملفات تعريف الارتباط'],
fr:['Nous utilisons des cookies pour mesurer les visites et les clics sur ce site (Google Analytics). Vous pouvez les accepter ou les refuser.','Accepter','Refuser','Politique de confidentialité','Paramètres des cookies'],
de:['Wir verwenden Cookies, um Besuche und Klicks auf dieser Website zu messen (Google Analytics). Sie können sie akzeptieren oder ablehnen.','Akzeptieren','Ablehnen','Datenschutzerklärung','Cookie-Einstellungen'],
nl:['Wij gebruiken cookies om bezoeken en klikken op deze website te meten (Google Analytics). U kunt ze accepteren of weigeren.','Accepteren','Weigeren','Privacybeleid','Cookie-instellingen'],
zh:['我们使用Cookie来统计本网站的访问量和点击（Google Analytics）。您可以接受或拒绝。','接受','拒绝','隐私政策','Cookie设置']};
function cl(){return CT[(document.documentElement.lang||'en').slice(0,2)]||CT.en}
function showBanner(){var old=document.querySelector('.cookiebar');if(old)old.remove();var L=cl();
var b=document.createElement('div');b.className='cookiebar';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookies');
var p=document.createElement('p');p.appendChild(document.createTextNode(L[0]+' '));var a=document.createElement('a');a.href='/privacy.html';a.textContent=L[3];p.appendChild(a);
var y=document.createElement('button');y.type='button';y.className='btn';y.textContent=L[1];var n=document.createElement('button');n.type='button';n.className='btn ghost';n.textContent=L[2];
y.addEventListener('click',function(){cset('granted');loadGA();b.remove()});n.addEventListener('click',function(){cset('denied');clearGA();b.remove()});
b.append(p,y,n);document.body.appendChild(b)}
if(GA){var cs=cget();if(cs==='granted')loadGA();else if(!cs)showBanner();
var cp=document.querySelector('.copy');if(cp){cp.appendChild(document.createTextNode(' | '));var cl2=document.createElement('a');cl2.href='#';cl2.textContent=cl()[4];cl2.addEventListener('click',function(ev){ev.preventDefault();showBanner()});cp.appendChild(cl2)}}
document.addEventListener('click',function(ev){var a=ev.target.closest&&ev.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';
if(h.indexOf('wa.me')>-1)track('whatsapp_click',{link_url:h});else if(h.indexOf('mailto:')===0)track('email_click');else if(/\.pdf(\?|$)/i.test(h))track('file_download',{file_name:h.split('/').pop()});else if(/[?&]type=(samples|wholesale)/.test(h))track('request_button_click',{request_type:h.match(/type=(\w+)/)[1]})});

/* Quote list (RFQ basket): saved in this browser, sent with the enquiry form */
var QK='adhieQuote';
function qget(){try{return JSON.parse(localStorage.getItem(QK)||'[]')}catch(e){return[]}}
function qset(a){try{localStorage.setItem(QK,JSON.stringify(a))}catch(e){}qbadge()}
function clearQuote(){try{localStorage.removeItem(QK)}catch(e){}qbadge();qrender()}
function qbadge(){var n=qget().length;[].forEach.call(document.querySelectorAll('.qlink'),function(a){a.hidden=!n;var s=a.querySelector('span');if(s)s.textContent=n})}
[].forEach.call(document.querySelectorAll('[data-quote]'),function(b){var lab=b.textContent;
function mark(){var on=qget().some(function(x){return x.s===b.dataset.quote});b.textContent=on?(b.dataset.added||lab):lab}
mark();b.addEventListener('click',function(){var a=qget();if(!a.some(function(x){return x.s===b.dataset.quote}))a.push({s:b.dataset.quote,n:b.dataset.name,e:b.dataset.en,q:''});qset(a);mark();track('add_to_quote',{item:b.dataset.en})})});
var qb=document.getElementById('quote');
function qsync(){if(!ff)return;var h=ff.querySelector('input[name=quote_items]');if(h)h.value=qget().map(function(x){return x.e+(x.q?' - Quantity: '+x.q:'')}).join('\n')}
function qrender(){if(!qb)return;var a=qget();qb.hidden=!a.length;qb.innerHTML='';if(!a.length){qsync();return}
var t=document.createElement('b');t.textContent=qb.dataset.title;qb.appendChild(t);
a.forEach(function(x,i){var r=document.createElement('div');r.className='qrow';var n=document.createElement('b');n.textContent=x.n;var q=document.createElement('input');q.type='text';q.maxLength=60;q.placeholder=qb.dataset.qty;q.value=x.q||'';q.setAttribute('aria-label',x.n);
q.addEventListener('input',function(){var l=qget();if(l[i]){l[i].q=q.value;try{localStorage.setItem(QK,JSON.stringify(l))}catch(e){}}qsync()});
var d=document.createElement('button');d.type='button';d.textContent=qb.dataset.remove;d.addEventListener('click',function(){var l=qget();l.splice(i,1);qset(l);qrender()});r.append(n,q,d);qb.appendChild(r)});qsync()}
qbadge();qrender();
})();
