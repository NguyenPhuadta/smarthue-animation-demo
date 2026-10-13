# v4 validation and native performance limits

13 October 2026. Original deliveries preserved.

## Visual and structural checks

Validated ZIP CRC, manifest, embedded animation parse, 393×326 artboard, fr=60 and unchanged frame counts/durations for all seven files. Always-transparent leaf layers were removed only where no parent dependency or matte exists. Unreferenced bitmap assets were removed. Retained bitmap data is unchanged. Numeric motion is inherited from previously audited v3; v4 adds no approximation.

Rendered all 1,746 integer frames with lottie-web SVG and compared against v3. 1,745 matched exactly on the first pass; clip 02 frame 0 had a tiny capture difference (mean RGBA absolute difference 0.00568/255). A fresh paired rerender of that boundary was pixel-identical. No visible regression found from v4 cleanup. This is not a fractional-frame or native iOS visual test. v3's original rounding/keyframe reduction is still a small lossy change vs full precision.

## Important: previous SVG benchmark does not certify iOS

The app uses LottieFiles dotlottie-ios. A new test loads the actual v2/v4 `.lottie` containers with LottieFiles dotlottie-web 0.77.1, WASM software rendering, Chrome headless on this Mac, canvas 1179×978 (DPR3), one visible player, speed 1, interpolation on, two-second samples. No player errors. This is the runtime family used for comparison, not the native iOS build.

| Clip | v2 measured RAF FPS | v4 measured RAF FPS |
|---|---:|---:|
| 01 | 35.0 | 34.5 |
| 02 | 43.6 | 43.0 |
| 03 | 43.8 | 43.1 |
| 04 | 36.2 | 35.9 |
| 05 | 43.6 | 42.0 |
| 07 | 40.0 | 40.7 |
| 08 | 44.3 | 43.3 |

Render callback cadence corroborated stalls (about 70–91 callbacks per two-second window at 3x). v4 does not show a meaningful playback FPS gain in this run; small differences are not a reliable regression or improvement finding. Asset cleanup primarily lowers size/setup work. The earlier desktop SVG result near 60 FPS cannot be transferred to this renderer.

Additional same-player v4 test of clips 01/04:

| Raster scale | Buffer | Clip 01 FPS | Clip 04 FPS |
|---|---|---:|---:|
| 1.5x | 589×489 | ~60 | ~60 |
| 2x | 786×652 | ~60 | ~60 |
| 3x | 1179×978 | 34.5 | 36.5 |

At 1.5x/2x there were no RAF intervals over 25ms in those two-second samples. This implicates raster workload in this desktop software test, but it does not establish the actual app's buffer size or FPS. Reducing resolution can soften edges; verify visually on a 3x device. The original image payloads were not changed.

## Native source finding

Inspected dotlottie-ios upstream main at d538dd98392d1090530d74946d0b4737452316ea: public `framerate` defaults to 30; the `.lottie` loader does not update it, while the JSON loader does; the MTKView reads this setting. Confirm the app's installed version and set/check 60. See IOS-INTEGRATION.md for sources and candidate configuration.

The actual iOS app and affected iPhone are not available in this test setup. The native package version, affected device and iOS have not been supplied. This candidate is not labelled “iOS lag fixed.” Release acceptance requires native app profiling and visual checks at the selected raster scale.
