(() => {
'use strict';
const defaults={color:'#0c0c0c',opacity:100,top:180,bottom:180,left:180,right:180};
const edges=['top','bottom','left','right'],labels={top:'Mép trên',bottom:'Mép dưới',left:'Mép trái',right:'Mép phải'};
const starts={top:[393,0],bottom:[393,652],left:[0,326],right:[786,326]},extent=e=>['left','right'].includes(e)?786:652;
const clean=x=>({color:/^#[0-9a-f]{6}$/i.test(x?.color)?x.color:defaults.color,opacity:Math.min(100,Math.max(0,Number.isFinite(+x?.opacity)?+x.opacity:100)),...Object.fromEntries(edges.map(e=>[e,Math.min(extent(e)/2,Math.max(0,Number.isFinite(+x?.[e])?+x[e]:180))]))});
let settings={...defaults};try{const saved=localStorage.getItem('smarthue-floor-gradient-v21');if(saved)settings=clean(JSON.parse(saved))}catch{}
const bound=new Set();
const end=e=>{const n=Math.max(.001,settings[e]);return {top:[393,n],bottom:[393,652-n],left:[n,326],right:[786-n,326]}[e]};
function apply(data){
 const floor=data.assets?.find(a=>['floor-surface','reference-floor'].includes(a.id)&&a.layers);if(!floor)return data;
 const rgb=settings.color.match(/\w\w/g).map(x=>parseInt(x,16)/255);data.slots??={};data.slots.floorGradientOpacity={p:{a:0,k:settings.opacity}};
 for(const group of floor.layers[1].shapes.slice(1)){
  const e=group.nm?.replace('floor-gradient-','');if(!edges.includes(e))continue;
  const g=group.it.find(s=>s.ty==='gf'),v=end(e),sid='floorGradient'+e[0].toUpperCase()+e.slice(1)+'End';
  g.e={a:0,k:v,sid};data.slots[sid]={p:{a:0,k:v}};
  g.o=settings[e]===0?{a:0,k:0}:{a:0,k:settings.opacity,sid:'floorGradientOpacity'};
  g.g.k={a:0,k:[0,...rgb,1,...rgb,0,1,1,0]};
 }
 return data;
}
function paint(player){
 for(const g of player.holder.querySelectorAll('linearGradient')){
  let e=g.dataset.floorEdge;
  if(!e){e=edges.find(e=>+g.getAttribute('x1')===starts[e][0]&&+g.getAttribute('y1')===starts[e][1]&&g.children.length===2);if(!e)continue;g.dataset.floorEdge=e}
  const v=end(e);g.setAttribute('x2',v[0]);g.setAttribute('y2',v[1]);
  for(const stop of g.children)stop.setAttribute('stop-color',settings.color);
  for(const path of player.holder.querySelectorAll('path[fill]'))if(path.getAttribute('fill').includes('#'+g.id+')'))path.setAttribute('fill-opacity',settings[e]===0?'0':String(settings.opacity/100));
 }
}
function save(){try{localStorage.setItem('smarthue-floor-gradient-v21',JSON.stringify(settings))}catch{}for(const p of bound)paint(p)}
function download(bytes,name,type){const u=URL.createObjectURL(new Blob([bytes],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
const ui=document.createElement('details');ui.className='floor-controls';ui.open=true;
ui.innerHTML=`<summary>Gradient sàn <span>4 mép mờ</span></summary><div class="floor-controls-grid"><label>Màu mép <input id="floor-color" type="color" value="${settings.color}"><output id="floor-color-value">${settings.color.toUpperCase()}</output></label><label for="floor-opacity">Độ đậm <output id="floor-opacity-value"></output><input id="floor-opacity" type="range" min="0" max="100" step="1"></label>${edges.map(e=>`<label for="floor-${e}">${labels[e]} · độ lan <output id="floor-${e}-value"></output><input id="floor-${e}" type="range" min="0" max="50" step="0.1"></label>`).join('')}</div><div class="floor-controls-actions"><button type="button" id="floor-reset">Mặc định</button><button type="button" id="floor-config">Tải cấu hình</button><button type="button" id="floor-export">Tải Lottie đang chỉnh</button></div><p id="floor-feedback" role="status">Độ lan tính theo % chiều rộng hoặc chiều cao sàn. Chỉnh trực tiếp, không chạy lại animation.</p>`;
document.querySelector('#screens').after(ui);
const $=id=>document.getElementById(id);
function sync(){
 $('floor-color').value=settings.color;$('floor-color-value').textContent=settings.color.toUpperCase();$('floor-opacity').value=settings.opacity;$('floor-opacity-value').textContent=Math.round(settings.opacity)+'%';
 for(const e of edges){const v=settings[e]/extent(e)*100;$('floor-'+e).value=v;$('floor-'+e+'-value').textContent=v.toFixed(1)+'%'}
}
$('floor-color').oninput=e=>{settings.color=e.target.value;sync();save()};$('floor-opacity').oninput=e=>{settings.opacity=+e.target.value;sync();save()};
for(const e of edges)$('floor-'+e).oninput=ev=>{settings[e]=+ev.target.value/100*extent(e);sync();save()};
$('floor-reset').onclick=()=>{settings={...defaults};sync();save();$('floor-feedback').textContent='Đã khôi phục gradient mặc định.'};
$('floor-config').onclick=()=>download(JSON.stringify({version:1,sourceFloor:{width:786,height:652},...settings},null,2),'smarthue-floor-gradient.json','application/json');
$('floor-export').onclick=async()=>{
 const b=$('floor-export');b.disabled=true;
 try{if(!window.floorGradient.currentData)throw Error('Đợi animation tải xong rồi thử lại.');const {data,name}=await window.floorGradient.currentData();const bytes=fflate.zipSync({'manifest.json':fflate.strToU8(JSON.stringify({version:'1.0',animations:[{id:name,loop:false,speed:1}]})),['animations/'+name+'.json']:fflate.strToU8(JSON.stringify(data))},{level:6});download(bytes,name+'-gradient.lottie','application/zip');$('floor-feedback').textContent='Đã tải Lottie của cảnh đang xem với gradient hiện tại.'}catch(e){$('floor-feedback').textContent=e.message}finally{b.disabled=false}
};
sync();
window.floorGradient={apply,bind(player){bound.add(player);paint(player)},getSettings:()=>({...settings}),currentData:null};
const style=document.createElement('style');style.textContent=`.floor-controls{width:calc(100% - 24px);max-width:560px;margin:0 auto 18px;padding:14px 0;border-top:1px solid #353535;color:#d7d7da;font-size:13px}.floor-controls summary{cursor:pointer;font-size:14px;font-weight:600}.floor-controls summary span{font-size:12px;font-weight:400;color:#96969e;margin-left:8px}.floor-controls-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 22px;margin:18px 0}.floor-controls-grid label{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-width:0}.floor-controls-grid output{margin-left:auto;color:#aeb4be;font-variant-numeric:tabular-nums}.floor-controls-grid input[type=range]{width:100%;margin:4px 0 0;accent-color:#83b7ff}.floor-controls-grid input[type=color]{width:32px;height:28px;padding:0;border:0;background:transparent}.floor-controls-actions{display:flex;gap:8px;flex-wrap:wrap}.floor-controls-actions button{font-size:12px;padding:8px 10px}.floor-controls p{margin:12px 0 0;font-size:11px;color:#999fa9;line-height:1.5}`;document.head.appendChild(style);
function resize(){if(parent!==window)parent.postMessage({type:'smarthue-preview-size',height:Math.ceil(document.body.getBoundingClientRect().height)+4},location.origin)}
new ResizeObserver(resize).observe(document.body);ui.addEventListener('toggle',resize);
})();
