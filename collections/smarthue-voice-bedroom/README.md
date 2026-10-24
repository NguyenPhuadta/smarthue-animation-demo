# SmartHue bedroom — draft v1

Canvas: 466 × 444 px. 60fps. 360 frames / 6 seconds. Speed 1. Continuous loop.

Sequence: warm room pause → Hey Siri, dim command → command brightens → turn lamp off → dark room pause → Hey Siri, dim command → command brightens → turn lamp on → warm hold.

Text, placement and warm glow follow Figma section 794:1775. On and off captions use the exact two line breaks shown in the screenshot. Typography is native Lottie SF Pro Bold, subset embedded in the package with all needed glyphs. Images and font are packed into the .lottie file. The supplied on photo and golden blur are preserved unchanged. Only the AI-generated off photo is resized to 466 × 444.

The off photo was edited using the built-in image_gen tool from the supplied on photo; geometry was visually checked. AI editing does not guarantee pixel-identical geometry. The original and generated source files are retained for inspection.

Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-bedroom&variant=466x444&clip=flow (Skia CanvasKit/Skottie, same runtime as the stock preview). The original authoring player and text-to-lottie folder currently point to an unmounted Hi Bbi Workspace volume; this draft was checked in the available Skottie runtime. No claim of validation on an iPhone device.

Validation: 10 semantic Skottie frames; exact PNG match of frames 0 and 359; .lottie ZIP integrity and asset references checked. Published as its own bedroom collection.


# SmartHue bedroom — iPhone Duo mở ngang v1

951 × 669 px · 60 FPS · 360 frames / 6 seconds · speed 1 · continuous loop.

Same command rhythm, opacity animation and timing as the 466 × 444 bedroom version. Native SF Pro Bold 32 px captions and supplied golden glow follow Figma frame 794:1917. Caption centre x247, y188.9; glow centre x247, y188.5. Caption run translation from portrait: +14, −43. Glow translation: +14, −33.

On photo: user supplied. Off photo: built-in image_gen lighting edit of that same landscape photo. Prompt retained in imagegen-prompt.txt; generated original retained in room-off-generated-v1.png. AI edit geometry visually inspected; no claim of pixel-perfect identity.

Both room photos are 951 × 669 JPEG quality 95 with 4:4:4 chroma. Source PNG retained. Supplied blur and text halo images retained. All font and image dependencies embedded in SmartHue-Bedroom-951x669-v1.lottie.

Final file: 724,905 bytes (724.9 KB, below 1,000,000 bytes).

Validated: JSON dimensions/FPS/duration, unchanged opacity/easing and caption precomps, all ZIP asset/font references, ZIP integrity, 10 native Skottie semantic frames, exact rendered loop seam at frames 0 and 359. Local browser preview plays with no console errors. No validation on actual iPhone hardware.

Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-bedroom&variant=951x669&clip=flow
Published as its own bedroom collection.


Offline preview: full-app-preview/index.html (portrait), full-app-preview/951x669/index.html (landscape). Native SF Pro Bold font, PNG/JPEG images and CanvasKit runtime included. No audio. Portrait .lottie: 884,477 bytes. Landscape .lottie: 724,905 bytes. Each standalone file is under 1,000,000 bytes. ZIP includes duplicate preview data and runtime and is larger.
