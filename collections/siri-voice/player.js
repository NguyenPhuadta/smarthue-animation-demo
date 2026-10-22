(async () => {
'use strict';
const $=id=>document.getElementById(id),q=new URLSearchParams(location.search),clone=x=>JSON.parse(JSON.stringify(x));
document.body.classList.toggle('embed',q.get('embed')==='1');
const original=window.SIRI_ANIMATION;
let source=clone(original),anim,surface,dirty=true,last=0,frame=q.has('frame')?Math.max(0,Math.min(947,Number(q.get('frame'))||0)):0,paused=q.has('frame');
const colorIds=['waveTintColor','rimLeftColor','rimRightColor'],toggleIds=['waveTintAmount','rimTintAmount'];
const hex=rgb=>'#'+rgb.slice(0,3).map(v=>Math.round(Math.max(0,Math.min(1,v))*255).toString(16).padStart(2,'0')).join('');
const rgb=value=>[1,3,5].map(i=>parseInt(value.slice(i,i+2),16)/255).concat(1);
function materialize(doc){const slots=doc.slots||{};function visit(node){if(!node||typeof node!=='object')return;if(node.sid&&slots[node.sid]?.p)Object.assign(node,clone(slots[node.sid].p));for(const [key,value] of Object.entries(node))if(key!=='slots')visit(value)}visit(doc);return doc}
function label(){$('pause').textContent=paused?'Tiếp tục':'Tạm dừng'}
function updateControls(){for(const id of colorIds)$(id).value=hex(source.slots[id].p.k);for(const id of toggleIds)$(id).checked=source.slots[id].p.k>0}
updateControls();label();$('status').textContent='Đang tải Skottie…';
try {
 const ck=await CanvasKitInit({locateFile:()=>"data:application/wasm;base64,"+window.SIRI_CANVASKIT_WASM});
 delete window.SIRI_CANVASKIT_WASM;
 const canvas=document.createElement('canvas');canvas.style.cssText='width:100%;height:100%;display:block';canvas.setAttribute('aria-label','Siri · Sóng sáng 88 × 88');$('animation').appendChild(canvas);
 function resize(){surface?.delete();const dpr=window.devicePixelRatio||1,size=Math.max(1,Math.round($('animation').getBoundingClientRect().width*dpr));canvas.width=size;canvas.height=size;surface=ck.MakeCanvasSurface(canvas);if(!surface)throw Error('Không tạo được canvas Skottie.');dirty=true}
 function createAnimation(){anim?.delete();anim=ck.MakeManagedAnimation(JSON.stringify(source));if(!anim)throw Error('Không đọc được animation.');dirty=true}
 function apply(id){const value=source.slots[id].p.k;if(colorIds.includes(id))anim.setColorSlot(id,ck.Color4f(...value));else anim.setScalarSlot(id,value);dirty=true}
 createAnimation();resize();new ResizeObserver(resize).observe($('animation'));
 for(const id of colorIds)$(id).addEventListener('input',()=>{source.slots[id].p.k=rgb($(id).value);apply(id)});
 for(const id of toggleIds)$(id).addEventListener('change',()=>{source.slots[id].p.k=$(id).checked?100:0;apply(id)});
 $('pause').onclick=()=>{paused=!paused;last=0;label()};
 $('replay').onclick=()=>{paused=false;frame=0;last=0;dirty=true;label()};
 $('seek').oninput=()=>{paused=true;frame=Number($('seek').value);dirty=true;label()};
 $('scale').onchange=()=>{const size=88*Number($('scale').value);$('animation').style.width='min(100%,'+size+'px)';document.querySelector('.stage').style.minHeight=(size+48)+'px';resize()};
 $('reset').onclick=()=>{source=clone(original);updateControls();createAnimation()};
 function tick(ts){if(!paused){if(last)frame=(frame+(ts-last)/1000*60)%948;dirty=true}last=ts;if(dirty&&surface){const ctx=surface.getCanvas();ctx.clear(ck.BLACK);anim.seekFrame(frame);anim.render(ctx,[0,0,canvas.width,canvas.height]);surface.flush();$('seek').value=String(Math.min(947,frame));$('time').textContent=(frame/60).toFixed(2)+' / 15.80 s';dirty=false}requestAnimationFrame(tick)}
 requestAnimationFrame(tick);$('status').textContent='88 × 88 px · 60 FPS · Skottie · Lặp 15,8 giây.';
 $('export').onclick=()=>{const doc=materialize(clone(source)),id='siri-voice-88x88';const bytes=fflate.zipSync({'manifest.json':fflate.strToU8(JSON.stringify({version:'1.0',generator:'Phu Animation Stock',animations:[{id,loop:true,speed:1}]})),['animations/'+id+'.json']:fflate.strToU8(JSON.stringify(doc))},{level:6});const url=URL.createObjectURL(new Blob([bytes],{type:'application/zip'})),a=document.createElement('a');a.href=url;a.download='siri-voice-88x88-custom.lottie';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('status').textContent='Đã tải Lottie 88 × 88 với màu dải sáng và hai viền hiện tại.'};
} catch(e){$('status').textContent='Không tải được Skottie: '+e.message;console.error(e)}
})();
