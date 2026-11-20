"""Cut the approved Siri room timeline to off/on only, preserving those tracks."""
import base64
import copy
import json
from pathlib import Path
import zipfile

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'collections/smarthue-voice-room'
OUT=ROOT/'collections/smarthue-voice-room-on-off'
CUT, END=144,396
SOURCES={
    '466x444':SOURCE/'smarthue-voice-room-466x444-v1.2.0.lottie',
    '951x669':SOURCE/'951x669/smarthue-voice-room-951x669-v1.2.0.lottie',
    '473x669':SOURCE/'smarthue-voice-room-473x669-v1.0.0.lottie',
}

def retime(x):
    if isinstance(x,list):return [retime(v) for v in x]
    if not isinstance(x,dict):return x
    result={k:retime(v) for k,v in x.items() if k!='markers'}
    if x.get('a')==1 and isinstance(x.get('k'),list) and x['k'] and 't' in x['k'][0]:
        keys=x['k'];before=[k for k in keys if k['t']<=CUT]
        after=[k for k in keys if k['t']>CUT]
        boundary=copy.deepcopy(before[-1] if before else keys[0])
        if boundary['t']!=CUT and after:
            assert boundary.get('s')==after[0].get('s'), 'Cut crosses a changing track'
        boundary['t']=0
        result['k']=[boundary]+[dict(copy.deepcopy(k),t=k['t']-CUT) for k in after]
    if 'ty' in x and 'ip' in x and 'op' in x:
        result['ip']=max(0,x['ip']-CUT)
        result['op']=min(END,x['op']-CUT)
        # Original retained layers start at zero, so their local key times are
        # shifted explicitly rather than applying a second start-time offset.
        assert x.get('st',0)==0
    return result

report={}
for size,source in SOURCES.items():
    with zipfile.ZipFile(source) as z:
        doc=json.loads(z.read('animations/room.json'))
        resources={n:z.read(n) for n in z.namelist() if n.startswith(('images/','fonts/'))}
    removed=[l for l in doc['layers'] if l.get('refId') in ('chill-caption','room-purple') or l.get('nm','').startswith('chill ')]
    doc['layers']=[l for l in doc['layers'] if l not in removed]
    used={l.get('refId') for l in doc['layers']}
    for a in doc['assets']:
        if a['id'] in used:
            used.update(l.get('refId') for l in a.get('layers',[]))
    doc['assets']=[a for a in doc['assets'] if a['id'] in used]
    original_kept=copy.deepcopy(doc)
    doc=retime(doc)
    doc.update(ip=0,op=END,nm='SmartHue Siri · warm → off → on · 6.6s loop')
    doc['markers']=[
        {'tm':0,'dr':36,'cm':'Warm room / pause before turn off'},
        {'tm':36,'dr':90,'cm':'Turn lights off — greeting first'},
        {'tm':126,'dr':36,'cm':'Warm to dark'},
        {'tm':162,'dr':36,'cm':'Dark room / pause before turn on'},
        {'tm':198,'dr':123,'cm':'Turn lights on — greeting first'},
        {'tm':321,'dr':57,'cm':'Dark to warm / exact opening image'},
        {'tm':378,'dr':18,'cm':'Warm room / loop seam'},
    ]
    paths={'images/'+a['p'] for a in doc['assets'] if 'p' in a}
    resources={n:v for n,v in resources.items() if n in paths or n.startswith('fonts/')}
    out=OUT if size=='466x444' else OUT/size
    out.mkdir(parents=True,exist_ok=True)
    name=f'smarthue-voice-room-on-off-{size}-v2.0.0.lottie'
    with zipfile.ZipFile(out/name,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        z.writestr('manifest.json',json.dumps({'version':'1.0','generator':'SmartHue native Lottie','animations':[{'id':'room','loop':True,'speed':1}]}))
        z.writestr('animations/room.json',json.dumps(doc,separators=(',',':')))
        for n,v in resources.items():z.writestr(n,v)
    preview={'animation':doc,'assets':{Path(n).name:base64.b64encode(v).decode() for n,v in resources.items() if n.startswith('images/')},'font':base64.b64encode(resources['fonts/SFPro-Bold.ttf']).decode()}
    (out/'animation-data.js').write_text('window.ROOM_DATA='+json.dumps(preview,separators=(',',':'))+';\n')
    srcdir=SOURCE if size=='466x444' else SOURCE/size
    html=(srcdir/'index.html').read_text()
    oldname=source.name
    html=html.replace(oldname,name).replace('9 giây','6,6 giây').replace('max="539"','max="395"')
    # Existing variant previews share runtime files from the parent directory.
    (out/'index.html').write_text(html.replace('v=1.2.0','v=2.0.0').replace('v=1.0.0','v=2.0.0'))
    text=json.dumps(doc,ensure_ascii=False).lower()
    assert 'chill' not in text and 'room-purple' not in text
    assert doc['fr']==60 and doc['op']/doc['fr']==6.6
    assert len(removed)==3
    report[size]={'file':name,'bytes':(out/name).stat().st_size,'frames':END,'seconds':6.6,'removedLayers':[l['nm'] for l in removed]}

for name in ('canvaskit.js','canvaskit-wasm-data.js','canvaskit-LICENSE.txt'):
    (OUT/name).write_bytes((SOURCE/name).read_bytes())
player=(SOURCE/'player.js').read_text().replace('539','395').replace('%540','%396').replace('9,00s','6,60s').replace('9 giây','6,6 giây')
(OUT/'player.js').write_text(player)
(OUT/'build-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
