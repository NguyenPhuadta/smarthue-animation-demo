# SmartHue Siri · Turn off / Turn on — v2.0.0

Chỉ hỗ trợ hai thao tác hiện tại: tắt đèn và bật đèn. Đã bỏ toàn bộ câu Chill Mode, glow của câu đó và ảnh phòng tím. Luồng: phòng vàng → “Hey Siri, turn off the living room lights” → phòng tối → “Hey Siri, turn on the living room lights” → phòng vàng → loop.

Một clip 6,6 giây; 60 FPS; speed=1; loop=true; ip=0, op=396 exclusive. Giữ easing, text và motion của các đoạn off/on trong bản nguồn, chỉ dịch timeline -144 frame. Crossfade tắt chuyển trực tiếp từ ảnh vàng sang ảnh tối. Không có audio, microphone, Siri SDK hoặc lệnh điều khiển đèn thật.

| Frame [start,end) | Giây | Nội dung |
| --- | --- | --- |
| 0–36 | 0–0,6 | Phòng vàng, nghỉ trước câu |
| 36–126 | 0,6–2,1 | Câu turn off trên phòng vàng |
| 126–162 | 2,1–2,7 | Crossfade vàng → tối; caption/glow hết ở frame 150 (2,5s) |
| 162–198 | 2,7–3,3 | Phòng tối, nghỉ trước câu |
| 198–321 | 3,3–5,35 | Câu turn on; caption/glow fade out frame 300–321 (5–5,35s) |
| 321–378 | 5,35–6,3 | Crossfade tối → đúng ảnh vàng ban đầu |
| 378–396 | 6,3–6,6 | Giữ vàng, nối vòng về frame 0 |

Timing caption turn off: fade in frame 36–48; glow 36–56; phần lệnh 60%→100% frame 66–90; fade out 126–150.
Timing caption turn on: fade in 198–210; glow 198–218; phần lệnh 60%→100% frame 228–252; fade out 300–321.

Mapping thiết bị:
- 466×444: iPhone Duo gập dọc → smarthue-voice-room-on-off-466x444-v2.0.0.lottie.
- 951×669: iPhone Duo mở ngang → smarthue-voice-room-on-off-951x669-v2.0.0.lottie.
- 473×669: iPhone Duo mở ngang, partially folded → smarthue-voice-room-on-off-473x669-v2.0.0.lottie.

Host cung cấp trạng thái/layout; không đoán bằng viewport. Dùng contain/aspect-fit và scale đồng đều, không crop/stretch hoặc di chuyển từng layer.

Trong .lottie: manifest.json animation id room; animations/room.json; images/ chứa room-warm, room-dark, caption-glow và halo off/on; fonts/SFPro-Bold.ttf (fName SFPro-Bold, fFamily SF Pro, fStyle Bold). Nạp font qua resolver đúng tên. Chữ và glow nằm trong asset, không vẽ lại bằng UI host. Native text, PNG/JPEG, precomposition cần được player hỗ trợ.

Đề xuất host: chuẩn bị assets/font trước khi hiển thị; play toàn [0,396) loop, pause khi view ẩn, resume khi quay lại và dispose khi unmount. Không dùng marker để gửi lệnh đèn thật. Không đưa runtime CanvasKit/WASM vào app native.

Đã xem preview Skottie web 466×444 ở câu tắt, câu bật và cuối vòng. Bản 951×669/473×669 dùng cùng phép cắt và kiểm tra cấu trúc; chưa xem render của hai variant đó hoặc kiểm tra native/device thật.

ZIP này chỉ có 3 file .lottie + README. Preview web nằm trên stock. Asset, preview và ZIP cũ giữ nguyên để tương thích lịch sử; dùng v2.0.0 cho tính năng hiện tại.

---

## Lịch sử bàn giao (đã thay bằng v2.0.0)

# SmartHue · Điều khiển Siri — v1.2.0 compact

<!-- device-variant-mapping:start -->
## Chọn variant theo thiết bị — dành cho dev / coding agent

Kích thước dưới đây là canvas của animation, không phải độ phân giải màn hình hay tên model thương mại.

| Variant / canvas | Thiết bị và trạng thái sử dụng | Cách chọn file |
| --- | --- | --- |
| `466x444` · 466 × 444 px | iPhone Duo **gập dọc** | Chọn file `.lottie` có `466x444` trong tên. |
| `951x669` · 951 × 669 px | iPhone Duo **mở ngang** | Chọn file `.lottie` có `951x669` trong tên. |
| `473x669` · 473 × 669 px | iPhone Duo **mở ngang, partially folded (gập một phần)** | Chọn file `.lottie` có `473x669` trong tên; không dùng bản mở ngang 951x669 thay thế. |

Hướng dẫn tích hợp:

- Chọn đúng collection của tính năng trước, sau đó chọn variant theo bảng. Không dùng file phòng khách cho phòng ngủ/hành lang hoặc Chill/Basic Mode.
- Khi trạng thái gập/mở hoặc hướng màn hình đổi, host chọn lại variant tương ứng; không chỉ kéo giãn bản cũ để giả lập layout mới.
- Giữ tỉ lệ canvas khi hiển thị; không stretch, crop hoặc tự đổi vị trí chữ/glow để lấp đầy container. Kích thước hiển thị có thể scale đồng đều theo layout app.
- Không suy ra thiết bị chỉ từ chiều rộng/chiều cao màn hình. Host phải cung cấp trạng thái thiết bị/layout; nếu chưa có mapping, hỏi lại thay vì đoán.
- Dùng file `.lottie` được bàn giao cho variant; HTML preview chỉ dùng để xem. Giữ FPS, speed, loop và nội dung theo hướng dẫn riêng của bộ này.

Bảng này là hướng dẫn chọn thiết bị; các mô tả “bản dọc/bản ngang” trong lịch sử bên dưới không thay thế mapping trên. Việc có source local không có nghĩa variant đã có trong ZIP/release cũ; kiểm tra danh sách file của release đang tích hợp.
<!-- device-variant-mapping:end -->

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
