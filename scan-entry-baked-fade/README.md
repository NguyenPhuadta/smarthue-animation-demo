# Scan entry — fade baked into animation files

00-before-scan.lottie → 01-tim-den-entry.lottie → existing 02-tim-thay.lottie.
Play every animation to completion before moving to the next file. Scan Now queues the change; it must not cut animation 0 midway. Animation 0 lasts 6s; it illustrates the 10s instruction, not a real countdown. Power-off starts immediately with the first cue; lamp and switch share the same 0–0.7s action. Water fills over frames 120–210 (1.5s).

Animation 0 ends fully transparent at frame 359. Search entry begins fully transparent at frame 0, then fades in over 24 frames (0.4s). Both files are 393×326 at 60fps. Opacity is authored inside the files, including the illustration floor. No CSS/native view opacity effect is required. Keep app UI outside the animation.

Use the existing 01-tim-den.lottie for subsequent search loops, so it does not fade in on every loop. The entry variant otherwise preserves its original motion and duration (4s). No keyframes have been reduced.
