# Bridge Connect — v1.3.0-362x362-2026-10-22

Canvas **362 × 362 px**, **60 FPS**, speed **1.0**. Transparent background; no opaque floor, text or success icons. Water lines and blue underglow are authored effects. Original PNG bytes are embedded losslessly in every .lottie. No external fonts.

| File | Duration | Frames |
| --- | --- | --- |
| full.lottie | 9.46667s | 568 |
| discover.lottie | 5s | 300 |
| press-loop.lottie | 2.4s | 144 |
| press.lottie | 1.26667s | 76 |
| connected.lottie | 4.4s | 264 |
| water-reveal.lottie | 0.8s | 48 |
| connected-loop.lottie | 4s | 240 |

## Integration and playback

Discover (loop) → water-reveal (once) → press (once) → connected (entry once, sustain loop).
- Discover loops [0,300). On leaving it for press, finish the current loop and play water-reveal [0,48) once.
- Press ends at frame 76 exclusive. Switch immediately to connected frame 0, preserving its compressed pose. LED lights on contact; the rebound takes 9 frames and glow spreads during that rebound. No waiting/reset tail.
- Connected plays [0,24) once, then loops [24,264). Never repeat the impact/entry on every loop.
- connected-loop.lottie is sustain only: loop [0,240). Use it when the app cannot loop a segment.
- full.lottie plays [0,568) once (9.466667s) and holds the final frame. This compact demo shortens the success hold; it is not a seamless loop.
- Standalone press preview uses **press-loop.lottie**, loop [0,144): approach → contact at 76 → rebound → release → return to identical unlit resting pose. It is a repeatable prompt while waiting for user input.
- **press.lottie** remains the 76-frame contact-only clip for the immediate transition into connected. On a real press, switch to connected at contact; do not wait for the standalone loop recovery.

## Preview

Open **full-app-preview/index.html** directly from disk, with no server or network dependency. Choose full flow or individual clips. Playback/replay/pause/scrub remain available in embed mode. Runtime, image data and all animation data are local.

Public stock: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=bridge-connect&variant=362x362&clip=flow
Single clips use clip=0 (discover), 1 (press), 2 (connected), 3 (water reveal), 4 (sustain only).

## Source fidelity and compatibility

v1.0.1 added a standalone press loop, restoring the authored rebound/release keys after contact and ending at a matching resting pose. The approved full flow and original contact timing are retained in v1.2.0. Relative to the approved local files, original PNG image bytes are preserved. v1.2.0 applies the framing and ground-effect footprint changes documented below; motion timing and easing remain intact. Images are embedded data URLs. Slot defaults also appear as property fallbacks for runtimes without slot support; authored slot IDs and slot definitions remain present.

Web preview uses the stock's existing lottie-web runtime. Authoring was reviewed in Skia Skottie. Web review does not establish iOS rendering or performance; dotlottie-ios/device testing has not been performed. Validate your production player before integrating.

License: device artwork supplied by the owner for this collection. Preview runtime is the existing stock lottie-web runtime (MIT).


## v1.2.0 — larger content and error states (2026-10-22)

The product and its authored motion are enlarged 35% around the canvas center. Water/glow horizontal footprints are reduced to 66% before this reframing to keep soft tails inside the 362 × 362 canvas. Existing timing, FPS, easing and embedded PNG bytes are unchanged. Transparent background; no extra text or status icons.

| Added file | Duration | Playback |
| --- | --- | --- |
| not-found.lottie | 3s / 180 frames | once, hold final frame |
| timeout.lottie | 3s / 180 frames | once, hold final frame |

Stock clip IDs 5 and 6 open the two error states. They are alternative result branches, not appended to the success demo. Full success remains 568 frames / 9.466667s.

Not found: use from a visible search pose (discover around frame 140); unanswered scan waves dissipate, the device loses opacity and settles. If search has already faded out, play water-reveal first or choose a visible search frame before this branch. Do not cut from a fully transparent discover frame directly into the visible error pose.

Timeout: the opening compressed pose matches press contact / connected frame 0. It rebounds, then the complete signal ring warms to amber and settles. Switch to this branch from press contact when the connection result is timeout; there is no separate indefinite pairing loop in this collection. If the app waits on a static pose, use the unlit resting pose and begin this feedback on the result.

Retry uses a host-code fade out before restarting discovery from frame 0; see the Try again section below. Both results hold visibly rather than automatically restarting. These clips do not communicate an error using color alone: not-found dims the product with vanishing scan waves; timeout preserves the product and holds a full amber ring with a small physical hesitation.

All nine .lottie files contain their images. full-app-preview includes all scripts/runtime for offline playback. Reviewed using official Skia Skottie and stock web preview; no physical iOS/device verification.

## v1.2.1 — full amber timeout ring

Timeout now lights the entire existing circular rim on the bridge, including its final held pose. Only trim-path coverage changes to 100%; color timing, opacity, stroke width, product motion, duration and all other clips remain unchanged.


## Try again: chuyển từ màn lỗi về Find bridge (host code)

Áp dụng cho cả **Không tìm thấy bridge** (`not-found.lottie`, clip 5) và **Kết nối quá thời gian / Timeout** (`timeout.lottie`, clip 6).

Khi user bấm **Try again**, code của ứng dụng phải thực hiện theo thứ tự:

1. Khoá xử lý Try again trong lúc chuyển cảnh để tránh chạy nhiều lần. Dừng phát và giữ nguyên frame đang hiển thị của animation lỗi.
2. Fade out toàn bộ animation lỗi bằng opacity/alpha của view chứa player, từ giá trị hiện tại về **0**. Thời gian đề xuất **200 ms**, easing ease-out. Giữ frame lỗi trong suốt quá trình fade; không thay asset hoặc reset frame khi animation còn nhìn thấy.
3. Khi fade out hoàn tất (callback completion), dừng/huỷ player lỗi, chuyển state về **Find bridge / Tìm bridge** và nạp `discover.lottie` tại **frame 0**.
4. Khôi phục opacity/alpha của view về **1**, phát `discover.lottie` từ đầu ở speed **1.0**, tiếp tục lặp `[0,300)` theo quy tắc tìm kiếm. Entrance fade in đã có trong `discover.lottie`; không bỏ qua entrance bằng cách seek đến frame đang hiện bridge.
5. Mở lại tương tác sau khi chuyển state xong. Khi rời màn, huỷ callback chuyển cảnh còn chờ để không khởi động lại tìm kiếm ngoài ý muốn.

Luồng: **Not found hoặc Timeout → Try again → code fade out animation lỗi → fade hoàn tất → Find bridge từ frame 0**.

Fade out này được triển khai trong **code host**, không nằm trong file `.lottie`. Đây là hướng dẫn tích hợp cho dev; nút Phát lại của HTML preview vẫn chỉ phát lại clip đang chọn, không mô phỏng nút Try again. Các file animation, thời lượng, FPS và nhịp chuyển động không thay đổi.

## v1.3.0 — bridge enlarged another 40%

The bridge, its surface ring, touch target and press feedback are scaled to 140% of v1.2.2 (roughly 85% of canvas width in the resting pose). Canvas stays 362 × 362, 60 FPS and transparent. The product is moved upward 23 native units; the initial descent is constrained to a safe top position so the fade-in does not reveal cropped pixels. The ground effects move down 35 native units and have 80% of their previous vertical spread, retaining outward motion with space below the larger product. All clip durations, keyframe times and original PNG image bytes remain unchanged. Try again host fade-out instructions still apply.
