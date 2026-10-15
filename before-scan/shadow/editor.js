'use strict';
const $=id=>document.getElementById(id),KEY='intro-text-shadow-alignment-v2',defaults={x:-149,y:150.2,scale:116,opacity:100};
let settings={...defaults},elements=[],drag=null,playing=false;
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&Object.keys(defaults).every(k=>Number.isFinite(saved[k])))settings={...saved}}catch{}
const anim=lottie.loadAnimation({container:$('animation'),renderer:'svg',loop:true,autoplay:false,animationData:structuredClone(window.animationZero)});
function collect(list){for(const e of list||[]){if(e?.data?.refId==='intro-text-shadow')elements.push(e);if(e?.elements)collect(e.elements)}}
function apply(){for(const e of elements){const el=e.transformedElement||e.layerElement;el?.setAttribute('transform',`matrix(${settings.scale/100},0,0,${settings.scale/100},${settings.x},${settings.y})`);el?.setAttribute('opacity',settings.opacity/100)}const b=$('bounds');b.style.cssText=`left:${settings.x/393*100}%;top:${settings.y/326*100}%;width:${379*settings.scale/100/393*100}%;height:${125*settings.scale/100/326*100}%;`;}
function sync(){for(const k of Object.keys(defaults))$(k).value=settings[k];$('alpha').value=settings.opacity;apply()}
function update(next){if(!Object.values(next).every(Number.isFinite))return;settings={...settings,...next};settings.scale=Math.max(10,Math.min(300,settings.scale));settings.opacity=Math.max(0,Math.min(100,settings.opacity));settings.x=Math.round(settings.x*10)/10;settings.y=Math.round(settings.y*10)/10;localStorage.setItem(KEY,JSON.stringify(settings));sync();$('status').textContent='Đã lưu trên trình duyệt. Xuất vị trí rồi gửi lại để áp dụng vào file bàn giao.'}
function seek(f){playing=false;anim.goToAndStop(f,true);$('play').textContent='Phát';$('seek').value=f;apply()}
anim.addEventListener('DOMLoaded',()=>{collect(anim.renderer.elements);seek(74);sync();window.editorReady=true});
anim.addEventListener('enterFrame',()=>{apply();$('seek').value=Math.round(anim.currentFrame)});
for(const k of Object.keys(defaults))$(k).oninput=e=>{if(e.target.value!=='')update({[k]:Number(e.target.value)})};
$('alpha').oninput=e=>update({opacity:Number(e.target.value)});$('reset').onclick=()=>update(defaults);$('seek').oninput=e=>seek(Number(e.target.value));
for(const b of document.querySelectorAll('[data-frame]'))b.onclick=()=>seek(Number(b.dataset.frame));
$('play').onclick=()=>{playing=!playing;if(playing)anim.play();else anim.pause();$('play').textContent=playing?'Tạm dừng':'Phát'};
$('drag').onpointerdown=e=>{if(e.button!==0)return;seek(anim.currentFrame);drag={cx:e.clientX,cy:e.clientY,x:settings.x,y:settings.y};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.focus();e.preventDefault()};
$('drag').onpointermove=e=>{if(!drag)return;const r=$('stage').getBoundingClientRect();update({x:drag.x+(e.clientX-drag.cx)*393/r.width,y:drag.y+(e.clientY-drag.cy)*326/r.height})};
$('drag').onpointerup=$('drag').onpointercancel=()=>drag=null;
$('drag').onkeydown=e=>{const v={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!v)return;e.preventDefault();update({x:settings.x+v[0]*(e.shiftKey?10:1),y:settings.y+v[1]*(e.shiftKey?10:1)})};
$('export').onclick=()=>{const data={asset:'intro-text-shadow',animation:0,...settings,composition:{w:393,h:326}},a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='animation-0-shadow-position.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
window.introShadowEditor={get settings(){return {...settings}},anim,apply};sync();
