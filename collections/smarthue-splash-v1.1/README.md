# SmartHue Splash v1.1.0 — native shimmer 8s

Canvas duy nhất 466 × 678, 60 FPS, speed 1, loop false.

- 0–10,7s: giữ nguyên splash v1.0.0 đã duyệt, toàn bộ ảnh gốc không đổi byte.
- 10,7–18,7s: shimmering trên chữ, 4 lượt quét mềm × 2 giây.
- Tổng 1122 frame (op exclusive), 18,7 giây; dừng và giữ hình cuối.
- Shimmer bắt đầu tại frame 642, kéo dài 480 frame. Marker `app-load-shimmer-start` có duration 480; marker `app-load-shimmer-complete` tại frame 1122.
- Dev bắt đầu load app theo nhu cầu; khi player phát hoàn tất 18,7s mới chuyển sang màn app. Không loop toàn splash hoặc tự rút ngắn shimmer.
- Shimmer nằm trong Lottie, dùng gradient và alpha matte từ glyph gốc; không cần CSS, timer hay ảnh mới. Player native cần hỗ trợ precomposition, alpha track matte, gradient opacity stops và screen blend.
- Aspect-fit/contain, scale đồng đều; dùng cùng asset khi xoay/gập/mở, giữ tiến trình playback.

File: smarthue-splash-466x678-v1.1.0.lottie.
Preview: index.html (CanvasKit/Skottie đi kèm, có play/pause/replay/tua toàn 18,7s).
Chưa xác minh trên player iOS/Android thật.
