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

## Material tách riêng và storyboard Figma

Toàn bộ ảnh, font, JSON và manifest của cả ba variant, kèm 7 snapshot minh họa: https://nguyenphuadta.github.io/smarthue-animation-demo/handoff/smarthue-voice-room-on-off-materials-v2.0.0-2026-11-20.zip

Storyboard: https://www.figma.com/design/ruonGWPEODjg9ckwcdXVwV/?node-id=2668-959

Material library: https://www.figma.com/design/ruonGWPEODjg9ckwcdXVwV/?node-id=2670-959
