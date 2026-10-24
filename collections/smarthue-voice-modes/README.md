# SmartHue · Siri Chill / Basic Mode — v1.0.0

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
