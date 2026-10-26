# SmartHue · Siri Chill / Basic Mode — v1.0.0

<!-- device-variant-mapping:start -->
**Phạm vi release hiện tại:** ZIP Chill/Basic Mode trên stock có 466x444 và 951x669. Bản 473x669 đã có source local nhưng chưa được đưa vào release này; không trỏ dev tới file chưa có trong ZIP.

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

Hai bản iPhone Duo: 466 × 444 px gập dọc và 951 × 669 px mở ngang.
60 FPS · speed 1× · ip 0 / op 360 · 6 giây · lặp liên tục · không audio.

| File | Dung lượng | Thời lượng |
| --- | ---: | ---: |
| SmartHue-Modes-466x444-v1.lottie | 624,027 bytes | 6 giây |
| SmartHue-Modes-951x669-v1.lottie | 668,057 bytes | 6 giây |

Luồng: phòng vàng → nghỉ 0,5 giây → “Hey Siri, set living room to Chill Mode”
→ chuyển tím hồng → nghỉ nhẹ → “Hey Siri, set living room to Basic Mode”
→ về đúng ảnh vàng ban đầu → lặp. Không có tương tác bắt buộc để tiếp tục.

Mỗi câu bắt đầu với Hey Siri sáng 100%, phần lệnh 60% rồi sáng dần 100%.
Glow vàng gốc hiện và tắt cùng caption. Ảnh đổi màu bằng crossfade 0,6 giây.
Giữ nguyên nhịp hai bản; vị trí text/glow riêng theo Figma. Ảnh nền kín khung,
không trong suốt. Bản dọc có gradient tối phía dưới; bản ngang không có gradient.

Ảnh, glow, text halo và font SF Pro Bold đã nhúng trong từng .lottie.
Chữ là native text, không phải ảnh chữ. Ảnh JPEG quality 95 / 4:4:4, giữ nguyên
độ phân giải nguồn đã duyệt; không nén thêm khi đưa lên kho. Ảnh tím hồng dùng
lại bản relight đã căn vị trí từ animation phòng khách trước. Không áp camera
motion hay di chuyển đồ vật; chi tiết texture của ảnh relight có thể khác ảnh gốc.
Đây là bộ riêng gồm hai lệnh Chill / Basic; không thay thế bộ Siri 9 giây cũ.

Tích hợp: dùng player hỗ trợ .lottie có ảnh JPEG/PNG và font nhúng, speed 1,
loop true. Dừng hoặc dispose theo lifecycle của màn hình. Cần test bằng player
thực tế của app trước phát hành. Chưa kiểm tra trên iPhone thật.

Offline: mở full-app-preview/index.html (dọc) hoặc
full-app-preview/951x669/index.html (ngang). Preview có đủ CanvasKit/Skottie,
WASM, font và ảnh, không cần CDN. Giấy phép runtime được kèm theo.
mode=sequence hoặc mode=single&state=0 phát từ đầu, embed=1 ẩn header;
?frame=N tạm dừng tại frame. Không khôi phục frame từ localStorage.

Đã kiểm tra native Skottie tại 10 beat frame mỗi size; frame 0 và 359 trùng PNG.
Đã kiểm tra ZIP, font, ảnh và .lottie giữ nguyên byte khi publish. ZIP lớn hơn
từng animation vì có cả hai Lottie và runtime preview offline.

Kho dọc: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-modes&variant=466x444&clip=flow
Kho ngang: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue-voice-modes&variant=951x669&clip=flow
