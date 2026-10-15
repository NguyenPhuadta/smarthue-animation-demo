# SmartHue full-flow preview

Public team demo. Plays 1 → 2 → 5 → 3 → 4, advancing only after each clip completes. Uses latest supplied animations with floor, designer-aligned proximity check, and transparent success lamp.

All seven clips can be previewed individually. The first player starts as soon as it is ready. Remaining full-flow players preload in the background. Error clips load when selected. Web data uses gzip with 0.001-unit numeric precision; file:// playback retains original embedded scripts. Prepared players are reused on transitions. Full flow still advances only on complete.

Full-flow entry begins on Before You Start (animation 0). Scan Now starts the preloaded search sequence in the same page. The instruction loops until Scan Now is pressed; scanning never starts automatically.
