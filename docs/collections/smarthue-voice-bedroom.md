# SmartHue bedroom — draft v1

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

Canvas: 466 × 444 px. 60fps. 360 frames / 6 seconds. Speed 1. Continuous loop.

Sequence: warm room pause → Hey Siri, dim command → command brightens → turn lamp off → dark room pause → Hey Siri, dim command → command brightens → turn lamp on → warm hold.

Text, placement and warm glow follow Figma section 794:1775. On and off captions use the exact two line breaks shown in the screenshot. Typography is native Lottie SF Pro Bold, subset embedded in the package with all needed glyphs. Images and font are packed into the .lottie file. The supplied on photo and golden blur are preserved unchanged. Only the AI-generated off photo is resized to 466 × 444.

The off photo was edited using the built-in image_gen tool from the supplied on photo; geometry was visually checked. AI editing does not guarantee pixel-identical geometry. The original and generated source files are retained for inspection.

Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-bedroom&variant=466x444&clip=flow (Skia CanvasKit/Skottie, same runtime as the stock preview). The original authoring player and text-to-lottie folder currently point to an unmounted Hi Bbi Workspace volume; this draft was checked in the available Skottie runtime. No claim of validation on an iPhone device.

Validation: 10 semantic Skottie frames; exact PNG match of frames 0 and 359; .lottie ZIP integrity and asset references checked. Published as its own bedroom collection.


# SmartHue bedroom — iPhone Duo mở ngang v1

951 × 669 px · 60 FPS · 360 frames / 6 seconds · speed 1 · continuous loop.

Same command rhythm, opacity animation and timing as the 466 × 444 bedroom version. Native SF Pro Bold 32 px captions and supplied golden glow follow Figma frame 794:1917. Caption centre x247, y188.9; glow centre x247, y188.5. Caption run translation from portrait: +14, −43. Glow translation: +14, −33.

On photo: user supplied. Off photo: built-in image_gen lighting edit of that same landscape photo. Prompt retained in imagegen-prompt.txt; generated original retained in room-off-generated-v1.png. AI edit geometry visually inspected; no claim of pixel-perfect identity.

Both room photos are 951 × 669 JPEG quality 95 with 4:4:4 chroma. Source PNG retained. Supplied blur and text halo images retained. All font and image dependencies embedded in SmartHue-Bedroom-951x669-v1.lottie.

Final file: 724,905 bytes (724.9 KB, below 1,000,000 bytes).

Validated: JSON dimensions/FPS/duration, unchanged opacity/easing and caption precomps, all ZIP asset/font references, ZIP integrity, 10 native Skottie semantic frames, exact rendered loop seam at frames 0 and 359. Local browser preview plays with no console errors. No validation on actual iPhone hardware.

Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-bedroom&variant=951x669&clip=flow
Published as its own bedroom collection.


Offline preview: full-app-preview/index.html (portrait), full-app-preview/951x669/index.html (landscape). Native SF Pro Bold font, PNG/JPEG images and CanvasKit runtime included. No audio. Portrait .lottie: 884,477 bytes. Landscape .lottie: 724,905 bytes. Each standalone file is under 1,000,000 bytes. ZIP includes duplicate preview data and runtime and is larger.


# Bản dọc 473 × 669 · v1

# SmartHue Siri phòng ngủ · 473 × 669

60 FPS · 6 giây · 360 frames · speed 1× · loop liên tục.

- File bàn giao: SmartHue-Bedroom-473x669-v1.lottie — 553,033 byte.
- Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-bedroom&variant=473x669&clip=flow
- Figma: ruonGWPEODjg9ckwcdXVwV / 799:3152; screenshot lưu tại figma-reference.png.

Dùng ảnh gốc dọc 2.png và blur dọc 1.png người dùng cung cấp. Giữ nguyên blur 231×669 tại x242,y0, phía trên toàn bộ nội dung. Ảnh bật dùng stock mới nguyên bố cục. Ảnh tắt dùng bản đã duyệt của size ngang, crop x101..574 ở độ phân giải951×669; stock bật mới khớp cùng crop với sai khác RGB trung bình1.92/255. Không gen lại nội thất.

Caption native SF Pro Bold32px; dùng font nhúng của bộ phòng ngủ hiện có. Caption dịch[3,-80], tâm236,151.9. Glow từ SVG Figma, tâm236,151.5; kích thước hiển thị722.4×507.4, PNG723×508. Blur phải dùng nguyên byte file người dùng gửi. Ảnh phòng JPEG95/4:4:4 ở473×669; toàn bộ image/font nhúng trong .lottie.

Giữ nguyên keyframe/easing và luồng của bộ phòng ngủ: nghỉ0.5s → Hey Siri, turn off the bedroom lights → tắt đèn → nghỉ → Hey Siri, turn on the bedroom lights → bật lại → lặp. Không audio, nền opaque.

Đã render các frame mốc trong Skottie, đầu/cuối khớp; đã mở scene trong player chính thức text-to-lottie. Chưa kiểm tra thiết bị iOS thực tế.
