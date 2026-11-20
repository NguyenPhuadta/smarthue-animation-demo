"""Append a native, 480-frame logo shimmer; keep the approved opening intact."""
import base64
import copy
import json
import zipfile
import struct
import zlib
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'collections/smarthue-splash-v1.3'
START, END = 282, 762

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
doc['nm'] = 'SmartHue splash v1.3 · continuous high contrast shimmer'
for layer in doc['layers']:
    layer['op'] = END

def freeze(value):
    if isinstance(value, dict):
        if value.get('a') == 1 and isinstance(value.get('k'), list):
            last = value['k'][-1]['s']
            return prop(last[0] if len(last) == 1 else last)
        return {k:freeze(v) for k,v in value.items()}
    if isinstance(value, list):
        return [freeze(v) for v in value]
    return value

def fade(start, end):
    return {'a':1, 'k':[
        {'t':start,'s':[0],'o':{'x':.42,'y':0},'i':{'x':.58,'y':1}},
        {'t':end,'s':[100]}]}

for layer in doc['layers']:
    if layer['ind'] == 100:
        layer['ks'] = freeze(layer['ks'])
        layer['shapes'] = freeze(layer['shapes'])
        layer['ks']['o'] = fade(156,264)
        layer['nm'] = 'Dome · static rim / smooth fade in'
    if layer['ind'] == 101:
        layer['ks'] = freeze(layer['ks'])
        layer['ks']['o'] = fade(210,282)
        layer['nm'] = 'Glow · smooth fade in / hold'

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
# Animate the actual letters as well as a screen-blended highlight. This avoids
# relying on track-matte support and remains visible on the white glyphs.
doc['assets'] = [a for a in doc['assets'] if a['id'] != 'shimmer-glyph-matte']
highlights = []
for index, glyph in enumerate(glyphs):
    base = next(l for l in doc['layers'] if l.get('refId') == glyph['refId'])
    base_keys = base['ks']['o']['k']
    base_keys = [k for k in base_keys if k['t'] < START]
    light_keys = []
    for t in range(START, END+1, 4):
        envelope = min(1, (t-START)/12, (END-t)/12)
        wave = (1+math.cos(2*math.pi*((t-START)/80-index/8)))/2
        base_keys.append(key(t,[100-envelope*60*(1-wave)]))
        light_keys.append(key(t,[envelope*100*wave]))
    base['ks']['o'] = {'a':1,'k':base_keys}
    highlight = copy.deepcopy(glyph)
    highlight.update(ind=300+index, ip=START, op=END, bm=2)
    highlight['ks']['o'] = {'a':1,'k':light_keys}
    highlights.append(highlight)
doc['layers'] = highlights + doc['layers']
doc['markers'] = doc.get('markers', []) + [
    {'tm':START, 'cm':'app-load-shimmer-start', 'dr':480},
    {'tm':END, 'cm':'app-load-shimmer-complete', 'dr':0}]

def compact(value):
    if isinstance(value, dict):
        if value.get('a') == 1 and isinstance(value.get('k'), list):
            keys = value['k']
            if keys and all(k.get('s') == keys[0].get('s') for k in keys) and not any('to' in k or 'ti' in k for k in keys):
                s = keys[0]['s']
                # Retain array-valued property types, including 1D key values.
                return {'a':0, 'k':s[0] if len(s)==1 else compact(s)}
        result = {k:compact(v) for k,v in value.items() if k != 'nm'}
        if 't' in value and 's' in value and 'i' in value and 'o' in value:
            if all(value[h].get('x') == value[h].get('y') for h in ('i','o')):
                result['i']={'x':1,'y':1}; result['o']={'x':0,'y':0}
        return result
    if isinstance(value, list):return [compact(v) for v in value]
    if isinstance(value, float):
        v=round(value,4)
        return int(v) if v==int(v) else v
    return value

doc=compact(doc)
# dome.png is a historical raster not referenced by the native vector dome.
used={l.get('refId') for l in doc['layers']}
doc['assets']=[a for a in doc['assets'] if 'p' not in a or a['id'] in used]
paths={a['p'] for a in doc['assets'] if 'p' in a}
images={n:v for n,v in images.items() if Path(n).name in paths}

def optimize_png(data):
    """Repack original PNG filter stream losslessly (no pixel conversion)."""
    chunks=[]; compressed=[]; pos=8
    while pos<len(data):
        size=struct.unpack('>I',data[pos:pos+4])[0]; kind=data[pos+4:pos+8]
        payload=data[pos+8:pos+8+size];pos+=12+size
        if kind==b'IDAT':compressed.append(payload)
        else:chunks.append((kind,payload))
    raw=zlib.decompress(b''.join(compressed))
    best=min((zlib.compress(raw,level) for level in (6,9)),key=len)
    def chunk(kind,payload):
        return struct.pack('>I',len(payload))+kind+payload+struct.pack('>I',zlib.crc32(kind+payload)&0xffffffff)
    out=b'\x89PNG\r\n\x1a\n'
    for kind,payload in chunks:
        if kind==b'IEND':out+=chunk(b'IDAT',best)
        out+=chunk(kind,payload)
    assert zlib.decompress(best)==raw
    return out if len(out)<len(data) else data
def soften_glow_edges(data):
    """Feather the bitmap boundary to remove its visible rectangular cutoff."""
    pos=8; parts=[]; header=None
    while pos<len(data):
        n=struct.unpack('>I',data[pos:pos+4])[0];typ=data[pos+4:pos+8];v=data[pos+8:pos+8+n];pos+=n+12
        if typ==b'IHDR':header=v
        if typ==b'IDAT':parts.append(v)
    w,h,depth,color,_,_,interlace=struct.unpack('>IIBBBBB',header)
    assert (depth,color,interlace)==(8,6,0)
    raw=zlib.decompress(b''.join(parts));stride=w*4;prev=bytearray(stride);rows=[]
    def paeth(a,b,c):
        p=a+b-c;pa=abs(p-a);pb=abs(p-b);pc=abs(p-c)
        return a if pa<=pb and pa<=pc else b if pb<=pc else c
    for y in range(h):
        f=raw[y*(stride+1)];row=bytearray(raw[y*(stride+1)+1:(y+1)*(stride+1)])
        for x in range(stride):
            a=row[x-4] if x>=4 else 0;b=prev[x];c=prev[x-4] if x>=4 else 0
            predictor=(0,a,b,(a+b)//2,paeth(a,b,c))[f]
            row[x]=(row[x]+predictor)&255
        prev=bytearray(row)
        for x in range(w):
            edge=min(x,w-1-x,y,h-1-y)
            u=min(1,edge/120)
            row[x*4+3]=round(row[x*4+3]*u*u*(3-2*u))
        # Sub filtering keeps the feathered image compact.
        filtered=bytearray((row[x]-(row[x-4] if x>=4 else 0))&255 for x in range(stride))
        rows.append(b'\x01'+filtered)
    def chunk(k,v):return struct.pack('>I',len(v))+k+v+struct.pack('>I',zlib.crc32(k+v)&0xffffffff)
    return b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',header)+chunk(b'IDAT',zlib.compress(b''.join(rows),9))+chunk(b'IEND',b'')
images={n:optimize_png(soften_glow_edges(v) if n=='images/glow.png' else v) for n,v in images.items()}
name = 'smarthue-splash-466x678-v1.3.0.lottie'
with zipfile.ZipFile(OUT / name, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    z.writestr('manifest.json', json.dumps({'version':'1.0','generator':'SmartHue handoff','animations':[{'id':'splash','speed':1,'loop':False}]}))
    z.writestr('animations/splash.json', json.dumps(doc,separators=(',',':')))
    for n, data in images.items():
        z.writestr(n, data)
data = {'466x678': {'animation':doc, 'assets':{Path(n).name:base64.b64encode(v).decode() for n,v in images.items()}}}
(OUT / 'animation-data.js').write_text('window.SPLASH_DATA='+json.dumps(data,separators=(',',':'))+';\n')
print(name, (OUT / name).stat().st_size, 'bytes; shimmer:', (END-START)/60, 'seconds')
