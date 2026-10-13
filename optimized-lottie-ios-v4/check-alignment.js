/* Live positioning of the supplied check.svg; exports use native transforms. */
(() => {
 const KEY='lamp-distance-check-alignment-v3',DEFAULT={x:178.59375,y:280.3359375,scale:122};
 const bounds={x:[-50,443],y:[-50,376],scale:[10,200]};
 let settings=read(),active=null,panel=null,stage=null,handle=null,onEdit=()=>{};
 function normalize(value) {
  const result={};for(const key of Object.keys(DEFAULT)){
   const n=Number(value?.[key]);result[key]=Number.isFinite(n)?Math.max(bounds[key][0],Math.min(bounds[key][1],n)):DEFAULT[key];
  }return result;
 }
 function read(){try{return normalize(JSON.parse(localStorage.getItem(KEY))||DEFAULT)}catch{return {...DEFAULT}}}
 function download(value,name,type='application/json'){
  const url=URL.createObjectURL(value instanceof Blob?value:new Blob([JSON.stringify(value,null,2)],{type}));
  const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
 }
 function apply(data,chosen=read()){
  const value=normalize(chosen);
  for(const layers of [data.layers,...(data.assets||[]).filter(a=>a.layers).map(a=>a.layers)]){
   for(const layer of layers.filter(l=>l.nm?.startsWith('Distance proximity'))){
    const parent=layers.find(l=>l.ind===layer.parent),p=parent?.ks.p.k||[0,0,0];
    layer.ks.p={a:0,k:[value.x-p[0],value.y-p[1],0]};layer.ks.s={a:0,k:[value.scale,value.scale,100]};
   }
  }return data;
 }
 function sync(){
  if(panel)for(const input of panel.querySelectorAll('[data-check-field]'))input.value=Number(settings[input.dataset.checkField].toFixed(1));
  if(active){
   const {wrapper,base}=active,ratio=settings.scale/base.scale;
   wrapper.setAttribute('transform',`matrix(${ratio} 0 0 ${ratio} ${settings.x-base.x*ratio} ${settings.y-base.y*ratio})`);
  }
  if(handle){
   const alpha=active?.element.finalTransform?.mProp.o.v??1;
   handle.hidden=!(panel?.open&&active&&alpha>.01);
   handle.style.left=(settings.x/393*100)+'%';handle.style.top=(settings.y/326*100)+'%';
   handle.style.width=(39*settings.scale/100/393*100)+'%';handle.style.height=(50*settings.scale/100/326*100)+'%';
  }
  if(panel)for(const input of panel.querySelectorAll('[data-check-field]'))input.disabled=!active;
 }
 function update(value){
  settings=normalize(value);let saved=false;try{localStorage.setItem(KEY,JSON.stringify(settings));saved=true}catch{}
  sync();if(panel)panel.querySelector('#check-note').textContent=saved?'Đã lưu vị trí và kích thước trên máy.':'Vị trí và kích thước đã cập nhật.';
 }
 function prepare(){
  if(active){active.animation.pause();active.animation.goToAndStop(0,true)}onEdit();
 }
 function attach(animation){
  if(active)active.animation.removeEventListener('drawnFrame',sync);
  active=null;settings=read();
  const element=animation.renderer.elements.find(e=>e?.data.nm?.startsWith('Distance proximity'));
  if(element){
   const layers=animation.animationData.layers,layer=element.data,parent=layers.find(l=>l.ind===layer.parent),p=parent?.ks.p.k||[0,0,0];
   const wrapper=document.createElementNS('http://www.w3.org/2000/svg','g');wrapper.dataset.checkAlignment='true';
   element.layerElement.parentNode.insertBefore(wrapper,element.layerElement);wrapper.appendChild(element.layerElement);
   active={animation,element,wrapper,base:{x:layer.ks.p.k[0]+p[0],y:layer.ks.p.k[1]+p[1],scale:layer.ks.s.k[0]}};
   animation.addEventListener('drawnFrame',sync);
  }sync();
 }
 function mount({root,container,onChange}){
  panel=root;stage=container;onEdit=onChange||(()=>{});
  handle=document.createElement('div');handle.id='check-drag-handle';handle.hidden=true;handle.title='Kéo để căn icon';
  stage.appendChild(handle);panel.addEventListener('toggle',sync);
  for(const input of panel.querySelectorAll('[data-check-field]'))input.addEventListener('input',()=>{
   if(input.value==='')return;const field=input.dataset.checkField,value=Number(input.value);
   prepare();update({...settings,[field]:value});
  });
  panel.querySelector('#check-reset').onclick=()=>{prepare();update(DEFAULT)};
  panel.querySelector('#check-settings').onclick=()=>download({asset:'check.svg',...settings},'check-alignment.json');
  let drag=null;
  handle.addEventListener('pointerdown',event=>{
   event.preventDefault();prepare();handle.setPointerCapture(event.pointerId);
   drag={id:event.pointerId,x:event.clientX,y:event.clientY,start:{...settings}};
  });
  handle.addEventListener('pointermove',event=>{
   if(!drag||event.pointerId!==drag.id)return;
   const rect=stage.getBoundingClientRect();
   update({...drag.start,x:drag.start.x+(event.clientX-drag.x)*393/rect.width,y:drag.start.y+(event.clientY-drag.y)*326/rect.height});
  });
  const end=()=>{drag=null};handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);
  sync();
 }
 window.distanceCheckAlignment={read,apply,mount,attach,get:()=>({...settings}),download};
})();
