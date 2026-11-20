"""Append a native, 480-frame logo shimmer; keep the approved opening intact."""
import base64
import copy
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'collections/smarthue-splash-v1.1'
START, END = 642, 1122

def prop(value):
    return {'a': 0, 'k': value}

def key(t, value):
    return {'t': t, 's': value, 'o': {'x': 0, 'y': 0}, 'i': {'x': 1, 'y': 1}}

identity = {k: prop(v) for k, v in dict(p=[0,0,0], a=[0,0,0], s=[100,100,100], r=0, o=100).items()}
source = ROOT / 'collections/smarthue-splash/smarthue-splash-466x678-v1.0.0.lottie'
with zipfile.ZipFile(source) as z:
    original = json.loads(z.read('animations/splash.json'))
    images = {n: z.read(n) for n in z.namelist() if n.startswith('images/')}

doc = copy.deepcopy(original)
doc['op'] = END
doc['nm'] = 'SmartHue splash v1.1 · original 10.7s + native shimmer 8s'
for layer in doc['layers']:
    layer['op'] = END

# Alpha matte reuses the original glyph PNGs at their final transforms.
glyphs = []
for source_layer in original['layers']:
    if not source_layer.get('refId', '').startswith('glyph-'):
        continue
    layer = copy.deepcopy(source_layer)
    layer.update(ip=0, op=END, st=0)
    for name, value in layer['ks'].items():
        if value.get('a') == 1:
            final = value['k'][-1]['s']
            layer['ks'][name] = prop(final[0] if name in ('r', 'o') else final)
    glyphs.append(layer)
doc['assets'].append({'id': 'shimmer-glyph-matte', 'w':466, 'h':678, 'layers':glyphs})
matte = {'ty':0, 'ind':300, 'nm':'Shimmer · logo alpha matte', 'refId':'shimmer-glyph-matte',
         'w':466, 'h':678, 'ip':START, 'op':END, 'st':0, 'sr':1, 'td':1, 'ks':copy.deepcopy(identity)}

# Four two-second diagonal sweeps, fully outside the logo at every boundary.
positions = []
for cycle in range(4):
    t = START + cycle * 120
    positions.extend([key(t, [55,339,0]), key(t+108, [410,339,0]),
                      dict(t=t+120, s=[410,339,0], h=1)])
    if cycle < 3:
        positions[-1] = dict(t=t+119.999, s=[410,339,0], h=1)
ks = copy.deepcopy(identity)
ks['p'] = {'a':1, 'k':positions}
shimmer = {'ty':4, 'ind':301, 'nm':'Shimmer · four soft sweeps / 8 seconds',
           'ip':START, 'op':END, 'st':0, 'sr':1, 'tt':1, 'bm':2, 'ks':ks,
           'shapes':[
               {'ty':'rc', 'd':1, 's':prop([140,110]), 'p':prop([0,0]), 'r':prop(0)},
               {'ty':'gf', 'o':prop(100), 'r':1, 't':1, 's':prop([-62,0]), 'e':prop([62,0]),
                'g':{'p':3, 'k':prop([0,1,.86,.82, .5,1,1,1, 1,1,.86,.82, 0,0, .5,.62, 1,0])}},
               {'ty':'tr','p':prop([0,0]),'a':prop([0,0]),'s':prop([100,100]),'r':prop(-16),'o':prop(100),'sk':prop(0),'sa':prop(0)}]}
doc['layers'] = [matte, shimmer] + doc['layers']
doc['markers'] = doc.get('markers', []) + [
    {'tm':START, 'cm':'app-load-shimmer-start', 'dr':480},
    {'tm':END, 'cm':'app-load-shimmer-complete', 'dr':0}]

name = 'smarthue-splash-466x678-v1.1.0.lottie'
with zipfile.ZipFile(OUT / name, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    z.writestr('manifest.json', json.dumps({'version':'1.0','generator':'SmartHue handoff','animations':[{'id':'splash','speed':1,'loop':False}]}))
    z.writestr('animations/splash.json', json.dumps(doc,separators=(',',':')))
    for n, data in images.items():
        z.writestr(n, data)
data = {'466x678': {'animation':doc, 'assets':{Path(n).name:base64.b64encode(v).decode() for n,v in images.items()}}}
(OUT / 'animation-data.js').write_text('window.SPLASH_DATA='+json.dumps(data,separators=(',',':'))+';\n')
print(name, (OUT / name).stat().st_size, 'bytes; shimmer:', (END-START)/60, 'seconds')
