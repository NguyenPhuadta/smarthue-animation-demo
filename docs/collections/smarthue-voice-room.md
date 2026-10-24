# SmartHue · Điều khiển Siri — v1.2.0 compact

Hai bản iPhone Duo, 60 FPS, speed 1×, ip 0, op 540 exclusive: 9 giây, lặp toàn bộ.

| Thiết bị | Canvas | File | Dung lượng .lottie |
| --- | --- | --- | --- |
| iPhone Duo gập dọc | 466 × 444 | smarthue-voice-room-466x444-v1.2.0.lottie | 789.414 byte |
| iPhone Duo mở ngang | 951 × 669 | smarthue-voice-room-951x669-v1.2.0.lottie | 853.741 byte |

Phiên bản này tối ưu theo yêu cầu mỗi file bàn giao dưới 1 MB. Giữ nguyên độ phân giải ảnh phòng (897×855 ở bản dọc; 951×669 ở bản ngang), đổi PNG phòng sang JPEG chất lượng 95, chroma 4:4:4. Glow PNG giảm từ 2× xuống 1×, các text halo PNG từ 4× xuống 2×. Tỷ lệ layer ảnh bù lại đúng kích thước hiển thị. Chữ SF Pro Bold 32px vẫn native, font subset được nhúng; không rasterize chữ. Đây là nén ảnh có mất dữ liệu nhẹ. Các file và ZIP v1.0.0/v1.1.0 giữ nguyên để khôi phục bản chất lượng cao.

Luồng: phòng vàng → “Hey Siri, set living room to Chill Mode” → hồng tím → “Hey Siri, turn off the living room lights” → tối → “Hey Siri, turn on the living room lights” → ảnh vàng đầu. Lặp liên tục 0–540. Mỗi câu “Hey Siri” sáng trước, lệnh 60% rồi lên 100%. Giữ phòng 0,5–0,6s trước câu. Bố cục, góc máy, toàn bộ keyframe/easing/opacity/FPS/thời lượng giữ nguyên.

JSON ở animations/room.json, ảnh ở images/, font ở fonts/SFPro-Bold.ttf. Player tích hợp cần hỗ trợ native text + PNG/JPEG và nạp font nhúng. Đặt loop=true, speed=1. Nền phòng được nhúng, không trong suốt. Không có audio.

Preview dùng CanvasKit Skottie 0.41.1, software fallback khi không có WebGL; ?renderer=software để chọn trực tiếp. full-app-preview/index.html là bản gập dọc; full-app-preview/951x669/index.html là bản ngang. Mỗi preview chạy offline, có toàn bộ dữ liệu, runtime, WASM và font. mode=sequence và mode=single&state=0 đều bắt đầu clip từ đầu rồi loop; embed=1 ẩn header; ?frame=0/270/539 để pause ở frame cụ thể. Không lưu frame cũ vào localStorage.

Đã kiểm tra trước/sau bằng Skottie ở 11 beat frame mỗi size; frame đầu và cuối trùng nhau. So với bản v1.1.0: PSNR 47,3–49,8dB cho bản dọc và 44,4–45,5dB cho bản ngang ở ba frame đại diện. Chưa kiểm tra trên iPhone Duo thật; không suy ra hiệu năng iOS từ preview web.

Kho gập dọc: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=466x444&clip=flow

Kho mở ngang: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=951x669&clip=flow

Gói ZIP chứa cả hai .lottie + preview offline nên lớn hơn dung lượng từng file animation. Giấy phép CanvasKit: canvaskit-LICENSE.txt.
