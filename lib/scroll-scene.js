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

const title = $('#purpose-title');
const words = [...title.querySelectorAll('.word')];
$('#year').textContent = new Date().getFullYear();

let height=innerHeight,diagonal=Math.hypot(innerWidth,innerHeight)/2+4,scrollLength=1,globeRadius=200;
function measure(){height=$('.stage').clientHeight;scrollLength=Math.max(1,story.offsetHeight-height);diagonal=Math.hypot(innerWidth,height)/2+4;globeRadius=canvas.clientWidth*.472;}
measure();listen(window, 'resize', measure, { passive: true });
let progress=0,history=[],lastTime=0,frameId;
function delayed(now,ms){const cutoff=now-ms;let value=history[0]?.p??progress;for(const entry of history){if(entry.t>cutoff)break;value=entry.p;}return value;}
// Animate vector geometry, never a scaled bitmap or tiny composited CSS layer.
function circle(node,r,alpha=1){node.setAttribute('r',String(Math.max(0,r)));node.style.opacity=alpha;}
function render(now){
  const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
  const target=clamp(scrollY/scrollLength);
  progress+= (target-progress)*(1-Math.exp(-dt*13));
  if(Math.abs(target-progress)<.0001)progress=target;
  history.push({t:now,p:progress});while(history.length>1&&history[1].t<now-1100)history.shift();
  const sceneActive = reduced.matches || (progress > .20 && progress < .58);
  if (canvas.dataset.sceneActive !== String(sceneActive)) {
    canvas.dataset.sceneActive = String(sceneActive);
    canvas.style.pointerEvents = sceneActive ? 'auto' : 'none';
    canvas.dispatchEvent(new Event('globe-visibility'));
  }
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

  }
  frameId=requestAnimationFrame(render);
}
frameId=requestAnimationFrame(render);
listen(document, 'visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frameId);else{lastTime=performance.now();frameId=requestAnimationFrame(render);}});
listen(reduced, 'change',()=>{measure();});
function goTo(hash){const destination=hash==='#home'?0:hash==='#world'?(reduced.matches?innerHeight:scrollLength*.36):(reduced.matches?innerHeight*2:scrollLength);scrollTo({top:destination,behavior:reduced.matches?'instant':'smooth'});}
document.querySelectorAll('a[href^="#"]').forEach(link=>listen(link, 'click',event=>{event.preventDefault();goTo(link.hash);if(link.classList.contains('skip-link')){title.tabIndex=-1;title.focus({preventScroll:true});}historyReplace(link.hash);}));
function historyReplace(hash){window.history.replaceState(null,'',hash);}
listen(el.scroll_prompt, 'click',()=>goTo('#world'));
const anchorFrame = location.hash ? requestAnimationFrame(() => goTo(location.hash)) : null;

  return () => {
    controller.abort();
    cancelAnimationFrame(frameId);
    if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
  };
}

