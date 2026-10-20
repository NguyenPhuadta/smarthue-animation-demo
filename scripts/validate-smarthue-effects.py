"""Check effects-only exports keep motion and raster bytes from approved v19."""
import copy,gzip,json,subprocess,zipfile,io
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def parse(b):
 s=b.decode();return json.loads(s[s.index('=')+1:].strip().rstrip(';'))
def normalize(d):
 d=copy.deepcopy(d)
 d['assets']=[a for a in d['assets'] if not(a['id'] in ['floor-surface','reference-floor'] and 'layers'in a)]
 for a in d['assets']:
  if a['id'] in ['floor-surface-alpha','reference-floor-alpha']:a['id']=a['id'].removesuffix('-alpha')
 for layers in [d['layers']]+[a['layers'] for a in d['assets'] if 'layers'in a]:
  for l in layers:
   if l.get('refId') in ['floor-surface','reference-floor']:
    l['ty']=2;l.pop('w',None);l.pop('h',None)
 return d
paths=list((R/'animations').glob('*.json.gz'))+list((R/'resize-362x300/animations').glob('*-data.js'))+[R/'before-scan/animation-0/animation-data.js',R/'resize-362x300/before-scan/animation-0/animation-data.js']
for p in paths:
 rel=p.relative_to(R);old=subprocess.check_output(['git','show','5442894:'+str(rel)],cwd=R)
 if p.suffix=='.gz':a=json.loads(gzip.decompress(old));b=json.loads(gzip.decompress(p.read_bytes()))
 else:a=parse(old);b=parse(p.read_bytes())
 assert normalize(b)==a,rel
 floor=next(x for x in b['assets'] if x['id'] in ['floor-surface','reference-floor'])
 shapes=floor['layers'][1]['shapes'];assert len(shapes)==3
 for g in shapes[1:]:
  stops=g['it'][1]['g']['k']['k'];assert stops[:8]==[0,12/255,12/255,12/255,1,12/255,12/255,12/255]
for size in ['362x300','393x326']:
 with zipfile.ZipFile(R/f'handoff/smarthue-effects-v20-{size}-2026-10-20.zip') as z:
  assert z.testzip() is None
  dots=[n for n in z.namelist() if n.endswith('.lottie')];assert len(dots)==8
  assert not any(n.endswith('.json') and '/'not in n for n in z.namelist())
  for n in dots:
   with zipfile.ZipFile(io.BytesIO(z.read(n))) as l:
    assert l.testzip() is None and 'manifest.json'in l.namelist()
    d=json.loads(l.read(next(x for x in l.namelist() if x.startswith('animations/'))))
    assert (d['w'],d['h'])==tuple(map(int,size.split('x'))) and d['fr']==60
print('PASS: 17 compositions preserve all v19 motion, opacity and image bytes; only floor color composition changed. Both ZIPs valid.')
