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
