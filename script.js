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
im.onload=function(){found[n]=im;done()};im.onerror=function(){done()};im.src='images/'+slug+'-'+n+'.jpg'})(n)}
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
})();
