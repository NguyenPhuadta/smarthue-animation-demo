"""Validate the Bridge stock files, embedded images, and handoff archive."""
import base64, io, json, zipfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
collection=root/'collections/bridge-connect'
expected={'full':568,'discover':300,'press':76,'press-loop':144,'connected':264,'water-reveal':48,'connected-loop':240,'not-found':180,'timeout':180}
for name,frames in expected.items():
 with zipfile.ZipFile(collection/f'{name}.lottie') as z:
  assert z.testzip() is None
  manifest=json.loads(z.read('manifest.json'))
  assert manifest['animations'][0]['id']==name
  s=json.loads(z.read(f'animations/{name}.json'))
  assert (s['w'],s['h'],s['fr'],s['ip'],s['op'])==(362,362,60,0,frames)
  ids={a['id'] for a in s['assets']}
  for a in s['assets']:
   if 'p' in a:
    assert a['e']==1 and a['p'].startswith('data:image/png;base64,')
    assert base64.b64decode(a['p'].split(',',1)[1]).startswith(b'\x89PNG\r\n\x1a\n')
  for layers in [s['layers']]+[a['layers'] for a in s['assets'] if 'layers' in a]:
   for layer in layers:
    if 'refId' in layer:assert layer['refId'] in ids
catalog=json.loads((root/'stock/catalog.json').read_text())
c=next(c for c in catalog['collections'] if c['id']=='bridge-connect')
for clip,name in zip(c['clips'],['discover','press-loop','connected','water-reveal','connected-loop','not-found','timeout']):
 assert clip['seconds']==expected[name]/60
for v in c['variants']:
 assert (root/v['preview'].split('?')[0]/'index.html').is_file()
 with zipfile.ZipFile(root/v['download']) as z:
  assert z.testzip() is None
  assert 'README.md' in z.namelist() and 'full-app-preview/index.html' in z.namelist()
  assert len([n for n in z.namelist() if n.endswith('.lottie')])==9
  assert not any('/' not in n and n.endswith('.json') for n in z.namelist())
assert (root/c['poster']).is_file()
print('PASS: nine dotLottie manifests, dimensions/FPS/duration, embedded PNGs, composition references, catalog and ZIP.')
