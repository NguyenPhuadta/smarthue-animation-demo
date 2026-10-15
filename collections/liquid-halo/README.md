# Liquid Halo · Blue Bulb — v1.0.0-720x540-2026-10-15

Canvas **720 × 540 px**, **60 FPS**, speed **1.0**. Primary tone **#33A0FF**, white lightbulb supplied by the owner. Opaque black background and authored floor reflection; not transparent.

| File | Duration | Frames |
| --- | --- | --- |
| liquid-halo.lottie | 12.93333333 s | 776 (ip=0, op=776 exclusive) |

## Playback and integration

State **0** is the only clip. Orbit → fold/collapse → reform → liquid merge into the white bulb. The source contains four identical 194-frame cycles (3.233333 s each). Play the **complete 776-frame file in a loop** at speed 1.0; pause/stop when the host leaves this state. There is no success/error handoff or external interaction. Full sequence and single-state preview intentionally play the same file from frame 0. No keyframe reduction, retiming, resize, opacity/easing changes or visual optimization was applied for publishing.

## Offline and public preview

Open **full-app-preview/index.html** directly from disk. All animation data, runtime and dependencies are local; no server/network is required. Replay, pause and scrub are available. `mode=sequence` starts at the beginning, `mode=single&state=0` selects the clip, `embed=1` hides duplicate navigation and retains playback controls. No localStorage overrides.

Stock: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=liquid-halo&variant=720x540&clip=flow

Single: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=liquid-halo&variant=720x540&clip=0

## Fidelity and assets

First stock release of the approved blue sphere/reflection, white SVG bulb and smooth liquid merge. Relative to the previous purple/round-pearl artwork, this release uses #33A0FF, the owner's exact lightbulb SVG geometry and a curved merging neck. Native paths, gradients, masks and authored floor stay in the file. No external bitmap/font assets, expressions or remote data dependencies. The .lottie embeds the **exact approved JSON bytes** with its slot definitions and default black background preserved.

Source SHA-256: `faa03106d00a5edeadfe181691ebb3a690226c1c61f8762417585f76d7c5a8f5`.

## Validation limits

Authoring was reviewed in the official Skia Skottie player. The stock preview uses the repository's existing lottie-web runtime (MIT). A preview-only adapter sets `hasMask=true` on layers already containing `masksProperties`, so lottie-web normalizes their relative mask tangents correctly. The downloaded .lottie remains byte-for-byte unchanged. JSON/.lottie/ZIP fidelity, browser playback and responsive layout are checked during publication. Offline package dependencies were checked locally; opening file:// directly could not be browser-tested because the automation browser allows only HTTP(S). Web playback does not establish native iOS rendering or device FPS; dotlottie-ios and physical-device tests have not been performed. Verify the production player before integration.
