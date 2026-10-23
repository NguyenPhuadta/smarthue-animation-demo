"""Read actual .lottie byte lengths from versioned handoff ZIPs into the catalog."""
import json, zipfile
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
path = ROOT / 'stock/catalog.json'
catalog = json.loads(path.read_text())
bridge = {0:'discover.lottie',1:'press-loop.lottie',2:'connected.lottie',3:'water-reveal.lottie',4:'connected-loop.lottie',5:'not-found.lottie',6:'timeout.lottie'}
for collection in catalog['collections']:
    for variant in collection['variants']:
        with zipfile.ZipFile(ROOT / variant['download']) as archive:
            entries = {x.filename:x.file_size for x in archive.infolist() if '/' not in x.filename and x.filename.endswith('.lottie')}
            sizes = {}
            for clip in collection['clips']:
                cid, name = clip['id'], collection['id']
                if name == 'smarthue':
                    matches = [f for f in entries if f.startswith(f'{cid:02d}-')]
                elif name == 'bridge-connect': matches = [bridge[cid]]
                elif name == 'liquid-halo': matches = [f"liquid-halo-{variant['id'].split('x')[0]}.lottie"]
                else: matches = [f for f in entries if f"-{variant['id']}-" in f]
                if len(matches) != 1: raise ValueError((name,variant['id'],cid,matches))
                sizes[str(cid)] = entries[matches[0]]
            variant['clipBytes'] = sizes
            variant['packageBytes'] = (ROOT / variant['download']).stat().st_size
            if 'full.lottie' in entries: variant['flowBytes'] = entries['full.lottie']
            elif len(sizes) == 1: variant['flowBytes'] = next(iter(sizes.values()))
path.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
print('Updated actual file sizes for every clip and variant')
