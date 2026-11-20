# SmartHue BLE v3 — stock handoff

362 × 300; 60 FPS; speed 1. Eight animations. Published at Phú’s request on 2026-11-20.

## File sizes — compare the same representation

Raw JSON: original 53,820,763 bytes; v2 18,037,725 bytes; v3 8,128,667 bytes.
V3 is 54.9% smaller than v2 and 84.9% smaller than original.
The eight .lottie containers total 2,270,973 bytes. These contain the same v3
JSON compressed; do not compare their size directly with raw JSON sizes.
Largest .lottie is 445,371 bytes. Largest raw JSON is 2,033,612 bytes.

## What changed

V1 removed repeated legacy end values. V3 retains three-decimal Bezier
coordinate precision from v2. Linear temporal easing is represented with
shorter, mathematically equivalent handles (0,0) and (1,1).

V3 removes sampled Bezier-shape keys only in tracks whose temporal
interpolation is linear, without hold keys or legacy unmatched end values.
Selected shape key records: 2988 → 1066. Unselected/nonlinear tracks
retain their keyframes. FPS is still 60; the runtime interpolates intermediate
frames. This changes the sampled geometry approximation, not playback rate.

The algorithm checks error in vertex and absolute cubic-control coordinates
at every original shape-key time. The measured maximum absolute coordinate
error including rounding is 0.196034 local units, before parent/layer/group
transforms. Do not interpret this as a guaranteed screen-pixel error.
For these piecewise-linear shape tracks, differences are linear between the
original breakpoints, so extrema occur at those breakpoints.

Validation against v1 preserved topology, closed/open flags, original endpoint
times, clip lengths, transforms, images, fonts and other non-shape values,
except the equivalent linear easing representation. No image compression.
This is an approximate candidate, not a lossless replacement for v2.

## Dev integration

Use either json/*.json or lottie/*.lottie (distributed in separate ZIPs).
They contain the same animations. Register fonts/Inter.ttf as Inter/Inter-Bold
for clip 00. Bitmap assets are embedded. Use actual runtime support for your
chosen format; native compatibility has not been verified here.

Intro 00: play first full pass, then loop [20,480) while waiting for Scan Now.
Scan Now: preload 01, fade animation 00 only over 280ms, stop 00 and play 01
from frame 0 at opacity 1. Never auto-advance from the intro in the app.
Success route: 1 → 2 → 5 → 3 → 4. Errors: 1 → 7 and 3 → 8.
Queue BLE state changes until clip completion; repeat complete waiting clips
while awaiting results. No clip 06. Match existing approved integration rules.

## Review and limits

Data validation covers all eight files. The stock preview is:
https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue&variant=362x300&clip=flow
A sampled web render does not certify all-frame visual equivalence or native
performance. No native FPS benchmark has been run. Shape vertex count remains
unchanged: this reduces data and keyframe lookup burden, not every rendering
cost. Phú reviewed the comparison and requested publishing v3 as the default.
Native performance remains unverified.

Build: python3 build.py --tolerance 0.2. Verify: python3 validate.py.
Original files and all earlier handoffs remain available; v2 is retained
as a selectable older variant.
