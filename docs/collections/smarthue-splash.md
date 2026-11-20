# SmartHue Splash v1.5.0 — round glow + unified light band

Asset: smarthue-splash-466x678-v1.5.0.lottie.
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

## Thay đổi v1.5
- Glow dùng alpha falloff tròn, bán kính tính trong cùng đơn vị pixel ở cả hai chiều; không còn feather theo bốn cạnh hình chữ nhật.
- Giữ tâm glow và sắc cam hồng; scale đồng đều 25% → 22,5%, nhỏ hơn 10%.
- Màu RGB ở pixel trong suốt hoàn toàn được xóa để nén gọn; PNG dùng filter thích ứng, không giảm độ phân giải.
- Mọi dữ liệu motion của chữ, vòm và dải shimmer giữ nguyên so với v1.4. Shimmer 8s, tổng luồng 12,7s.
- Đã xem render Skottie web ở frame cuối: glow tròn và không lộ mép vuông.

---

## Lịch sử

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

---

## Lịch sử

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

---

## Lịch sử

# SmartHue Splash v1.2.0 — fade in + shimmering 8s

File tích hợp: smarthue-splash-466x678-v1.2.0.lottie.
Canvas 466 × 678; 60 FPS; speed 1; loop false. Tổng 762 frame / 12,7 giây.

Timeline:
- Chữ bay vào như bản gốc; xếp xong ở 2,5s.
- 2,6–4,4s: vòm và line đứng yên, fade in ease-in-out; bỏ quét/xoay line.
- 3,5–4,7s: blur/glow fade in ease-in-out, giữ nguyên kích thước và hình cuối; bỏ breathing.
- 4,7–12,7s: shimmering trên chữ, 4 lượt × 2 giây, đúng 8 giây.
- Kết thúc: dừng và giữ hình cuối; host chuyển sang màn app khi player hoàn tất. Không loop hoặc tự cắt ngắn shimmering.

Marker `app-load-shimmer-start`: frame 282, duration 480.
Marker `app-load-shimmer-complete`: frame 762 (out-point exclusive).
Dev có thể bắt đầu load app ngay khi mở splash; khoảng shimmering luôn là 8s.

Tối ưu: thay dữ liệu quét/breathing theo từng frame bằng fade với 2 keyframe; rút gọn easing tuyến tính; chuyển track hằng sang static; số thập phân 4 chữ số (sai số mỗi giá trị tối đa 0,00005); bỏ tên layer và ảnh dome không dùng; đóng gói lại PNG lossless, không resize hay giảm màu. Không giảm FPS.

Player cần hỗ trợ image assets, gradient opacity stops, precomposition, alpha track matte và screen blend. Không cần CSS hoặc hiệu ứng bổ sung bên ngoài Lottie. Chưa kiểm chứng player iOS/Android thật.

Dùng một asset cho mọi thiết bị: aspect-fit/contain, scale đồng đều, căn giữa; giữ tiến trình khi xoay/gập/mở. Không stretch/crop.

ZIP bàn giao chỉ gồm asset và README; runtime web/WASM nằm ở preview stock, không cần đưa vào app native.

---

## Lịch sử (link và asset cũ giữ nguyên)

# Bản hiện tại: v1.1.0 · Shimmering 8 giây

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

---

## Lịch sử v1.0.0 (link/asset cũ giữ nguyên)

# SmartHue · Splash — v1.0.0

## Quy tắc bàn giao hiện tại — bộ 05 · một size gốc

**Chỉ dùng canvas 466 × 678 px (`466x678`) cho mọi trạng thái thiết bị.** Khi iPhone Duo mở ngang hoặc partially folded, dev / coding agent tiếp tục dùng chính file gốc và resize view chứa player bằng code host; không cần asset Lottie riêng cho màn ngang.

- Giữ nguyên file `.lottie`, timeline, keyframe, FPS, speed và quy tắc phát của bộ này. Resize chỉ đổi kích thước hiển thị.
- Scale đồng đều hai chiều, giữ tỉ lệ gốc. Dùng aspect-fit/contain trong container mà layout app dành cho animation; không stretch hoặc crop artwork.
- Với container `W × H`, canvas gốc `w × h`: `scale = min(W / w, H / h)`; kích thước hiển thị `w × scale`, `h × scale`. Căn giữa trong container; khoảng trống do host layout xử lý.
- Khi đổi hướng/gập/mở, cập nhật layout và kích thước view, giữ nguyên asset và tiến trình playback; không tự replay chỉ vì resize.
- Container hiển thị lấy từ design/layout app, không tự suy ra bằng kích thước toàn màn hình. Nếu chưa có thông số layout, hỏi lại Phú.
- Các bản kích thước phụ trong release/link cũ chỉ để tương thích lịch sử, **không phải file dev cần tích hợp mới**. ZIP hiện tại chỉ bàn giao một size gốc cho bộ này.

23/10/2026. Canvas gốc 466 × 678 px, dùng chung mọi trạng thái thiết bị qua host resize. 60 FPS, speed 1×, ip 0, op 642 exclusive: 10,7 giây. Nền đen được nhúng trong animation.

File tích hợp duy nhất: `smarthue-splash-466x678-v1.0.0.lottie`.

Phát một lần từ frame 0 và giữ frame cuối, không loop toàn clip. Chữ bay từ ngoài frame, xếp xong ở 2,5s. Vòm fade in và ánh sáng quét đồng thời từ 2,6s đến 4,4s. Glow xuất hiện từ 3,5s đến 4,7s, rồi thở hai chu kỳ trong 6s đến 10,7s. Replay khởi động lại toàn bộ.

Ảnh glyph, blur và glow PNG giữ nguyên byte, không nén mất chất lượng. Font SF Pro Expanded Semibold đã rasterize 4× để giữ gradient theo chữ; không cần font runtime. Vòm và gradient quét là vector native. Không tạo canvas ngang riêng; host scale toàn bộ canvas gốc theo tỉ lệ.

full-app-preview/index.html chạy offline qua CanvasKit Skottie 0.41.1, runtime và WASM đi kèm. Preview cũ có thể còn lựa chọn size ngang; tích hợp mới chỉ dùng canvas gốc; mode=sequence và mode=single&state=0 cùng mở splash từ đầu; embed=1 ẩn header và giữ nút phát/tua. Preview chỉ hỗ trợ clip 0.

Tích hợp: nạp .lottie bằng player hỗ trợ Lottie image assets và native gradient fill/stroke; đặt speed=1, loop=false, giữ frame cuối. Canvas gốc duy nhất 466 × 678; host tự resize khi mở ngang. Không tự đổi easing hoặc giảm FPS. Đây là bộ splash mới độc lập với SmartHue kết nối đèn.

Đã kiểm tra trên Skottie web: frame đầu/giữa/cuối và các beat chữ, vòm, glow. Chưa kiểm tra trên iPhone Duo thật. CanvasKit BSD-3-Clause: canvaskit-LICENSE.txt.

Kho: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-splash&variant=466x678&clip=flow
