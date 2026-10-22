# Bridge Connect — v1.2.1-362x362-2026-10-22

Canvas **362 × 362 px**, **60 FPS**, speed **1.0**. Transparent background; no opaque floor, text or success icons. Water lines and blue underglow are authored effects. Original PNG bytes are embedded losslessly in every .lottie. No external fonts.

| File | Duration | Frames |
| --- | --- | --- |
| full.lottie | 9.46667s | 568 |
| discover.lottie | 5s | 300 |
| press-loop.lottie | 2.4s | 144 |
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
- Standalone press preview uses **press-loop.lottie**, loop [0,144): approach → contact at 76 → rebound → release → return to identical unlit resting pose. It is a repeatable prompt while waiting for user input.
- **press.lottie** remains the 76-frame contact-only clip for the immediate transition into connected. On a real press, switch to connected at contact; do not wait for the standalone loop recovery.

## Preview

Open **full-app-preview/index.html** directly from disk, with no server or network dependency. Choose full flow or individual clips. Playback/replay/pause/scrub remain available in embed mode. Runtime, image data and all animation data are local.

Public stock: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=bridge-connect&variant=362x362&clip=flow
Single clips use clip=0 (discover), 1 (press), 2 (connected), 3 (water reveal), 4 (sustain only).

## Source fidelity and compatibility

v1.0.1 added a standalone press loop, restoring the authored rebound/release keys after contact and ending at a matching resting pose. The approved full flow and original contact timing are retained in v1.2.0. Relative to the approved local files, original PNG image bytes are preserved. v1.2.0 applies the framing and ground-effect footprint changes documented below; motion timing and easing remain intact. Images are embedded data URLs. Slot defaults also appear as property fallbacks for runtimes without slot support; authored slot IDs and slot definitions remain present.

Web preview uses the stock's existing lottie-web runtime. Authoring was reviewed in Skia Skottie. Web review does not establish iOS rendering or performance; dotlottie-ios/device testing has not been performed. Validate your production player before integrating.

License: device artwork supplied by the owner for this collection. Preview runtime is the existing stock lottie-web runtime (MIT).


## v1.2.0 — larger content and error states (2026-10-22)

The product and its authored motion are enlarged 35% around the canvas center. Water/glow horizontal footprints are reduced to 66% before this reframing to keep soft tails inside the 362 × 362 canvas. Existing timing, FPS, easing and embedded PNG bytes are unchanged. Transparent background; no extra text or status icons.

| Added file | Duration | Playback |
| --- | --- | --- |
| not-found.lottie | 3s / 180 frames | once, hold final frame |
| timeout.lottie | 3s / 180 frames | once, hold final frame |

Stock clip IDs 5 and 6 open the two error states. They are alternative result branches, not appended to the success demo. Full success remains 568 frames / 9.466667s.

Not found: use from a visible search pose (discover around frame 140); unanswered scan waves dissipate, the device loses opacity and settles. If search has already faded out, play water-reveal first or choose a visible search frame before this branch. Do not cut from a fully transparent discover frame directly into the visible error pose.

Timeout: the opening compressed pose matches press contact / connected frame 0. It rebounds, then the complete signal ring warms to amber and settles. Switch to this branch from press contact when the connection result is timeout; there is no separate indefinite pairing loop in this collection. If the app waits on a static pose, use the unlit resting pose and begin this feedback on the result.

Retry explicitly restarts discovery (not a loop from the error tail). Both results hold visibly rather than automatically restarting. These clips do not communicate an error using color alone: not-found dims the product with vanishing scan waves; timeout preserves the product and holds a full amber ring with a small physical hesitation.

All nine .lottie files contain their images. full-app-preview includes all scripts/runtime for offline playback. Reviewed using official Skia Skottie and stock web preview; no physical iOS/device verification.

## v1.2.1 — full amber timeout ring

Timeout now lights the entire existing circular rim on the bridge, including its final held pose. Only trim-path coverage changes to 100%; color timing, opacity, stroke width, product motion, duration and all other clips remain unchanged.
