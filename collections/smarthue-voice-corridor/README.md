# SmartHue · Siri hành lang — v1.0.0

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

Hai bản iPhone Duo: 466 × 444 gập dọc (v1), 951 × 669 mở ngang (v2 đã sửa ảnh lệch). 60 FPS, speed 1, ip 0 / op 360, 6 giây, lặp liên tục. Không có audio.

Luồng: phòng sáng → Hey Siri sáng trước, dim the corridor light sáng dần từ 50% → đèn giảm sáng → nghỉ nhẹ → Hey Siri sáng trước, brighten the corridor light sáng dần → sáng lại → lặp. Giữ nguyên bố cục Figma, font SF Pro Bold 32px native và blur vàng.

Bản dọc dùng ảnh stock sáng và ảnh dim gen từ stock. Bản ngang v2 dùng cùng một ảnh stock ở mọi frame và lớp vector tối native 0→40→0% opacity; không dùng ảnh AI để tránh đồ vật xê dịch. Đây là dim đồng đều ảnh, không mô phỏng điều khiển riêng từng nguồn sáng. Hai bản giữ cùng nhịp và thời lượng.

File bàn giao đã nhúng đủ ảnh và font:
- SmartHue-Corridor-466x444-v1.lottie: 444,776 bytes.
- SmartHue-Corridor-951x669-v2.lottie: 473,804 bytes.
Mỗi file dưới 1,000,000 bytes. PNG glow/halo, JPEG ảnh quality 95 / 4:4:4 và font SF Pro đã subset. Player cần hỗ trợ native text, PNG/JPEG và font nhúng. Ảnh nền được nhúng, không trong suốt.

full-app-preview/index.html: bản dọc. full-app-preview/951x669/index.html: bản ngang v2. Preview offline kèm đầy đủ CanvasKit/Skottie runtime, WASM, font, ảnh. Giấy phép canvaskit-LICENSE.txt. mode=sequence, mode=single&state=0 phát từ đầu và lặp; embed=1 ẩn header; ?frame=N pause tại frame. Không lưu frame vào localStorage.

Đã kiểm tra ZIP/asset/font references, 10 beat frame Skottie cho mỗi size, vòng lặp frame 0/359 trùng PNG. Bản ngang dim giữ nguyên hình học từng pixel, RGB frame 160 bằng RGB frame 0 ×0.6 trong sai số làm tròn 0.4/255. Chưa kiểm tra trên iPhone thật.

Kho dọc: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-corridor&variant=466x444&clip=flow
Kho ngang: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-corridor&variant=951x669&clip=flow

ZIP chứa hai Lottie và preview/runtime nên lớn hơn dung lượng từng animation.


# Bản dọc 473 × 669 · v1

# SmartHue Siri hành lang · 473 × 669

60 FPS · 6 giây · speed1× · loop liên tục. File: SmartHue-Corridor-473x669-v1.lottie —420,525 byte.

Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-corridor&variant=473x669&clip=flow

Figma799:3165, file ruonGWPEODjg9ckwcdXVwV. Screenshot được lưu ởfigma-reference.png. Chữ native SF Pro Bold32px, center236,334.9; glowcenter236,334.5. Glow dùng SVG Figma tại kích thước722.4×507.4. Blur phải nguyên file người dùng cung cấp231×669, đặtx242,y0, phủ trên toàn bộ ảnh/chữ.

Stock gốc dọc3.png giữ nguyên bố cục, JPEG95/4:4:4 ở473×669. Font và tất cả ảnh nhúng trong Lottie. Không audio; nền opaque. Giữ keyframe/easing/caption precomps/nhịp của bản951×669 v2 đã duyệt: nghỉ → Hey Siri, dim the corridor light → dim → nghỉ → Hey Siri, brighten the corridor light → sáng lại → loop.

Giữ nguyên một ảnh gốc toàn luồng; lớp native black dim0→40% ởframe108–144, giữ đến270, về0 ở270–306. Vì cùng ảnh nên không có dịch chuyển hình học khi đổi sáng. Native dim là giảm sáng toàn ảnh, không mô phỏng điều khiển từng nguồn sáng riêng.

Đã render các frame mốc bằng Skottie và mở trong official text-to-lottie player. Hai frame0/359 trùng nhau. Chưa kiểm tra thiết bị iOS thực tế.
