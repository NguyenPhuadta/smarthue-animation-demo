# SmartHue · Điều khiển Siri — v1.3.0

Ba kích thước · 60 FPS · speed 1× · ip 0 / op 540 exclusive · 9 giây · lặp liên tục.

| Kích thước | Vai trò | File .lottie | Dung lượng |
| --- | --- | --- | ---: |
| 466 × 444 | iPhone Duo gập dọc | smarthue-voice-room-466x444-v1.2.0.lottie | 789,414 byte |
| 473 × 669 | Bản dọc mới | smarthue-voice-room-473x669-v1.0.0.lottie | 778,972 byte |
| 951 × 669 | iPhone Duo mở ngang | smarthue-voice-room-951x669-v1.2.0.lottie | 853,741 byte |

## Luồng animation

Phòng vàng → “Hey Siri, set living room to Chill Mode” → hồng tím → “Hey Siri, turn off the living room lights” → tối → “Hey Siri, turn on the living room lights” → ảnh vàng đầu. Mỗi câu “Hey Siri” sáng trước, phần lệnh bắt đầu ở 60% rồi lên 100%; có nhịp nghỉ nhẹ trước câu. Chuyển cảnh và easing giữ nguyên.

Bản 473 × 669 khớp Figma frame 799:3145: ảnh phòng do người dùng gửi, câu lệnh và glow ở phần trên, blur tối bên phải giữ nguyên file người dùng cung cấp. Các relight hồng tím/tối được crop từ stock đã duyệt cho cùng khung. Chữ SF Pro Bold là native Lottie; font, ảnh và glow đã nhúng. Nền không trong suốt. Không có audio.

## Preview online

- 466 × 444: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=466x444&clip=flow
- 473 × 669: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=473x669&clip=flow
- 951 × 669: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-room&variant=951x669&clip=flow

## Preview chạy offline

`full-app-preview/index.html` (466 × 444), `full-app-preview/473x669/index.html`, và `full-app-preview/951x669/index.html`. Mỗi preview dùng CanvasKit Skottie và có dữ liệu, font, runtime cần thiết. Mở HTML trong trình duyệt; các `.lottie` ở thư mục gốc dùng để tích hợp.

## Kiểm tra và giới hạn

Bản 473 × 669 đã render 15 frame mốc trên CanvasKit Skottie; frame 0 và 539 trùng byte. Kiểm tra web preview là kiểm tra player web, không xác nhận hiệu năng trên iPhone Duo thật.

CanvasKit license: `full-app-preview/canvaskit-LICENSE.txt`.
