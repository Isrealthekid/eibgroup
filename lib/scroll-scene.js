// Runs only after the Next.js client component mounts.
export function initializeScrollScene() {
  const controller = new AbortController();
  const listen = (target, event, callback, options = {}) =>
    target.addEventListener(event, callback, { ...options, signal: controller.signal });
/* Scroll choreography. The wordmark is intentionally text until the brand asset is supplied. */
const $ = (selector) => document.querySelector(selector);
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const range = (n, a, b) => clamp((n - a) / (b - a));
const ease = (n) => n * n * (3 - 2 * n);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const el = Object.fromEntries(['hero-logo','intro-caption','seed','world','circle-white','circle-blue','purpose','scroll-prompt','purpose-statement','contact-link'].map(name => [name.replaceAll('-', '_'), $('.' + name)]));
const worldCopy = [...document.querySelectorAll('.world-copy')];
const story = $('.scroll-story');
const canvas = $('#earth');
const ctx = canvas.getContext('2d', { alpha: true });
const title = $('#purpose-title');
const words = [...title.querySelectorAll('.word')];
$('#year').textContent = new Date().getFullYear();

// Coarse, local geographic polygons: no image downloads or globe libraries.
const continents = [
 [[-17,37],[-7,36],[1,37],[10,37],[12,33],[23,32],[32,31],[35,24],[43,12],[51,12],[47,4],[42,-1],[40,-11],[35,-19],[33,-26],[27,-34],[18,-35],[12,-24],[11,-15],[8,-5],[0,5],[-9,5],[-17,14],[-17,22],[-13,28]],
 [[-10,36],[-9,43],[-2,44],[-5,49],[3,51],[8,55],[8,58],[5,58],[6,64],[20,71],[29,70],[30,61],[44,67],[61,70],[90,77],[110,74],[135,72],[163,68],[179,65],[170,59],[155,58],[160,51],[143,46],[140,36],[130,32],[122,25],[120,17],[110,20],[108,11],[103,1],[98,6],[97,19],[92,23],[87,21],[81,8],[76,9],[72,21],[68,25],[57,25],[52,16],[43,13],[36,29],[32,31],[27,40],[22,40],[24,35],[18,40],[16,38],[12,45],[7,44],[3,42],[-1,43],[-1,37]],
 [[-168,71],[-150,70],[-136,69],[-127,70],[-111,74],[-96,80],[-78,80],[-63,67],[-65,58],[-54,52],[-60,47],[-71,46],[-76,36],[-81,25],[-84,30],[-91,29],[-97,26],[-97,20],[-88,16],[-83,10],[-78,8],[-81,8],[-87,13],[-96,16],[-105,20],[-114,30],[-120,37],[-125,49],[-135,58],[-147,60],[-164,55],[-168,61]],
 [[-81,12],[-72,11],[-66,10],[-60,6],[-52,3],[-49,-1],[-35,-5],[-35,-12],[-40,-22],[-48,-28],[-54,-34],[-62,-41],[-68,-55],[-74,-51],[-73,-40],[-71,-30],[-75,-16],[-81,-5],[-78,2]],
 [[-52,60],[-43,59],[-21,70],[-18,78],[-31,83],[-51,82],[-63,76],[-58,67]],
 [[112,-22],[114,-30],[123,-34],[130,-32],[138,-35],[145,-39],[153,-28],[151,-23],[146,-17],[142,-11],[136,-12],[130,-11],[124,-16],[115,-20]],
 [[48,-13],[51,-16],[48,-25],[44,-25],[44,-19]],
 [[-8,50],[-6,55],[-7,58],[-3,59],[0,52]],
 [[130,31],[136,35],[142,42],[145,44],[143,37],[138,34]],
 [[95,5],[105,-5],[115,-8],[119,-8],[110,-6],[102,1]],
 [[109,7],[119,6],[117,-4],[110,-3]],
 [[131,-3],[141,-2],[151,-6],[145,-10],[136,-7]],
 [[172,-34],[178,-38],[174,-42],[169,-47],[166,-45]],
 [[-24,64],[-14,64],[-13,67],[-22,67]],
 [[-84,23],[-75,21],[-79,20]],
];
function inside(x,y,poly){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!=(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)hit=!hit;}return hit;}
const mapWidth=720,mapHeight=360,land=new Uint8Array(mapWidth*mapHeight);
for(let y=0;y<mapHeight;y++){const lat=90-y/2;for(let x=0;x<mapWidth;x++){const lon=x/2-180;land[y*mapWidth+x]=Number(lat < -73 || continents.some(p=>inside(lon,lat,p)));}}
const samples=[];
const radius=302;
for(let y=-radius;y<=radius;y+=9){for(let x=-radius;x<=radius;x+=6){const nx=x/radius,ny=y/radius,r2=nx*nx+ny*ny;if(r2>=.99)continue;const z=Math.sqrt(1-r2);samples.push({x:x+320,y:y+320,lat:Math.asin(-ny),lon:Math.atan2(nx,z),z,hash:Math.abs(Math.round(x*13+y*7))});}}
function drawEarth(angle){
  if(!ctx)return;
  ctx.clearRect(0,0,640,640);ctx.font='8px "Courier New", monospace';ctx.textAlign='center';ctx.textBaseline='middle';
  for(const s of samples){const lon=((s.lon+angle)*180/Math.PI+540)%360-180;const lat=s.lat*180/Math.PI;const isLand=land[Math.min(359,Math.floor((90-lat)*2))*mapWidth+Math.min(719,Math.floor((lon+180)*2))];const light=.32+.68*Math.pow(s.z,.55);ctx.fillStyle=isLand?`rgba(241,242,245,${light})`:`rgba(144,156,183,${light*.32})`;const glyph=isLand?'01#*+X'[s.hash%6]:'.:·'[s.hash%3];ctx.fillText(glyph,s.x,s.y);}
}
let height=innerHeight,diagonal=Math.hypot(innerWidth,innerHeight)/2+4,scrollLength=1,globeRadius=200;
function measure(){height=$('.stage').clientHeight;scrollLength=Math.max(1,story.offsetHeight-height);diagonal=Math.hypot(innerWidth,height)/2+4;globeRadius=canvas.clientWidth*.472;}
measure();listen(window, 'resize', measure, { passive: true });
let progress=0,history=[],lastEarth=-100,lastTime=0,angle=.3,frameId;
function delayed(now,ms){const cutoff=now-ms;let value=history[0]?.p??progress;for(const entry of history){if(entry.t>cutoff)break;value=entry.p;}return value;}
// Animate vector geometry, never a scaled bitmap or tiny composited CSS layer.
function circle(node,r,alpha=1){node.setAttribute('r',String(Math.max(0,r)));node.style.opacity=alpha;}
function render(now){
  const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
  const target=clamp(scrollY/scrollLength);
  progress+= (target-progress)*(1-Math.exp(-dt*13));
  if(Math.abs(target-progress)<.0001)progress=target;
  history.push({t:now,p:progress});while(history.length>1&&history[1].t<now-1100)history.shift();
  if(!reduced.matches){
    const p=progress,collapse=ease(range(p,.015,.17)),seedIn=ease(range(p,.12,.17)),globeIn=ease(range(p,.20,.32));
    el.hero_logo.style.transform=`scale(${1-collapse*.975})`;el.hero_logo.style.filter=`blur(${collapse*20}px)`;el.hero_logo.style.opacity=1-range(p,.11,.17);
    el.intro_caption.style.opacity=1-range(p,.01,.08);
    circle(el.seed,8+(globeRadius-8)*globeIn,seedIn*(1-ease(range(p,.23,.32))));
    el.world.style.opacity=range(p,.21,.32)*(1-range(p,.51,.57));
    canvas.style.transform=`scale(${8/globeRadius+(1-8/globeRadius)*globeIn})`;
    worldCopy.forEach(node=>node.style.opacity=range(p,.30,.35)*(1-range(p,.48,.53)));
    const bloom=ease(range(p,.55,.76));circle(el.circle_white,globeRadius+(diagonal-globeRadius)*bloom,range(p,.51,.57));
    // Blue follows the first white circle by exactly 500ms; the white page follows blue.
    const blue=delayed(now,500),paper=delayed(now,1000);
    circle(el.circle_blue,diagonal*ease(range(blue,.58,.77)),range(blue,.58,.6));
    const reveal=ease(range(paper,.64,.82));el.purpose.style.clipPath=`circle(${diagonal*reveal}px at 50% 50%)`;
    el.purpose.classList.toggle('is-visible',reveal>.99);
    const reading=range(paper,.83,.98);words.forEach((word,i)=>word.style.opacity=.5+.5*range(reading,i/words.length,(i+.85)/words.length));
    el.purpose_statement.style.opacity=range(paper,.89,.96);el.contact_link.style.opacity=range(paper,.94,.99);
    el.scroll_prompt.style.opacity=1-range(p,.015,.06);el.scroll_prompt.style.pointerEvents=p<.06?'auto':'none';
    $('.progress-track div').style.transform=`scaleX(${p})`;
    if(p>.20&&p<.58&&now-lastEarth>42){angle+=Math.min(now-lastEarth,100)*.00017;drawEarth(angle);lastEarth=now;}
  }
  frameId=requestAnimationFrame(render);
}
drawEarth(.3);frameId=requestAnimationFrame(render);
listen(document, 'visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frameId);else{lastTime=performance.now();frameId=requestAnimationFrame(render);}});
listen(reduced, 'change',()=>{measure();drawEarth(.3);});
const menuButton=$('.menu-toggle'),menu=$('#site-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
listen(menuButton, 'click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
listen(document, 'click',event=>{if(!$('.navigation').contains(event.target))closeMenu();});
listen(document, 'keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
function goTo(hash){const destination=hash==='#home'?0:hash==='#world'?(reduced.matches?innerHeight:scrollLength*.36):(reduced.matches?innerHeight*2:scrollLength);scrollTo({top:destination,behavior:reduced.matches?'instant':'smooth'});}
document.querySelectorAll('a[href^="#"]').forEach(link=>listen(link, 'click',event=>{event.preventDefault();closeMenu();goTo(link.hash);if(link.classList.contains('skip-link')){title.tabIndex=-1;title.focus({preventScroll:true});}historyReplace(link.hash);}));
function historyReplace(hash){window.history.replaceState(null,'',hash);}
listen(el.scroll_prompt, 'click',()=>goTo('#world'));
const anchorFrame = location.hash ? requestAnimationFrame(() => goTo(location.hash)) : null;

  return () => {
    controller.abort();
    cancelAnimationFrame(frameId);
    if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
  };
}
