# SmartHue Splash v1.4.0 — unified light band

Asset: smarthue-splash-466x678-v1.4.0.lottie.
466 × 678, 60 FPS, speed 1, loop false, 762 frames / 12,7 giây.

Timeline:
- Chữ bay vào, xếp xong ở 2,5s như bản gốc.
- Vòm/line đứng yên, fade in 2,6–4,4s. Glow fade in 3,5–4,7s; mép bitmap đã feather để hòa nền.
- 4,7–12,7s: một dải sáng trắng nghiêng, mép mềm, chạy từ trái sang phải qua toàn wordmark; 5 lượt × 1,6s = 8 giây. Không còn sóng opacity lệch pha từng glyph.
- Toàn wordmark có cùng mức nền ổn định trong lúc quét. Highlight trắng được cắt bằng một mask chung trong tọa độ canvas, giữ alpha gốc của glyph; độ sáng không phụ thuộc màu xám sẵn có trong PNG chữ.
- 12 frame ease vào/ra ở hai đầu đoạn shimmer; cuối luồng trả lại logo gốc và giữ hình cuối.

Marker app-load-shimmer-start: frame 282, duration 480.
Marker app-load-shimmer-complete: frame 762 (exclusive out-point).
Host chuyển sang app khi animation hoàn tất; không loop hoặc rút ngắn shimmer.

Native integration: hỗ trợ precomposition, animated Bezier masks và mask feather (f). Hiệu ứng có sẵn trong Lottie, không cần CSS hay logic shimmer riêng. Đã xem render CanvasKit/Skottie web tại frame 320, 344 và kết thúc. Chưa kiểm chứng iOS/Android thật; cần kiểm tra hỗ trợ mask feather ở player tích hợp.

Một size gốc, aspect-fit/contain; scale đồng đều và giữ tiến trình khi xoay/gập/mở. Không stretch/crop.
ZIP chỉ gồm asset + README; không bao gồm runtime web/WASM.
Các link và gói v1.0–v1.3 giữ nguyên.
