(() => {
'use strict';
const q=new URLSearchParams(location.search);document.body.classList.toggle('embed',q.get('embed')==='1');
const names={'flow':'full','0':'discover','1':'press-loop','2':'connected','3':'water-reveal','4':'connected-loop','5':'not-found','6':'timeout'};
const key=q.get('mode')==='single'&&names[q.get('state')]?q.get('state'):'flow';
const name=names[key];const select=document.querySelector('#clip');select.value=key;
select.onchange=()=>{const u=new URL(location.href);u.searchParams.delete('frame');u.searchParams.set('mode',select.value==='flow'?'sequence':'single');if(select.value==='flow')u.searchParams.delete('state');else u.searchParams.set('state',select.value);location.href=u.href};
const seek=document.querySelector('#seek'),time=document.querySelector('#time'),pause=document.querySelector('#pause'),status=document.querySelector('#status');
const data=JSON.parse(JSON.stringify(window.BRIDGE_ANIMATIONS[name]));
const anim=lottie.loadAnimation({container:document.querySelector('#animation'),renderer:'svg',loop:['discover','press-loop','connected-loop'].includes(name),autoplay:true,animationData:data,rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});
let paused=false;
function label(){pause.textContent=paused?'Tiếp tục':'Tạm dừng'}
pause.onclick=()=>{paused=!paused;paused?anim.pause():anim.play();label()};
document.querySelector('#replay').onclick=()=>{paused=false;anim.goToAndPlay(0,true);label()};
seek.oninput=()=>{paused=true;anim.goToAndStop(Number(seek.value)/1000*(data.op-data.ip-1),true);label()};
anim.addEventListener('enterFrame',()=>{seek.value=String(Math.round(anim.currentFrame/(data.op-data.ip-1)*1000));time.textContent=(anim.currentFrame/data.fr).toFixed(2)+'s / '+((data.op-data.ip)/data.fr).toFixed(2)+'s'});
anim.addEventListener('complete',()=>{if(name==='connected'){anim.goToAndPlay(24,true)}else{paused=true;label();status.textContent=name==='press'?'Đã chạm nút — nối ngay sang Thành công trong ứng dụng.':'Đã hoàn tất — bấm Phát lại để xem từ đầu.'}});
anim.addEventListener('data_failed',()=>{status.textContent='Không tải được animation.'});
anim.addEventListener('DOMLoaded',()=>{if(q.has('frame')){anim.goToAndStop(Number(q.get('frame')),true);paused=true;label()}status.textContent=name==='connected'?'Phát nhịp nảy một lần, sau đó lặp phần thành công.':name==='full'?'Tìm bridge → hiện lại → bấm → nảy và kết nối ngay.':name==='press-loop'?'Lặp tiếp cận → bấm → nảy → nhả; full luồng vẫn nối thành công ngay khi chạm.':name==='discover'?'Lặp tìm kiếm; khi chuyển sang bấm, chạy đoạn hiện lại một lần.':name==='not-found'?'Sóng dò tắt dần, bridge mờ đi — giữ frame cuối và chờ thử lại.':name==='timeout'?'Vòng kết nối chuyển cam rồi ngắt nhịp — giữ frame cuối và chờ thử lại.':''});
})();