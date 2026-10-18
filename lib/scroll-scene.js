// Runs only after the Next.js client component mounts.
export function initializeScrollScene() {
  const controller = new AbortController();
  const listen = (target, event, callback, options = {}) =>
    target.addEventListener(event, callback, { ...options, signal: controller.signal });
/* Scroll choreography for the EIB logo, globe, and circular section reveals. */
const $ = (selector) => document.querySelector(selector);
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const range = (n, a, b) => clamp((n - a) / (b - a));
const ease = (n) => n * n * (3 - 2 * n);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const el = Object.fromEntries(['hero-logo','intro-caption','seed','world','circle-white','circle-blue','purpose','scroll-prompt'].map(name => [name.replaceAll('-', '_'), $('.' + name)]));
const navigation = $('.navigation');
const worldCopy = [...document.querySelectorAll('.world-copy')];
const story = $('.scroll-story');
const companies = $('#companies');
const canvas = $('#earth');

const title = $('#purpose-title');
const words = [...title.querySelectorAll('.word')];

// At 10% visibility, animate the whole panel to the top with a consistent easing.
// A dedicated animation keeps trackpad/touch momentum from interrupting the snap.
const companiesSnapThreshold=.1,companiesSnapDuration=700;
let previousScrollY=scrollY,sectionSnapFrame=null,navigationScrolling=false,scrollResetTimer;
function finishNavigationScroll(){navigationScrolling=false;clearTimeout(scrollResetTimer);}
function resetScrollAfterAnimation(){clearTimeout(scrollResetTimer);scrollResetTimer=setTimeout(finishNavigationScroll,1800);}
function cancelCompaniesSnap(){
  if(sectionSnapFrame!==null)cancelAnimationFrame(sectionSnapFrame);
  sectionSnapFrame=null;
}
function snapCompaniesToTop(){
  const from=scrollY,started=performance.now();
  function step(now){
    const t=Math.min(1,(now-started)/companiesSnapDuration);
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    scrollTo({top:from+(companies.offsetTop-from)*eased,behavior:'instant'});
    if(t<1)sectionSnapFrame=requestAnimationFrame(step);
    else sectionSnapFrame=null;
  }
  sectionSnapFrame=requestAnimationFrame(step);
}
listen(window,'scroll',()=>{
  const movingDown=scrollY>previousScrollY;
  previousScrollY=scrollY;
  if(!movingDown||reduced.matches||sectionSnapFrame!==null||navigationScrolling)return;
  const bounds=companies.getBoundingClientRect();
  const visibleHeight=Math.max(0,Math.min(innerHeight,bounds.bottom)-Math.max(0,bounds.top));
  if(bounds.top>1&&visibleHeight>=bounds.height*companiesSnapThreshold)snapCompaniesToTop();
},{passive:true});
listen(window,'scrollend',finishNavigationScroll);
listen(window,'wheel',event=>{if(event.deltaY<0)cancelCompaniesSnap();},{passive:true});
listen(window,'touchstart',cancelCompaniesSnap,{passive:true});
listen(window,'keydown',event=>{if(['ArrowUp','PageUp','Home'].includes(event.key))cancelCompaniesSnap();});

let height=innerHeight,diagonal=Math.hypot(innerWidth,innerHeight)/2+4,scrollLength=1,globeRadius=200,navCenterY=80;
function measure(){height=$('.stage').clientHeight;scrollLength=Math.max(1,story.offsetHeight-height);diagonal=Math.hypot(innerWidth,height)/2+4;globeRadius=canvas.clientWidth*.472;navCenterY=parseFloat(getComputedStyle(navigation).top)+28;}
function setNavigationTone(light){const tone=light?'light':'dark';if(navigation.dataset.tone!==tone)navigation.dataset.tone=tone;}
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
    const bloom=ease(range(p,.55,.76)),whiteRadius=globeRadius+(diagonal-globeRadius)*bloom;
    circle(el.circle_white,whiteRadius,range(p,.51,.57));
    // The brand circle follows white by 500ms; the white page follows the brand circle.
    const blue=delayed(now,500),paper=delayed(now,1000);
    const brandRadius=diagonal*ease(range(blue,.58,.77));
    circle(el.circle_blue,brandRadius,range(blue,.58,.6));
    const reveal=ease(range(paper,.64,.82)),paperRadius=diagonal*reveal;
    el.purpose.style.clipPath=`circle(${paperRadius}px at 50% 50%)`;
    // Match the surface directly behind the top bar, including circle transitions.
    const navDistance=Math.abs(height/2-navCenterY);
    const storyBounds=story.getBoundingClientRect();
    const companiesBounds=companies.getBoundingClientRect();
    const onCompanies=companiesBounds.top<=navCenterY&&companiesBounds.bottom>navCenterY;
    setNavigationTone(onCompanies||(storyBounds.bottom>navCenterY&&(paperRadius>=navDistance||(whiteRadius>=navDistance&&p>.54&&brandRadius<navDistance))));
    el.purpose.classList.toggle('is-visible',reveal>.99);
    const reading=range(paper,.83,.98);words.forEach((word,i)=>word.style.opacity=.5+.5*range(reading,i/words.length,(i+.85)/words.length));
    el.scroll_prompt.style.opacity=1-range(p,.015,.06);el.scroll_prompt.style.pointerEvents=p<.06?'auto':'none';

  }else{
    const bounds=el.purpose.getBoundingClientRect();
    const companiesBounds=companies.getBoundingClientRect();
    setNavigationTone((bounds.top<=navCenterY&&bounds.bottom>navCenterY)||(companiesBounds.top<=navCenterY&&companiesBounds.bottom>navCenterY));
  }
  frameId=requestAnimationFrame(render);
}
frameId=requestAnimationFrame(render);
listen(document, 'visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frameId);else{lastTime=performance.now();frameId=requestAnimationFrame(render);}});
listen(reduced, 'change',()=>{cancelCompaniesSnap();measure();});
function goTo(hash){
  cancelCompaniesSnap();
  navigationScrolling=true;
  resetScrollAfterAnimation();
  const destination=hash==='#home'?0:hash==='#contact'?$('#contact').getBoundingClientRect().top+scrollY:hash==='#leadership'?$('#leadership').offsetTop:hash==='#companies'?companies.offsetTop:hash==='#world'?(reduced.matches?innerHeight:scrollLength*.36):(reduced.matches?innerHeight*2:scrollLength);
  scrollTo({top:destination,behavior:reduced.matches?'instant':'smooth'});
}
document.querySelectorAll('a[href^="#"]').forEach(link=>listen(link, 'click',event=>{event.preventDefault();goTo(link.hash);if(link.classList.contains('skip-link')){title.tabIndex=-1;title.focus({preventScroll:true});}historyReplace(link.hash);}));
function historyReplace(hash){window.history.replaceState(null,'',hash);}
listen(el.scroll_prompt, 'click',()=>goTo('#world'));
const anchorFrame = location.hash ? requestAnimationFrame(() => goTo(location.hash)) : null;

  return () => {
    controller.abort();
    cancelCompaniesSnap();
    clearTimeout(scrollResetTimer);
    cancelAnimationFrame(frameId);
    if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
  };
}

