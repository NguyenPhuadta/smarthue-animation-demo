# SmartHue Splash v1.3.0 — fade in + shimmering 8s

File tích hợp: smarthue-splash-466x678-v1.3.0.lottie.
Canvas 466 × 678; 60 FPS; speed 1; loop false. Tổng 762 frame / 12,7 giây.

Timeline:
- Chữ bay vào như bản gốc; xếp xong ở 2,5s.
- 2,6–4,4s: vòm và line đứng yên, fade in ease-in-out; bỏ quét/xoay line.
- 3,5–4,7s: blur/glow fade in ease-in-out, giữ nguyên kích thước và hình cuối; bỏ breathing.
- 4,7–12,7s: shimmering tương phản mạnh trên chữ, 6 chu kỳ × 1⅓ giây, đúng 8 giây.
- Kết thúc: dừng và giữ hình cuối; host chuyển sang màn app khi player hoàn tất. Không loop hoặc tự cắt ngắn shimmering.

Marker `app-load-shimmer-start`: frame 282, duration 480.
Marker `app-load-shimmer-complete`: frame 762 (out-point exclusive).
Dev có thể bắt đầu load app ngay khi mở splash; khoảng shimmering luôn là 8s.

Tối ưu: thay dữ liệu quét/breathing theo từng frame bằng fade với 2 keyframe; rút gọn easing tuyến tính; chuyển track hằng sang static; số thập phân 4 chữ số (sai số mỗi giá trị tối đa 0,00005); bỏ tên layer và ảnh dome không dùng; đóng gói lại PNG lossless, không resize hay giảm màu. Không giảm FPS.

Player cần hỗ trợ image assets, gradient opacity stops và screen blend. Không cần CSS hoặc hiệu ứng bổ sung bên ngoài Lottie. Chưa kiểm chứng player iOS/Android thật.

Dùng một asset cho mọi thiết bị: aspect-fit/contain, scale đồng đều, căn giữa; giữ tiến trình khi xoay/gập/mở. Không stretch/crop.

ZIP bàn giao chỉ gồm asset và README; runtime web/WASM nằm ở preview stock, không cần đưa vào app native.

## Thay đổi v1.3
- Shimmer chạy liên tục: sóng sáng lệch pha qua 8 glyph, chu kỳ 80 frame, tổng 6 chu kỳ / 480 frame / 8 giây.
- Opacity chữ biến thiên 40–100%, lớp highlight screen 0–100%; không có khoảng dừng giữa chu kỳ. Ease vào/ra 12 frame ở hai đầu; cuối luồng trả lại logo gốc.
- Không còn phụ thuộc alpha track matte. Chuyển động chữ bay vào và fade in vòm/blur như v1.2.
- Sửa mép bitmap glow bị cắt: feather alpha 120 pixel nguồn quanh biên về 0, giữ RGB, kích thước và tâm ảnh. Những PNG khác giữ nguyên như v1.2.
- Kiểm tra render web Skottie tại 5,33s và 6s: highlight đổi vị trí rõ, mép blur hòa nền. Chưa thử native iOS/Android.
