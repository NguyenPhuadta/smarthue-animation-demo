function stockSurface(ck,canvas){if(new URLSearchParams(location.search).get('renderer')==='software')return ck.MakeSWCanvasSurface(canvas);try{const probe=document.createElement('canvas'),gl=probe.getContext('webgl2')||probe.getContext('webgl');if(gl){gl.getExtension('WEBGL_lose_context')?.loseContext();return ck.MakeCanvasSurface(canvas)}}catch(error){console.warn('WebGL unavailable; using software Skottie',error)}return ck.MakeSWCanvasSurface(canvas)}
(async()=>{
 const $=id=>document.getElementById(id),q=new URLSearchParams(location.search);
 document.body.classList.toggle('embed',q.get('embed')==='1');
 try{
  if(q.get('mode')==='single'&&q.get('state')!=='0')throw Error('Bộ này chỉ có clip 0');
  const ck=await CanvasKitInit({locateFile:()=> 'data:application/wasm;base64,'+window.SIRI_CANVASKIT_WASM}),data=window.ROOM_DATA,doc=data.animation,renderDoc=JSON.parse(JSON.stringify(doc));
  for(const a of renderDoc.assets)if(a.p&&data.assets[a.p]){a.p='data:'+(a.p.endsWith('.jpg')?'image/jpeg':'image/png')+';base64,'+data.assets[a.p];a.u='';a.e=1}
  const fonts={'SFPro-Bold.ttf':Uint8Array.from(atob(data.font),c=>c.charCodeAt(0))};
  const anim=ck.MakeManagedAnimation(JSON.stringify(renderDoc),fonts);if(!anim)throw Error('Không đọc được animation');
  const canvas=$('canvas');canvas.width=doc.w;canvas.height=doc.h;canvas.style.width=doc.w+'px';
  const surface=stockSurface(ck,canvas);if(!surface)throw Error('Không tạo được canvas');
  let frame=q.has('frame')?Math.max(0,Math.min(539,Number(q.get('frame'))||0)):0,paused=q.has('frame'),last=performance.now();
  function render(){surface.getCanvas().clear(ck.TRANSPARENT);anim.seekFrame(frame);anim.render(surface.getCanvas(),ck.LTRBRect(0,0,doc.w,doc.h));surface.flush();$('pause').textContent=paused?'Tiếp tục':'Tạm dừng';$('seek').value=Math.floor(frame);$('time').textContent=(frame/60).toFixed(2)+' / 9,00s'}
  $('replay').onclick=()=>{frame=0;paused=false;last=performance.now();render()};
  $('pause').onclick=()=>{paused=!paused;last=performance.now();render()};
  $('seek').oninput=()=>{frame=+$('seek').value;paused=true;render()};
  function tick(now){if(!paused){frame=(frame+Math.max(0,now-last)*.06)%540;render()}last=now;requestAnimationFrame(tick)}
  render();requestAnimationFrame(tick);$('status').textContent=doc.w+' × '+doc.h+' px · 60 FPS · 9 giây · Lặp liên tục';
  const report=()=>{if(parent!==window)parent.postMessage({type:'smarthue-preview-size',height:document.documentElement.scrollHeight},location.origin==='null'?'*':location.origin)};new ResizeObserver(report).observe(document.body);report();
 }catch(e){$('status').textContent='Lỗi: '+e.message;console.error(e)}
})();
