# SmartHue Voice Room — Off/On v2.0.0 materials

Extracted native resources from the approved on/off-only Lottie assets. No recompression or motion edits. Variant folders contain manifest.json, animations/room.json, images and fonts. Font resolver uses SFPro-Bold / SF Pro / Bold. Do not interchange image layouts across variants.

steps/: seven screenshots from the 466×444 web preview, representative frames 0,96,144,180,266,350,395. Screenshots illustrate the timeline; use the Lottie asset for native playback, not these JPEGs as an image sequence.

6.6 seconds, 60 FPS, speed=1, loop=true, frame range [0,396). Timeline: warm → turn off → dark → turn on → warm. No Chill Mode.

Original font and all image bytes are retained exactly from the .lottie archives. Raw JSON is not self-contained: preserve image/font paths or use a compatible asset resolver. Normal integration should load the .lottie package rather than reconstructing layers manually.
