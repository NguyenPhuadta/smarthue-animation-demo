'use strict';
const states=[
 {id:1,node:'24841:7701',slot:'24841:7702',label:'Tìm đèn',heading:'Finding Your Lights',file:'01-tim-den',frames:240},
 {id:2,node:'24841:7710',slot:'24841:7711',label:'Tìm thấy',heading:'Found Your Lights',file:'02-tim-thay',frames:276},
 {id:3,node:'24841:7721',slot:'24841:7722',label:'Đang kết nối',heading:'Connecting to',file:'03-dang-ket-noi',frames:120},
 {id:4,node:'24841:7732',slot:'24841:7733',label:'Thành công',heading:'Connected to',file:'04-thanh-cong',frames:450}
];
const bridges=[{id:5,label:'Nối Tìm thấy → Đang kết nối',file:'05-tim-thay-den-ket-noi',frames:168,from:2,to:3}];
const clips=[...states,...bridges],flow=[1,2,5,3,4],cache=new Map(),players=new Map();
const $=id=>document.getElementById(id);let loading=Promise.resolve(),mode='overview',selected=1,paused=false,epoch=0;
window.previewEvents=[];window.previewReady=false;window.previewSpeed=1;
function log(type,clip){window.previewEvents.push({type,clip,time:performance.now()})}
for(const state of states){
 const card=document.createElement('section');card.className='screen-card';card.dataset.state=state.id;
 card.innerHTML=`<h2 class="screen-label">${state.id}. ${state.label}<span>393 × 852</span></h2>
 <div class="phone-wrapper"><div class="phone" data-node-id="${state.node}" data-state="${state.id}">
 <img class="top-glow" src="assets/s${state.id}-imgEllipse24.svg" alt="">
 <div class="statusbar" aria-hidden="true"><div class="time">9:41</div><div class="levels"><img src="assets/s${state.id}-imgCellularConnection.svg" alt=""><img src="assets/s${state.id}-imgWifi.svg" alt=""><img src="assets/s${state.id}-imgBattery.svg" alt=""></div></div>
 <div class="headline ${state.id===1?'search':''}"><p>${state.heading}</p>${state.id>1?'<div class="lamp-name">Hue color lamp</div>':''}</div>
 <div class="animation-slot" data-node-id="${state.slot}" data-name="animaton chạy ở đây" aria-label="Animation ${state.label}"></div>
 ${state.id<4?'<p class="instruction">Please stay close within <b>1 meter</b> to your light to find and connect</p>':''}
 <div class="home-indicator" aria-hidden="true"></div></div></div>`;
 $('screens').appendChild(card);
 const tab=document.createElement('button');tab.textContent=state.id+'. '+state.label;tab.dataset.state=state.id;tab.onclick=()=>start('single',state.id);$('state-tabs').appendChild(tab);
}
function dataFor(clip){
 if(cache.has(clip.id))return Promise.resolve(cache.get(clip.id));
 const task=loading.then(()=>new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='animations/'+clip.file+'-data.js?rev=lamp-cutout-v6';
  script.onload=()=>{const data=window.animationData;cache.set(clip.id,data);script.remove();resolve(data)};
  script.onerror=()=>{script.remove();reject(Error('Không tải được '+clip.file))};document.body.appendChild(script);
 }));loading=task.catch(()=>{});return task;
}
function align(data){
 let setting;try{setting=JSON.parse(localStorage.getItem('lamp-distance-shadow-alignment-v1'))}catch{}
 if(setting&&['x','y','scale'].every(k=>Number.isFinite(setting[k]))){
  for(const layers of [data.layers,...data.assets.filter(a=>a.layers).map(a=>a.layers)]){
   const layer=layers.find(l=>l.refId==='distance-shadow-supplied');if(!layer)continue;
   const p=layers.find(l=>l.ind===layer.parent)?.ks.p.k||[0,0,0];
   layer.ks.p={a:0,k:[setting.x-p[0],setting.y-p[1],0]};
   const scale=Math.max(10,Math.min(300,setting.scale));layer.ks.s={a:0,k:[scale,scale,100]};
   const alpha=Number.isFinite(setting.opacity)?Math.max(0,Math.min(100,setting.opacity))/100:1;
   if(layer.ks.o.a){for(const k of layer.ks.o.k){k.s=k.s.map(v=>v*alpha);if(k.e)k.e=k.e.map(v=>v*alpha)}}else layer.ks.o.k*=alpha;
  }
 }return data; // Use exported check placement; ignore browser-only alignment overrides.
}
function display(stateId){
 for(const card of document.querySelectorAll('.screen-card'))card.hidden=mode!=='overview'&&Number(card.dataset.state)!==stateId;
 $('screens').classList.toggle('single',mode!=='overview');
 for(const b of $('state-tabs').children)b.setAttribute('aria-pressed',mode==='single'&&Number(b.dataset.state)===stateId);
 $('overview').setAttribute('aria-pressed',mode==='overview');$('sequence').setAttribute('aria-pressed',mode==='sequence');
}
function updateStatus(clip){
 $('pause').textContent=paused?'Phát tiếp':'Tạm dừng';
 $('status').textContent=mode==='overview'?'4 màn hình · Mỗi state lặp toàn bộ':`${mode==='sequence'?'Cả luồng · ':''}${clip.label} · ${clip.frames/60}s${paused?' · Đang dừng':''}`;
}
async function playClip(id,stateId,token){
 const clip=clips.find(c=>c.id===id),data=align(structuredClone(await dataFor(clip)));
 if(token!==epoch)return;
 const slot=document.querySelector(`.phone[data-state="${stateId}"] .animation-slot`),holder=document.createElement('div');holder.className='animation-frame';holder.style.visibility='hidden';slot.appendChild(holder);
 const animation=lottie.loadAnimation({container:holder,renderer:'svg',autoplay:false,loop:false,animationData:data,rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});
 await new Promise((resolve,reject)=>{animation.addEventListener('DOMLoaded',resolve);animation.addEventListener('data_failed',()=>reject(Error('Animation không tải được')))});
 if(token!==epoch){animation.destroy();holder.remove();return}
 const old=players.get(stateId);old?.animation.destroy();old?.holder.remove();players.set(stateId,{animation,holder,clip});
 holder.style.visibility='visible';animation.setSpeed(window.previewSpeed);animation.goToAndStop(0,true);display(stateId);updateStatus(clip);log('load',id);
 animation.addEventListener('complete',()=>{
  if(token!==epoch)return;log('complete',id);
  if(mode==='sequence'){
   const index=flow.indexOf(id),next=flow[index+1];
   if(next){const nextState=next===5?2:next===6?3:next;playClip(next,nextState,token).catch(fail);return}
  }
  animation.goToAndStop(0,true);if(!paused)animation.play();log('loop',id);
 });
 if(!paused)animation.play();return animation;
}
function fail(error){$('status').textContent=error.message;console.error(error)}
async function start(nextMode,stateId=1){
 const token=++epoch;mode=nextMode;selected=stateId;window.previewReady=false;
 for(const player of players.values())player.animation.pause();display(stateId);
 try{
  if(mode==='overview')await Promise.all(states.map(s=>playClip(s.id,s.id,token)));
  else await playClip(mode==='sequence'?1:stateId,mode==='sequence'?1:stateId,token);
  if(token===epoch)window.previewReady=true;
 }catch(error){fail(error)}
}
$('overview').onclick=()=>start('overview');$('sequence').onclick=()=>start('sequence');$('restart').onclick=()=>start(mode,selected);
$('pause').onclick=()=>{
 paused=!paused;for(const [id,p] of players){if(mode==='overview'||!document.querySelector(`.screen-card[data-state="${id}"]`).hidden){if(paused)p.animation.pause();else p.animation.play()}}
 const active=[...players.values()].find(p=>!p.holder.closest('.screen-card').hidden);updateStatus(active?.clip||states[0]);
};
window.teamPreview={start,players,states,bridges};
start('sequence',1);
