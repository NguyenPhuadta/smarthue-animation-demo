# SmartHue BLE JSON v2 — stock handoff

362 × 300; 60 FPS; speed 1. Eight standalone JSON files with embedded images.

Raw JSON: original 53,820,763 bytes → v1 29,034,813 bytes → v2 18,037,725 bytes.
V2 is 37.9% smaller than v1 and 66.5% smaller than original.

## Changes

V1 removed redundant legacy end values identical to the next start value.
V2 additionally rounds only Bezier shape vertex coordinates and relative
in/out tangents to three decimal places. Maximum measured per-coordinate
error: 0.000500000000003 in local shape units, before layer/parent transforms.
This is a precision approximation, not a lossless copy.

Structural comparison against v1 confirms all other fields, 15,517 keyframe
records, timing, easing, transforms, 60 FPS metadata, shape topology and all
48 embedded image entries are unchanged. Bitmap strings are byte-identical.
Source originals and v1 handoffs are preserved.

## Integration

Load files in json/ directly in the app's Lottie runtime. Bitmap assets are embedded. Register fonts/Inter.ttf as Inter / Inter-Bold
for clip 00 text; native font resolution has not been verified. No web scripts
or workers are needed for native integration.
Clip 00 waits for Scan Now; after its first run, loop frames [20,480).
On Scan Now: preload clip 01, fade only animation 00 over 280ms, stop it,
then start clip 01 at frame 0 with opacity 1. Never auto-advance from 00.
Success route: 1 → 2 → 5 → 3 → 4; errors: 1 → 7 and 3 → 8.
If BLE is pending, repeat the entire waiting clip; queue state changes
until completion. Do not copy demo-wide sequencing loops into the app.
Preserve approved full-clip playback and app-controlled state transitions.

## Validation limits

Data bounds were measured against v1; one sample of Search at frame 120 was
rendered beside the original using lottie-web SVG. This is not an exhaustive
visual/motion check or native runtime certification. No native FPS profile
has been run. The number of path vertices and animated keyframes is unchanged,
so smaller JSON does not establish reduced per-frame rendering cost.
Stock preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue&variant=362x300&clip=flow
Developer ZIP contains standalone JSON, the Inter font, README and reports.
This package is intended for native integration, not an offline web preview.

Rebuild files with python3 build.py; compare field/precision invariants with
python3 validate.py. Then visually review on the actual app runtime before
replacing production assets.
