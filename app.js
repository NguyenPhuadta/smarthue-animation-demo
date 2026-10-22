'use strict';
const states=[
 {id:1,node:'24841:7701',slot:'24841:7702',label:'Tìm đèn',heading:'Finding Your Lights',file:'01-tim-den',frames:240},
 {id:2,node:'24841:7710',slot:'24841:7711',label:'Tìm thấy',heading:'Found Your Lights',file:'02-tim-thay',frames:276},
 {id:3,node:'24841:7721',slot:'24841:7722',label:'Đang kết nối',heading:'Connecting to',file:'03-dang-ket-noi',frames:120},
 {id:4,node:'24841:7732',slot:'24841:7733',label:'Thành công',heading:'Connected to',file:'04-thanh-cong',frames:450}
];
const bridges=[{id:5,label:'Nối Tìm thấy → Đang kết nối',file:'05-tim-thay-den-ket-noi',frames:168,from:2,to:3}];
const errors=[{id:7,label:'Không tìm thấy đèn',file:'07-no-light-found',frames:252,screen:1},{id:8,label:'Kết nối quá thời gian',file:'08-connection-timeout',frames:240,screen:3}];
const intro={id:0,label:'Trước khi Scan',file:'before-scan',frames:480};
const searchEntry={...states[0],id:9,screen:1,file:"01-tim-den-entry"};
const clips=[intro,searchEntry,...states,...bridges,...errors],flow=[1,2,5,3,4],cache=new Map(),players=new Map(),prepared=new Map();const preparing=new Map();let preparation=null,activeId=null;
const $=id=>document.getElementById(id);let loading=Promise.resolve(),mode='sequence',selected=1,paused=false,epoch=0,scanQueued=false;
window.previewEvents=[];window.previewReady=false;window.previewSpeed=1;
function log(type,clip){window.previewEvents.push({type,clip,time:performance.now()})}
const introCard=document.createElement('section');introCard.className='screen-card';introCard.dataset.state=0;
introCard.innerHTML=`<div class="effect-scene" data-state="0"><div class="animation-slot" aria-label="Animation trước khi Scan"></div></div>`;
$('screens').appendChild(introCard);
$('scan-now').onclick=beginIntroHandoff;
const introTab=document.createElement('button');introTab.textContent='0. Trước khi Scan';introTab.dataset.state=0;introTab.onclick=()=>start('single',0);$('state-tabs').appendChild(introTab);

for(const state of states){
 const card=document.createElement('section');card.className='screen-card';card.dataset.state=state.id;
 card.innerHTML=`<div class="effect-scene" data-state="${state.id}"><div class="animation-slot" aria-label="Animation ${state.label}"></div></div>`;
 $('screens').appendChild(card);
 const tab=document.createElement('button');tab.textContent=state.id+'. '+state.label;tab.dataset.state=state.id;tab.onclick=()=>start('single',state.id);$('state-tabs').appendChild(tab);
}
for(const clip of [...bridges,...errors]){const tab=document.createElement('button');tab.textContent=clip.label;tab.dataset.state=clip.id;tab.onclick=()=>start('single',clip.id);$('state-tabs').appendChild(tab);}
function dataFor(clip){
 if(cache.has(clip.id))return Promise.resolve(cache.get(clip.id));
 if(clip.id===0){
  const task=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='before-scan/animation-0/animation-data.js?rev=gradient-v21-20261022';script.onload=()=>resolve(window.animationZero);script.onerror=()=>reject(Error('Không tải được hướng dẫn trước Scan'));document.body.appendChild(script)});cache.set(0,task);return task;
 }
 if(location.protocol!=='file:'&&typeof DecompressionStream!=='undefined'){
  const request=fetch('animations/'+clip.file+'.json.gz?rev=gradient-v21-20261022').then(async response=>{if(!response.ok)throw Error('Không tải được '+clip.file);const stream=response.body.pipeThrough(new DecompressionStream('gzip'));return JSON.parse(await new Response(stream).text())}).then(data=>{cache.set(clip.id,data);return data});cache.set(clip.id,request);return request;
 }
 const task=loading.then(()=>new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='animations/'+clip.file+'-data.js?rev=gradient-v21-20261022';
  script.onload=()=>{const data=window.animationData;cache.set(clip.id,data);script.remove();resolve(data)};
  script.onerror=()=>{script.remove();reject(Error('Không tải được '+clip.file))};document.body.appendChild(script);
 }));loading=task.catch(()=>{});return task;
}
function align(data){return window.floorGradient.apply(data)}
function display(stateId){
 for(const card of document.querySelectorAll('.screen-card'))card.hidden=mode!=='overview'&&Number(card.dataset.state)!==stateId;
 $('screens').classList.toggle('single',mode!=='overview');
 $('scan-now').hidden=stateId!==0;
 for(const b of $('state-tabs').children)b.setAttribute('aria-pressed',mode==='single'&&Number(b.dataset.state)===stateId);
 $('overview').setAttribute('aria-pressed',mode==='overview');$('sequence').setAttribute('aria-pressed',mode==='sequence');
}
function updateStatus(clip){
 $('pause').textContent=paused?'Phát tiếp':'Tạm dừng';
 $('status').textContent=mode==='overview'?'4 hiệu ứng · Mỗi state lặp toàn bộ':`${mode==='sequence'?'Cả luồng · ':''}${clip.label} · ${clip.frames/60}s${paused?' · Đang dừng':''}`;
}
function screenFor(clip){return clip.screen||clip.from||clip.id}
async function prepareClip(clip){
 const data=align(structuredClone(await dataFor(clip))),stateId=screenFor(clip);
 const slot=document.querySelector(`.effect-scene[data-state="${stateId}"] .animation-slot`),holder=document.createElement('div');holder.className='animation-frame';holder.style.visibility='hidden';slot.appendChild(holder);
 const animation=lottie.loadAnimation({container:holder,renderer:'svg',autoplay:false,loop:false,animationData:data,rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});
 await new Promise((resolve,reject)=>{animation.addEventListener('DOMLoaded',resolve);animation.addEventListener('data_failed',()=>reject(Error('Animation không tải được')))});
 if(!animation.imagePreloader.loadedImages())await new Promise(resolve=>animation.addEventListener('loaded_images',resolve));
 animation.setSubframe(true);
 animation.goToAndStop(0,true);
 const player={animation,holder,clip,stateId};window.floorGradient.bind(player);prepared.set(clip.id,player);
 animation.addEventListener('complete',()=>{
  if(activeId!==clip.id||!player.token||player.token!==epoch)return;
  log('complete',clip.id);
  if(clip.id===9){activateClip(2,epoch);return}
  if(mode==='sequence'&&clip.id!==0){
   const next=flow[(flow.indexOf(clip.id)+1)%flow.length];
   if(next){const token=epoch;if(prepared.has(next))activateClip(next,token);else ensureClip(next).then(()=>activateClip(next,token)).catch(fail);return}
  }
  animation.goToAndStop(clip.id===0?20:0,true);if(!paused)animation.play();log('loop',clip.id);
 });
 return player;
}
function ensureClip(id){
 if(prepared.has(id))return Promise.resolve(prepared.get(id));
 if(!preparing.has(id))preparing.set(id,prepareClip(clips.find(c=>c.id===id)));
 return preparing.get(id);
}
function prepareAll(){
 if(!preparation)preparation=Promise.all(flow.map(ensureClip));
 return preparation;
}
function activateClip(id,token){
 if(token!==epoch)return;
 const player=prepared.get(id);if(!player)throw Error('Animation chưa sẵn sàng');
 for(const p of prepared.values()){p.animation.pause();p.holder.style.visibility='hidden';p.holder.style.transition='';p.holder.style.opacity='';p.token=null;}
 players.clear();players.set(player.stateId,player);activeId=id;player.token=token;
 const animation=player.animation;animation.setSpeed(window.previewSpeed);animation.goToAndStop(0,true);
 player.holder.style.visibility='visible';display(player.stateId);updateStatus(player.clip);
 for(const b of $('state-tabs').children)b.setAttribute('aria-pressed',mode==='single'&&Number(b.dataset.state)===id);
 log('load',id);if(!paused)animation.play();return animation;
}
function fail(error){$('status').textContent=error.message;console.error(error)}
async function start(nextMode,stateId=1,skipIntro=false){
 const token=++epoch;mode=nextMode;scanQueued=false;$('scan-now').disabled=false;window.previewReady=false;
 const target=mode==='sequence'?(skipIntro?1:0):stateId;selected=target;
 display(screenFor(clips.find(c=>c.id===target)));
 window.scrollTo(0,0);
 for(const p of prepared.values())p.animation.pause();
 if(!preparation)$('status').textContent='Đang chuẩn bị animation · chỉ tải một lần…';
 try{
  const entry=ensureClip(target);
  if(mode==='sequence')prepareAll().catch(fail);
  await entry;if(token!==epoch)return;
  activateClip(target,token);window.previewReady=true;
 }catch(error){fail(error)}
}
async function beginIntroHandoff(){
 if(scanQueued||activeId!==0)return;
 scanQueued=true;
 const token=epoch,button=$('scan-now');button.disabled=true;
 try{
  await ensureClip(1);if(token!==epoch||activeId!==0)return;
  mode='sequence';prepareAll().catch(fail);paused=false;
  const current=prepared.get(0);current.token=null;
  current.animation.play();
  current.holder.style.transition='opacity 280ms ease-out';
  current.holder.style.opacity='0';
  $('status').textContent='Bắt đầu tìm đèn…';log('handoff-fade-start',0);
  await new Promise(resolve=>setTimeout(resolve,280));
  if(token!==epoch)return;
  scanQueued=false;activateClip(1,token);window.previewReady=true;log('handoff-complete',9);
 }catch(error){scanQueued=false;button.disabled=false;fail(error)}
}
$('overview').onclick=()=>start('overview');$('sequence').onclick=()=>start('sequence');$('restart').onclick=()=>start(mode,selected);
$('pause').onclick=()=>{
 paused=!paused;for(const [id,p] of players){if(mode==='overview'||!document.querySelector(`.screen-card[data-state="${id}"]`).hidden){if(paused)p.animation.pause();else p.animation.play()}}
 const active=[...players.values()].find(p=>!p.holder.closest('.screen-card').hidden);updateStatus(active?.clip||states[0]);
};
window.teamPreview={start,players,states,bridges};
window.floorGradient.currentData=async()=>{const clip=clips.find(c=>c.id===activeId);if(!clip||!window.previewReady)throw Error("Đợi animation tải xong rồi thử lại.");return {data:window.floorGradient.apply(structuredClone(await dataFor(clip))),name:clip.id===0?"00-before-scan":clip.file}};
const entryParams=new URLSearchParams(location.search);
const requestedState=Number(entryParams.get('state'));
start(entryParams.get('mode')==='single'&&clips.some(c=>c.id===requestedState)?'single':'sequence',requestedState);
