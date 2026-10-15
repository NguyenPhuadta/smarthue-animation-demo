# Bridge Connect — v1.0.0-362x362-2026-10-15

Canvas **362 × 362 px**, **60 FPS**, speed **1.0**. Transparent background; no opaque floor, text or success icons. Water lines and blue underglow are authored effects. Original PNG bytes are embedded losslessly in every .lottie. No external fonts.

| File | Duration | Frames |
| --- | --- | --- |
| full.lottie | 9.46667s | 568 |
| discover.lottie | 5s | 300 |
| press.lottie | 1.26667s | 76 |
| connected.lottie | 4.4s | 264 |
| water-reveal.lottie | 0.8s | 48 |
| connected-loop.lottie | 4s | 240 |

## Integration and playback

Discover (loop) → water-reveal (once) → press (once) → connected (entry once, sustain loop).
- Discover loops [0,300). On leaving it for press, finish the current loop and play water-reveal [0,48) once.
- Press ends at frame 76 exclusive. Switch immediately to connected frame 0, preserving its compressed pose. LED lights on contact; the rebound takes 9 frames and glow spreads during that rebound. No waiting/reset tail.
- Connected plays [0,24) once, then loops [24,264). Never repeat the impact/entry on every loop.
- connected-loop.lottie is sustain only: loop [0,240). Use it when the app cannot loop a segment.
- full.lottie plays [0,568) once (9.466667s) and holds the final frame. This compact demo shortens the success hold; it is not a seamless loop.
- Single press preview intentionally stops at contact; the full preview demonstrates its immediate handoff to connected.

## Preview

Open **full-app-preview/index.html** directly from disk, with no server or network dependency. Choose full flow or individual clips. Playback/replay/pause/scrub remain available in embed mode. Runtime, image data and all animation data are local.

Public stock: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=bridge-connect&variant=362x362&clip=flow
Single clips use clip=0 (discover), 1 (press), 2 (connected), 3 (water reveal), 4 (sustain only).

## Source fidelity and compatibility

This is the first stock release of the approved 362px / under-10s bridge set. Relative to the approved local files, all animation layers, keyframes, easing, opacity, frame rate, duration and PNG image bytes are preserved. Only asset transport changes: images become embedded data URLs. Slot defaults also appear as property fallbacks for runtimes without slot support; authored slot IDs and slot definitions remain present.

Web preview uses the stock's existing lottie-web runtime. Authoring was reviewed in Skia Skottie. Web review does not establish iOS rendering or performance; dotlottie-ios/device testing has not been performed. Validate your production player before integrating.

License: device artwork supplied by the owner for this collection. Preview runtime is the existing stock lottie-web runtime (MIT).
