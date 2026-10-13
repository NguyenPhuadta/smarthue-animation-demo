# SmartHue — optimized dotLottie iOS candidate v4

13 October 2026. Target player confirmed by designer: LottieFiles `dotlottie-ios`, NOT Airbnb `lottie-ios`. This is a separate candidate; previous deliveries are unchanged. Do not treat desktop web results as certification of native iOS performance.

## Read first

Use the seven `.lottie` files here. They contain the latest v3 reduced-keyframe data, plus removal of provably always-transparent leaf layers and unused bitmap assets. Constant animation tracks in clip 07 were converted to static properties. No additional motion approximation or image resampling was introduced after v3. Remaining image payloads are byte-for-byte unchanged. Format: dotLottie 1.0 ZIP, embedded images.

Seven animation files total **2,415,730 bytes (2.30 MiB)**, versus v2 **3,123,386 bytes (2.98 MiB)**: 22.7% smaller. The original full-precision total was 7,220,338 bytes. Compression alone does not cure frame drops.

**Read IOS-INTEGRATION.md before integration.** An important source-level finding: `DotLottieAnimation.framerate` defaults to 30 and the examined `.lottie` loader does not update it from the animation file. Check the installed package version and actual view refresh rate; set the public `framerate` to 60 on the retained animation instance. Also test a 2x raster buffer instead of a 3x buffer. Do not change animation speed or the file's frame-rate metadata to compensate.

## Preview

Candidate visual reference (lottie-web SVG): https://nguyenphuadta.github.io/smarthue-animation-demo/optimized-lottie-ios-v4/

LottieFiles dotLottie Web runtime diagnostic, loading these actual `.lottie` files: https://nguyenphuadta.github.io/smarthue-animation-demo/optimized-lottie-ios-v4/runtime-check.html

Original reference: https://nguyenphuadta.github.io/smarthue-animation-demo/?rev=timeout-entry-v15

Watch the full app visual reference before implementation. The native iOS result must then be verified in the app on actual devices. The diagnostic web player is closer to the LottieFiles runtime family but is still not the installed native runtime.

## Files and routing

Canvas 393×326; 60 fps metadata; speed 1. App slot: X=0, Y=276, W=393, H=326 in the 393×852 design. Preserve transparent floor/shadows, and place animation beneath app UI.

| File | Duration | Root layers v2 → v4 |
|---|---:|---:|
| 01-tim-den.lottie | 4s | 55 → 55 |
| 02-tim-thay.lottie | 4.6s | 60 → 21 |
| 03-dang-ket-noi.lottie | 2s | 20 → 19 |
| 04-thanh-cong.lottie | 7.5s | 29 → 28 |
| 05-tim-thay-den-ket-noi.lottie | 2.8s | 60 → 21 |
| 07-no-light-found.lottie | 4.2s | 63 → 24 |
| 08-connection-timeout.lottie | 4s | 18 → 17 |

Successful route: **1 → 2 → 5 → 3 → 4**. Error routes: **1 → 7**, **3 → 8**. Clip 06 remains retired.

**Finish the ENTIRE current animation before switching.** Override playback to autoplay=false, loop=false for app-controlled state routing (the container manifests retain the previous preview loop/autoplay defaults). Store the pending application target; consume it in `onComplete`. With no target, repeat the complete waiting/error clip. Play bridge 05 once. No exit-marker seeks, partial-loop ranges, reverse API playback or timer-driven clip switches. All reverse sections already live in the files. Success enters directly from Connecting, without clip 06. Timeout's 0.2s entry hold is embedded. Do not add a second hold.

Retain the current animation/view; prepare upcoming file bytes in advance. Only the visible player should render continuously. Keep the outgoing final frame visible until the next player can display its first frame. Remove stale observers. Completion routing belongs to the app, not the web demo.
