async function startPlayer() {
  const canvas = document.querySelector('canvas');
  const status = document.querySelector('#status');
  const play = document.querySelector('#play');
  const replay = document.querySelector('#replay');
  const seek = document.querySelector('#seek');
  const time = document.querySelector('#time');
  const runtime = new URL('runtime/', location.href);
  const [kit, doc] = await Promise.all([
    CanvasKitInit({locateFile: file => new URL(file, runtime).href}),
    fetch('photo-restore.json').then(response => response.json()),
  ]);
  const imageEntries = await Promise.all(doc.assets.filter(asset => asset.p).map(async asset => {
    const response = await fetch('images/' + asset.p);
    if (!response.ok) throw new Error('Không tải được ảnh animation.');
    return [asset.p, await response.arrayBuffer()];
  }));
  const animation = kit.MakeManagedAnimation(JSON.stringify(doc), Object.fromEntries(imageEntries));
  const surface = kit.MakeCanvasSurface(canvas);
  if (!animation || !surface) throw new Error('Không mở được animation.');
  const drawing = surface.getCanvas();
  const bounds = kit.LTRBRect(0, 0, canvas.width, canvas.height);
  let frame = 0;
  let started = performance.now();
  let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tickId;
  function paint() {
    drawing.clear(kit.TRANSPARENT);
    animation.seekFrame(frame);
    animation.render(drawing, bounds);
    surface.flush();
    seek.value = frame;
    time.value = (frame / doc.fr).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' s';
  }
  function tick(now) {
    frame = Math.floor((now - started) * doc.fr / 1000) % doc.op;
    paint();
    tickId = requestAnimationFrame(tick);
  }
  function setPlaying(active) {
    cancelAnimationFrame(tickId);
    playing = active;
    play.textContent = active ? 'Tạm dừng' : 'Phát';
    if (active) {
      started = performance.now() - frame * 1000 / doc.fr;
      tickId = requestAnimationFrame(tick);
    }
  }
  play.onclick = () => setPlaying(!playing);
  replay.onclick = () => { frame = 0; paint(); setPlaying(true); };
  seek.oninput = () => { setPlaying(false); frame = Number(seek.value); paint(); };
  for (const control of [play, replay, seek]) control.disabled = false;
  seek.max = doc.op - 1;
  status.hidden = true;
  if (!playing) frame = 100;
  paint();
  setPlaying(playing);
}
startPlayer().catch(error => { document.querySelector('#status').textContent = error.message; });
