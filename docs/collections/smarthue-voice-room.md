# SmartHue · Điều khiển Siri — v1.1.0

Hai bản iPhone Duo, cùng 60 FPS, speed 1×; ip 0, op 540 exclusive: **9 giây**, lặp liên tục.

| Thiết bị | Canvas | File |
| --- | --- | --- |
| iPhone Duo gập dọc | 466 × 444 px | smarthue-voice-room-466x444-v1.0.0.lottie |
| iPhone Duo mở ngang | 951 × 669 px | smarthue-voice-room-951x669-v1.0.0.lottie |

Bản dọc giữ nguyên bytes từ v1.0.0. Bản ngang mới dùng ảnh sạch từ Figma frame 663:9393, cùng khung sofa trái/cây và cửa phải; caption/glow theo vị trí mẫu, SF Pro Bold 32px. Hai ảnh trạng thái tím/tối được gen từ cùng ảnh ngang gốc, căn lại theo cạnh ảnh. PNG phòng ngang 951×669, không nén JPEG.

Luồng: phòng vàng → “Hey Siri, set living room to Chill Mode” → phòng hồng tím → “Hey Siri, turn off the living room lights” → phòng tối → “Hey Siri, turn on the living room lights” → trở về ảnh vàng ban đầu. Lặp toàn bộ 0–540, không dừng cuối. Mỗi câu đều hiện “Hey Siri” sáng trước, lệnh 60% rồi lên 100%. Giữ phòng 0,5–0,6s trước mỗi câu. Không đổi góc máy.

Đây là bản local v5 được duyệt: ảnh PNG giảm nhẹ, dung lượng gói animation giảm khoảng 40% so với v3. Ảnh phòng 897×855; glow và text halo giữ độ phân giải nguồn. Các ảnh tím/tối được gen từ ảnh vàng, căn lại vị trí. Chữ SF Pro Bold 32 px native, font subset nhúng tại fonts/SFPro-Bold.ttf. Ảnh nằm trong images/, JSON trong animations/room.json. Không đổi keyframe, easing, FPS hoặc timing khi đóng gói. Nền phòng được nhúng, không trong suốt.

Tích hợp: dùng player hỗ trợ native text + ảnh, nạp cả font nhúng, speed=1, loop=true. Preview dùng CanvasKit Skottie 0.41.1, có software fallback nếu WebGL không khả dụng; dùng ?renderer=software để chọn trực tiếp. Đã kiểm tra Skottie web, chưa kiểm tra trên thiết bị iPhone Duo thật.

`full-app-preview/index.html` (gập dọc) và `full-app-preview/951x669/index.html` (mở ngang) chạy offline với animation-data.js, runtime, WASM và font đi kèm. mode=sequence và mode=single&state=0 đều khởi động clip từ đầu và lặp. embed=1 ẩn header, giữ điều khiển. ?frame=0/270/539 để kiểm tra khung cố định. Không lưu frame cũ vào localStorage.

Kho: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=466x444&clip=flow

Giữ các phiên bản local gốc và các bộ khác trong kho. Không áp dụng quy tắc phát một lần của Splash cho bộ này. Giấy phép CanvasKit: canvaskit-LICENSE.txt.


Kho bản ngang: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=951x669&clip=flow

Gói v1.1.0 gồm cả hai .lottie và preview offline hai kích thước. Các link gói v1.0.0 và file dọc vẫn hoạt động. Việc xuất bản giữ nguyên mọi keyframe, opacity, image bytes và font của cả hai bản đã duyệt. Bản ngang được kiểm tra 19 beat frame trong Skottie; đầu/cuối khớp, chưa chạy iPhone Duo thật.
