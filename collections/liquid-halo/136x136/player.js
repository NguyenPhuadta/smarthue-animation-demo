(() => {
'use strict';
const q=new URLSearchParams(location.search);
document.body.classList.toggle('embed',q.get('embed')==='1');
const key=q.get('mode')==='single'&&q.get('state')==='0'?'0':'flow';
const select=document.querySelector('#clip');select.value=key;
select.onchange=()=>{const u=new URL(location.href);u.searchParams.delete('frame');u.searchParams.set('mode',select.value==='flow'?'sequence':'single');if(select.value==='flow')u.searchParams.delete('state');else u.searchParams.set('state','0');location.href=u.href};
const seek=document.querySelector('#seek'),time=document.querySelector('#time'),pause=document.querySelector('#pause'),status=document.querySelector('#status');
const data=JSON.parse(JSON.stringify(window.LIQUID_HALO_ANIMATION));
// lottie-web requires hasMask to normalize relative mask tangents.
// Skottie reads masksProperties directly; preserve the source/download bytes.
function maskCompatibility(layers){for(const layer of layers||[]){if(layer.masksProperties?.length)layer.hasMask=true;if(layer.layers)maskCompatibility(layer.layers)}}
maskCompatibility(data.layers);for(const asset of data.assets||[])maskCompatibility(asset.layers);
const anim=lottie.loadAnimation({container:document.querySelector('#animation'),renderer:'svg',loop:true,autoplay:true,animationData:data,rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});
anim.setSpeed(1.5);
let paused=false;
function label(){pause.textContent=paused?'Tiếp tục':'Tạm dừng'}
pause.onclick=()=>{paused=!paused;paused?anim.pause():anim.play();label()};
document.querySelector('#replay').onclick=()=>{paused=false;anim.goToAndPlay(0,true);label()};
seek.oninput=()=>{paused=true;anim.goToAndStop(Number(seek.value)/1000*(data.op-data.ip-1),true);label()};
anim.addEventListener('enterFrame',()=>{seek.value=String(Math.round(anim.currentFrame/(data.op-data.ip-1)*1000));time.textContent=(anim.currentFrame/data.fr/1.5).toFixed(2)+'s / '+((data.op-data.ip)/data.fr/1.5).toFixed(2)+'s'});
anim.addEventListener('data_failed',()=>{status.textContent='Không tải được animation.'});
anim.addEventListener('DOMLoaded',()=>{if(q.has('frame')){anim.goToAndStop(Math.max(0,Math.min(data.op-data.ip-1,Number(q.get('frame'))||0)),true);paused=true;label()}else anim.goToAndPlay(0,true);status.textContent='Khối cầu giữ nguyên kích thước, ánh sáng xoay và merge thành bóng đèn. Chu kỳ 3,56 giây ở tốc độ 1.5×; lặp liên tục.'});
})();
