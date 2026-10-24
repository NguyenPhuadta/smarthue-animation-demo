# SmartHue · Siri hành lang — v1.0.0

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
