# SmartHue · Splash — v1.0.0

23/10/2026. Canvas 466 × 678 và 951 × 669 px (iPhone Duo mở ngang). 60 FPS, speed 1×, ip 0, op 642 exclusive: 10,7 giây. Nền đen được nhúng trong animation.

Hai file smarthue-splash-466x678-v1.0.0.lottie và smarthue-splash-951x669-v1.0.0.lottie.

Phát một lần từ frame 0 và giữ frame cuối, không loop toàn clip. Chữ bay từ ngoài frame, xếp xong ở 2,5s. Vòm fade in và ánh sáng quét đồng thời từ 2,6s đến 4,4s. Glow xuất hiện từ 3,5s đến 4,7s, rồi thở hai chu kỳ trong 6s đến 10,7s. Replay khởi động lại toàn bộ.

Ảnh glyph, blur và glow PNG giữ nguyên byte, không nén mất chất lượng. Font SF Pro Expanded Semibold đã rasterize 4× để giữ gradient theo chữ; không cần font runtime. Vòm và gradient quét là vector native. Bản ngang giữ kích thước artwork ở tâm và kéo điểm vào ra ngoài canvas mới; các nhịp còn lại giữ nguyên.

full-app-preview/index.html chạy offline qua CanvasKit Skottie 0.41.1, runtime và WASM đi kèm. Dùng ?size=951x669 để mở bản ngang; mode=sequence và mode=single&state=0 cùng mở splash từ đầu; embed=1 ẩn header và giữ nút phát/tua. Preview chỉ hỗ trợ clip 0.

Tích hợp: nạp .lottie bằng player hỗ trợ Lottie image assets và native gradient fill/stroke; đặt speed=1, loop=false, giữ frame cuối. Kích thước bản dọc 466×678; bản ngang951×669. Không tự đổi easing hoặc giảm FPS. Đây là bộ splash mới độc lập với SmartHue kết nối đèn.

Đã kiểm tra trên Skottie web: frame đầu/giữa/cuối và các beat chữ, vòm, glow. Chưa kiểm tra trên iPhone Duo thật. CanvasKit BSD-3-Clause: canvaskit-LICENSE.txt.

Kho: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-splash&variant=466x678&clip=flow

## Web preview — 23/10/2026

Bổ sung software Skottie fallback khi Chrome không có WebGL, cùng mã cache runtime 20261023-runtime2. Không đổi animation, ảnh, FPS, keyframe hoặc file bàn giao đã duyệt. Đã kiểm tra cả hai preview với renderer=software; chưa xác nhận trên máy người dùng đang gặp lỗi.
