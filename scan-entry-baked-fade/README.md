# Scan entry — fade baked into animation files

00-before-scan.lottie → 01-tim-den-entry.lottie → existing 02-tim-thay.lottie.
IMPORTANT EXCEPTION — animation 0 only: Scan Now interrupts the instructional loop. Preload search entry first. When tapped, fade only the currently playing illustration to opacity 0 over 280ms, then stop it and play search entry from frame 0. Keep app UI visible; do not fade the whole screen. This arbitrary-time exit must be implemented in app code because a file cannot know when the button is tapped. Do not wait for animation 0 to finish. All subsequent states retain the rule: finish the current clip before switching. Animation 0 lasts 6s; it illustrates the 10s instruction, not a real countdown. Fade-in ends at frame 20. Hold the initial cue until frame 75 (0.92s of fully visible recognition time). Lamp and switch turn off together over frames 75–105 (1.25–1.75s). Water fills over frames 138–228 (1.5s).

Animation 0 ends fully transparent at frame 359. Search entry begins fully transparent at frame 0, then fades in over 24 frames (0.4s). Both files are 393×326 at 60fps. Natural end-of-cycle opacity is authored inside the files, including the illustration floor. For a Scan Now interrupt at an arbitrary playback time, app-controlled opacity over 280ms is required as described above. Keep app UI outside the animation.

Use the existing 01-tim-den.lottie for subsequent search loops, so it does not fade in on every loop. The entry variant otherwise preserves its original motion and duration (4s). No keyframes have been reduced.
