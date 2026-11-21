const dialog = document.querySelector('dialog');
const canvas = dialog.querySelector('canvas');
const openButton = document.querySelector('#open');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let playbackFrame;

openButton.addEventListener('click', () => dialog.showModal());
dialog.addEventListener('close', () => openButton.focus());
dialog.showModal();
dialog.querySelector('.close').blur();

async function loadAnimation() {
  const [kit, documentData] = await Promise.all([
    window.CanvasKitInit({locateFile: name => 'runtime/' + name}),
    fetch('enhance-mono-v3.json').then(response => {
      if (!response.ok) throw new Error('Animation could not load.');
      return response.json();
    }),
  ]);
  documentData.layers = documentData.layers.filter(layer => layer.nm !== 'Background');
  const files = await Promise.all(documentData.assets.filter(asset => asset.p).map(async asset => {
    const response = await fetch('images/' + asset.p);
    if (!response.ok) throw new Error('A photo could not load.');
    return [asset.p, await response.arrayBuffer()];
  }));
  const animation = kit.MakeManagedAnimation(JSON.stringify(documentData), Object.fromEntries(files));
  const surface = kit.MakeCanvasSurface(canvas);
  if (!animation || !surface) throw new Error('Animation could not start.');
  const drawing = surface.getCanvas();
  const scale = canvas.width / 648;
  const left = canvas.width / 2 - 352 * scale;
  const top = canvas.height / 2 - 364 * scale;
  const region = kit.LTRBRect(left, top, left + documentData.w * scale, top + documentData.h * scale);
  let start;
  function paint(time) {
    if (!dialog.open) return;
    start ??= time;
    const frame = reducedMotion.matches ? 120 : Math.floor((time - start) * documentData.fr / 1000) % documentData.op;
    drawing.clear(kit.TRANSPARENT);
    animation.seekFrame(frame);
    animation.render(drawing, region);
    surface.flush();
    if (!reducedMotion.matches) playbackFrame = requestAnimationFrame(paint);
  }
  openButton.addEventListener('click', () => { start = undefined; playbackFrame = requestAnimationFrame(paint); });
  dialog.addEventListener('close', () => cancelAnimationFrame(playbackFrame));
  if (dialog.open) playbackFrame = requestAnimationFrame(paint);
}
loadAnimation().catch(error => {
  const status = document.querySelector('#error');
  status.textContent = error.message;
  status.hidden = false;
});
