# SmartHue full-flow preview

Public team demo. Plays 1 → 2 → 5 → 3 → 4, advancing only after each clip completes. Uses latest supplied animations with floor, designer-aligned proximity check, and transparent success lamp.

All seven clips can be previewed individually. The first player starts as soon as it is ready. Remaining full-flow players preload in the background. Error clips load when selected. Web data uses gzip with 0.001-unit numeric precision; file:// playback retains original embedded scripts. Prepared players are reused on transitions. Full flow still advances only on complete.

Full-flow entry begins on Before You Start (animation 0). Scan Now starts the preloaded search sequence in the same page. The instruction loops until Scan Now is pressed; scanning never starts automatically.




## Current playback contract — v12 (overrides earlier intro rules)
Animation 0 lasts 8 seconds. After fade-in (frame 20), hold until frame 75 before switching the lamp off. Scan Now is an explicit exception to the finish-current-animation rule: fade the currently playing illustration over 280ms, stop it, and start 01-tim-den-entry at frame 0. Do not fade app UI. Preload search entry. All other clips must finish before transitioning. Animation 0 has NO baked exit fade. Its final frame stays fully visible. Loop frames 20–479 after the first playback to skip the initial fade-in; Scan Now alone triggers the 280ms app-controlled exit.

Visual v13: animation 0 now uses the approved soft floor from animation 1 with matching transparent top and bottom edges, baked into the file.

Intro v18: 8 seconds; softer cue opacity changes with 3px motion, no spring. Water fill remains 1.5s. Turn It On returns softly to Turn It Off at the end for a matching loop. Shared shadow placement is unchanged. No baked scene exit fade; Scan Now uses app-controlled 280ms fade.

Near-distance v19: 15cm minimum (2m maximum). Inherited readouts in states 02/05/07 also updated. Complete native handoff: handoff/smarthue-dev-final-2026-10-15.zip; read its README and view its full-app-preview/index.html before integration.
