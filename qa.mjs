import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
const artifacts=path.resolve('artifacts');
await mkdir(artifacts,{recursive:true});
const profile=path.join(artifacts,`chrome-qa-${Date.now()}`);
const chrome=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;
try {
 let port;
 for(let i=0;i<100;i++){try{port=(await readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];break;}catch{await sleep(100);}}
 if(!port)throw Error('Headless Chrome did not become ready');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json`)).json();
 ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise(r=>ws.addEventListener('open',r,{once:true}));
 let id=0;const pending=new Map(),errors=[];
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const cb=pending.get(m.id);pending.delete(m.id);if(m.error)cb.reject(m.error);else cb.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.value||a.description).join(' '));});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
 const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
 await send('Runtime.enable');await send('Page.enable');
 const report=[];
 for(const size of [{name:'wide',width:1920,height:1080},{name:'desktop',width:1440,height:900},{name:'tablet',width:768,height:1024},{name:'mobile',width:390,height:844},{name:'small-mobile',width:320,height:568},{name:'landscape',width:844,height:390}]){
  await send('Emulation.setDeviceMetricsOverride',{width:size.width,height:size.height,deviceScaleFactor:1,mobile:false});
  const response=await fetch('http://127.0.0.1:4173');if(!response.ok)throw Error('Preview HTTP check failed');
  await send('Page.navigate',{url:'http://127.0.0.1:4173'});await sleep(700);
  if(!await evaluate(`Boolean(document.querySelector('.hero-logo'))`))throw Error('Preview did not load');
  if(!await evaluate(`[...document.scripts].some(script=>script.src.includes('/_next/'))`))throw Error('Next.js assets did not load');
  let initialLogoWidth;
  for(const p of [0,.08,.18,.26,.36,.65,.91,1]){
   await evaluate(`scrollTo(0,(document.querySelector('.scroll-story').offsetHeight-document.querySelector('.stage').clientHeight)*${p})`);await sleep(1600);
   const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(path.join(artifacts,`${size.name}-${p}.png`),Buffer.from(shot.data,'base64'));
   report.push({viewport:size.name,p,...await evaluate(`({scrollY,overflow:document.documentElement.scrollWidth>innerWidth,globeOpacity:getComputedStyle(document.querySelector('.world')).opacity,wordOpacity:[...document.querySelectorAll('.word')].map(w=>getComputedStyle(w).opacity),purposeVisible:document.querySelector('.purpose').classList.contains('is-visible')})`)});
   if(p===0)initialLogoWidth=await evaluate(`document.querySelector('.hero-logo').getBoundingClientRect().width`);
   if(p===.08){const width=await evaluate(`document.querySelector('.hero-logo').getBoundingClientRect().width`);if(width>=initialLogoWidth*.8)throw Error('Opening wordmark did not shrink');}
   if(p===.26){if(!await evaluate(`document.querySelector('.seed') instanceof SVGCircleElement && document.querySelector('.seed').r.baseVal.value>8`))throw Error('Morph must use a growing vector circle');}
   if(p===.36||p===1){
    const problems=await evaluate(`(()=>{const selectors=${p===.36?JSON.stringify(['.world-left','.world-right','#earth']):JSON.stringify(['h2','.purpose-statement','.contact-link','footer'])};return selectors.filter(s=>{const r=document.querySelector(s).getBoundingClientRect();return r.left<0||r.right>innerWidth||r.top<0||r.bottom>innerHeight;});})()`);
    if(problems.length)throw Error(size.name+' content outside viewport: '+problems.join(', '));
   }
  }
  await evaluate(`document.querySelector('.menu-toggle').click()`);
  if(!await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'&&!document.querySelector('.menu').hidden`))throw Error('Menu failed to open');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  if(!await evaluate(`document.querySelector('.menu').hidden`))throw Error('Escape failed to close menu');
  await evaluate(`document.querySelector('a[href="#home"]').click()`);await sleep(2300);
  if(await evaluate('scrollY')>2)throw Error('Home navigation failed');
  console.log('Passed '+size.name+' layout, logo collapse, vector morph, scroll reveal, and navigation');
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(300);
 report.push({reducedMotion:await evaluate(`({staticGlobe:getComputedStyle(document.querySelector('.world')).position,visibleText:getComputedStyle(document.querySelector('.word')).opacity,pageHeight:document.querySelector('.scroll-story').offsetHeight,viewport:innerHeight})`)});
 await writeFile(path.join(artifacts,'qa-results.json'),JSON.stringify({errors,report},null,2));
 console.log(JSON.stringify({errors,report},null,2));
 if(errors.length||report.some(r=>r.overflow))throw Error('Browser validation failed');
 await send('Browser.close').catch(()=>{});
} finally { ws?.close();chrome.kill(); }
