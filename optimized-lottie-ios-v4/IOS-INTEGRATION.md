# Required checks for LottieFiles dotlottie-ios

## 1. Verify the actual refresh-rate setting first

Source snapshot inspected: upstream main commit `d538dd98392d1090530d74946d0b4737452316ea`. The app's installed version/device/iOS have not been supplied, so this is a candidate cause, not a confirmed diagnosis of the app.

`DotLottieAnimation` declares `@Published public var framerate: Int = 30`. The JSON loader assigns the JSON framerate; the examined `.lottie` loader does not. `DotLottieView`/`DotLottieAnimationView` use that model value as `MTKView.preferredFramesPerSecond`. Consequently a file with `fr=60` can still be requested at 30 updates per second by this code path.

Sources:
- https://github.com/LottieFiles/dotlottie-ios/blob/d538dd98392d1090530d74946d0b4737452316ea/Sources/DotLottie/Public/DotLottieAnimation.swift
- https://github.com/LottieFiles/dotlottie-ios/blob/d538dd98392d1090530d74946d0b4737452316ea/Sources/DotLottie/Public/DotLottieView.swift
- https://github.com/LottieFiles/dotlottie-ios/blob/d538dd98392d1090530d74946d0b4737452316ea/Sources/DotLottie/Public/DotLottieAnimationView.swift

Create and retain the animation once on the main actor, outside repeated SwiftUI body evaluation. For a 393×326 point animation slot, the following is a candidate setup using public APIs found in that snapshot (not compiled against the app or its installed package version):

```swift
import DotLottie

@MainActor
func makeSmartHueAnimation(fileName: String) -> DotLottieAnimation {
    let animation = DotLottieAnimation(
        fileName: fileName,
        config: AnimationConfig(
            autoplay: false,
            loop: false,
            speed: 1,
            useFrameInterpolation: true,
            width: 786,
            height: 652
        )
    )
    animation.framerate = 60
    return animation
}
```

Also log/check `framerate` after load, and check the actual MTKView refresh request for the API used in the app. Setting 60 requests 60; it does not guarantee the device can sustain it. Keep all routing on completion callbacks, not elapsed-time guesses. Confirm the installed package exposes these APIs before applying this sample.

## 2. Control raster size

Measure the rendering buffer, not just the Lottie artboard. At a 393×326 point slot:
- 3x: 1179×978 = 1,153,062 pixels.
- 2x: 786×652 = 512,472 pixels, 55.6% fewer pixels.

In the inspected upstream code, specifying `AnimationConfig.width/height` activates `sizeOverrideActive`; Coordinator avoids automatically resizing the software buffer in that case. Confirm this behavior in the installed version. Scale both dimensions proportionally if the slot is a different size. Do not render at the full phone's 393×852 dimensions.

The suggested 2x buffer does not modify exported paths/images/timing, but on a 3x display it reduces raster resolution and can soften fine edges. Compare 2x and 3x on the actual device; do not present it as a lossless improvement. Try 1.5x only if necessary and visually approved.

Reference implementation:
- https://github.com/LottieFiles/dotlottie-ios/blob/d538dd98392d1090530d74946d0b4737452316ea/Sources/DotLottie/Public/Models/AnimationConfig.swift
- https://github.com/LottieFiles/dotlottie-ios/blob/d538dd98392d1090530d74946d0b4737452316ea/Sources/DotLottie/Public/Coordinator.swift

## 3. Avoid additional app work per frame

Retain the view/model. Do not construct a new player in every body/update/frame callback. Do not publish app-wide state or log every `onFrame`/`onRender` callback. Cache upcoming data; pause/destroy hidden players instead of rendering seven simultaneously. Preserve foreground/background lifecycle. Avoid re-decompressing and parsing at every transition.

The animations still use complex morph paths, gradients and transparent images. v4 reduces loading/setup data but the dotLottie Web 3x test did NOT show a material steady-state FPS gain over v2. Do not claim this asset package alone has fixed the iOS lag.

## 4. Validate on the real target app

Run a Release build on the affected iPhone with the actual installed dotlottie-ios version. Record package version, device, iOS, raster buffer, model framerate and actual frame pacing. Compare old vs v4 at identical settings, then compare 3x vs 2x. Use Instruments to inspect main-thread time, rendering time, allocations and frame hitches. Check Low Power Mode/thermal state for reproducibility.

Test all seven clips separately, then 1→2→5→3→4, 1→7 and 3→8 with a pending app state. Verify every full clip completes before switching, no black rectangles, transparent floor retained, designer check alignment, and no flash at boundaries.

Do not apply Airbnb-specific Core Animation engine options: this integration uses LottieFiles dotlottie-ios. Upstream experimental WebGPU guidance currently lists opaque output as a limitation, so do not switch this transparent composition to it without checking the installed version and visual result.

Official player reference: https://github.com/LottieFiles/dotlottie-ios
