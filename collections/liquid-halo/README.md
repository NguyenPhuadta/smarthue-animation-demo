# Liquid Halo · Blue Bulb — v1.1.0-720x540-2026-10-20

Canvas **720 × 540 px**, **60 FPS**, speed **1.0**. Primary tone **#33A0FF**, white lightbulb supplied by the owner. Opaque black background and authored floor reflection; not transparent.

| File | Duration | Frames |
| --- | --- | --- |
| liquid-halo.lottie | 12.93333333 s | 776 (ip=0, op=776 exclusive) |

## Playback and integration

State **0** is the only clip. Orbit at a fixed radius → tilt/fade → reform → liquid merge into the larger white bulb. The source contains four identical 194-frame cycles (3.233333 s each). Play the **complete 776-frame file in a loop** at speed 1.0; pause/stop when the host leaves this state. There is no success/error handoff or external interaction. Full sequence and single-state preview intentionally play the same file from frame 0. No keyframe reduction, retiming, resize, opacity/easing changes or visual optimization was applied for publishing.

## Offline and public preview

Open **full-app-preview/index.html** directly from disk. All animation data, runtime and dependencies are local; no server/network is required. Replay, pause and scrub are available. `mode=sequence` starts at the beginning, `mode=single&state=0` selects the clip, `embed=1` hides duplicate navigation and retains playback controls. No localStorage overrides.

Stock: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=liquid-halo&variant=720x540&clip=flow

Single: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=liquid-halo&variant=720x540&clip=0

## Fidelity and assets

Revision v1.1.0 removes the sphere/orbit shrink animation: the sphere radius remains 75.6 px while the orbital plane rotates and the authored fade/reveal continues. The supplied white SVG bulb is 65% larger when formed; its liquid neck remains connected. Tone #33A0FF, FPS, timing and canvas remain unchanged. The previous v1.0.0 ZIP is retained. Native paths, gradients, masks and authored floor stay in the file. No external bitmap/font assets, expressions or remote data dependencies. The .lottie embeds the **exact approved JSON bytes** with its slot definitions and default black background preserved.

Source SHA-256: `d4b06c9603d85664c078726210506e91b0062f796dd4248e0748b3eba591d7f3`.

## Validation limits

Authoring was reviewed in the official Skia Skottie player. The stock preview uses the repository's existing lottie-web runtime (MIT). A preview-only adapter sets `hasMask=true` on layers already containing `masksProperties`, so lottie-web normalizes their relative mask tangents correctly. The downloaded .lottie remains byte-for-byte unchanged. JSON/.lottie/ZIP fidelity, browser playback and responsive layout are checked during publication. Offline package dependencies were checked locally; opening file:// directly could not be browser-tested because the automation browser allows only HTTP(S). Web playback does not establish native iOS rendering or device FPS; dotlottie-ios and physical-device tests have not been performed. Verify the production player before integration.
