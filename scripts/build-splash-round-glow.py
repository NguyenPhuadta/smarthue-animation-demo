"""Append a native, 480-frame logo shimmer; keep the approved opening intact."""
import base64
import copy
import json
import zipfile
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'collections/smarthue-splash-v1.5'
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
doc['nm'] = 'SmartHue splash v1.5 · smaller round glow'
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
        layer['ks']['s'] = prop([22.5,22.5,100])
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

# A single canvas-space gradient field is clipped by the complete logo matte.
# Every letter sees the same physical light band, with no per-glyph animation.
for layer in doc['layers']:
    if layer.get('refId','').startswith('glyph-'):
        keys=[k for k in layer['ks']['o']['k'] if k['t']<START]
        keys += [key(START,[100]), key(START+12,[65]),
                 key(END-12,[65]), key(END,[100])]
        layer['ks']['o']={'a':1,'k':keys}

envelope={'a':1,'k':[key(START,[0]),key(START+12,[100]),key(END-12,[100]),key(END,[0])]}
# Render one white logo composition through one soft moving band mask.
# This keeps the mask in canvas coordinates and works without track mattes.
for glyph in glyphs:
    original_id=glyph['refId']
    glyph['refId']='white-'+original_id
    asset=copy.deepcopy(next(a for a in original['assets'] if a['id']==original_id))
    asset.update(id='white-'+original_id,p='white-'+asset['p'])
    doc['assets'].append(asset)

def band_path(center):
    points=[[center-50+30,280],[center+50+30,280],
            [center+50-30,400],[center-50-30,400]]
    return {'c':True,'v':points,'i':[[0,0]]*4,'o':[[0,0]]*4}
paths=[]
for cycle in range(5):
    t=START+cycle*96
    paths += [key(t,[band_path(15)]), key(t+95.999,[band_path(455)])]
paths.append(key(END,[band_path(15)]))
unified=copy.deepcopy(matte)
unified.pop('td',None)
unified['ks']['o']=envelope
unified['hasMask']=True
unified['masksProperties']=[{'inv':False,'mode':'a','pt':{'a':1,'k':paths},
    'o':prop(100),'x':prop(0),'f':prop([24,24])}]
doc['layers']=[unified]+doc['layers']
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
used.update(l.get('refId') for a in doc['assets'] for l in a.get('layers',[]))
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
def soften_glow_edges(data, white=False):
    """Feather the bitmap boundary to remove its visible rectangular cutoff."""
    pos=8; parts=[]; header=None
    while pos<len(data):
        n=struct.unpack('>I',data[pos:pos+4])[0];typ=data[pos+4:pos+8];v=data[pos+8:pos+8+n];pos+=n+12
        if typ==b'IHDR':header=v
        if typ==b'IDAT':parts.append(v)
    w,h,depth,color,_,_,interlace=struct.unpack('>IIBBBBB',header)
    assert (depth,color,interlace)==(8,6,0)
    raw=zlib.decompress(b''.join(parts));stride=w*4;prev=bytearray(stride);encoded_prev=bytearray(stride);rows=[]
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
            if white:
                row[x*4:x*4+3]=b'\xff\xff\xff' if row[x*4+3] else b'\x00\x00\x00'
            else:
                # Isotropic radial falloff, independent of rectangular edges.
                radius=((x-w/2)**2+(y-h/2)**2)**.5/(min(w,h)/2)
                u=max(0,min(1,(radius-.35)/.65))
                row[x*4+3]=round(row[x*4+3]*(1-u*u*(3-2*u)))
                if row[x*4+3]==0:row[x*4:x*4+3]=b'\x00\x00\x00'
        sub=bytearray((row[x]-(row[x-4] if x>=4 else 0))&255 for x in range(stride))
        up=bytearray((row[x]-encoded_prev[x])&255 for x in range(stride))
        paeth_row=bytearray((row[x]-paeth(row[x-4] if x>=4 else 0,encoded_prev[x],encoded_prev[x-4] if x>=4 else 0))&255 for x in range(stride))
        kind,filtered=min(((1,sub),(2,up),(4,paeth_row)),key=lambda pair:sum(min(v,256-v) for v in pair[1]))
        rows.append(bytes([kind])+filtered)
        encoded_prev=row
    def chunk(k,v):return struct.pack('>I',len(v))+k+v+struct.pack('>I',zlib.crc32(k+v)&0xffffffff)
    return b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',header)+chunk(b'IDAT',zlib.compress(b''.join(rows),9))+chunk(b'IEND',b'')
images={n:optimize_png(soften_glow_edges(v) if n=='images/glow.png' else v) for n,v in images.items()}
for n,v in list(images.items()):
    if Path(n).name.startswith('glyph-'):
        images['images/white-'+Path(n).name]=optimize_png(soften_glow_edges(v,white=True))
name = 'smarthue-splash-466x678-v1.5.0.lottie'
with zipfile.ZipFile(OUT / name, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    z.writestr('manifest.json', json.dumps({'version':'1.0','generator':'SmartHue handoff','animations':[{'id':'splash','speed':1,'loop':False}]}))
    z.writestr('animations/splash.json', json.dumps(doc,separators=(',',':')))
    for n, data in images.items():
        z.writestr(n, data)
data = {'466x678': {'animation':doc, 'assets':{Path(n).name:base64.b64encode(v).decode() for n,v in images.items()}}}
(OUT / 'animation-data.js').write_text('window.SPLASH_DATA='+json.dumps(data,separators=(',',':'))+';\n')
print(name, (OUT / name).stat().st_size, 'bytes; shimmer:', (END-START)/60, 'seconds')
