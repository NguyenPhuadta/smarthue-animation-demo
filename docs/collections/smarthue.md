# SmartHue — hướng dẫn riêng của bộ animation

Chỉ áp dụng khi chỉnh sửa, đóng gói hoặc tích hợp bộ `smarthue`. Không áp dụng các quy tắc dưới đây cho bộ animation khác.

[Quay lại hướng dẫn chung của kho](../ANIMATION-PUBLISHING.md)

## Contract SmartHue đã chốt — phải giữ

- Có 8 file: 00, 01, 02, 03, 04, 05, 07, 08. Không cần 06 và không cần clip tìm đèn entry riêng.
- 00 Before Scan dài 8s, hướng dẫn tắt → chờ → bật. Sóng 10s là minh họa fill 1,5s, không phải đồng hồ đếm đủ 10 giây thật. Không tự scan khi intro kết thúc. Sau lượt đầu, loop frame [20,480).
- Scan Now là ngoại lệ duy nhất: app preload 01, fade riêng vùng animation 0 trong 280ms, dừng 00 rồi phát 01 từ frame 0 với opacity=1. UI app không fade. Không có fade out cuối clip được bake trong 00. Không thêm fade in/clip entry thứ hai. Nếu chưa preload xong, giữ intro đến khi 01 sẵn sàng rồi mới fade.
- Các clip khác phải phát hết trước khi chuyển. Sự kiện BLE giữa chừng lưu pending state, xử lý ở completion callback, không dùng timer ước lượng để cắt clip.
- Luồng thành công: 01 → 02 → 05 → 03 → 04. 01 chưa có kết quả thì lặp trọn clip; không tìm thấy thì 01 → 07. 03 chờ thì lặp trọn clip; timeout thì 03 → 08. 03 thành công chuyển thẳng 04, không có bridge 06.
- Khoảng cách gần là 15cm, xa là 2m. Giữ check và bóng chữ theo vị trí designer. Không áp localStorage cũ của công cụ căn chỉnh lên production.
- 60 FPS, speed=1. Bộ gốc 393×326, bản resize 362×300 giữ nguyên tỉ lệ nội dung. Background ngoài sàn trong suốt; sàn, mép mềm và bóng nằm trong animation. Nền app #0C0C0C. Không stretch/crop ảnh để vừa khung.
- Preview full luồng đợi Scan Now ở animation 0 rồi mới tiếp tục; production dùng BLE thật và không sao chép việc tự tiến/lặp toàn bộ demo.


## v20 — 20/10/2026

Preview chỉ hiển thị hiệu ứng 362×300 hoặc 393×326, đã bỏ toàn bộ khung và UI điện thoại. Nút Scan Now thuộc thanh điều khiển preview và vẫn giữ contract chuyển cảnh ở trên. Hai mép mờ trên/dưới sàn dùng #0C0C0C qua gradient màu, giữ alpha PNG gốc làm matte; sàn đổi thành precomposition, mọi chuyển động/keyframe/easing/opacity/kích thước/thời lượng cũ không đổi. ZIP v20 có 8 .lottie và preview cục bộ; các ZIP cũ vẫn được giữ. Chưa kiểm tra iOS thật.


## v21 — bốn mép mờ và controller gradient · 22/10/2026

Thêm gradient trái/phải cùng màu #0C0C0C và độ lan 180 px trong hệ tọa độ sàn 786×652, tương tự hai mép trên/dưới. Vẫn dùng nguyên alpha PNG làm matte; chỉ thay hình dạng tô màu trong precomposition sàn. Chuyển động, easing, opacity layer gốc, timing, FPS, tỉ lệ, font và dữ liệu ảnh gốc được giữ nguyên.

Panel **Gradient sàn** nằm ngay dưới animation, cả trong stock embed và full-app-preview. Chỉnh màu, độ đậm chung 0–100%, độ lan riêng mỗi mép 0–50% chiều rộng/chiều cao sàn. Giá trị % tính trong sàn gốc, không phải canvas. Các slider đổi trực tiếp trên frame hiện tại, không reset clip. Cấu hình được nhớ trên trình duyệt và dùng khi chuyển clip; nút **Mặc định** xoá các chỉnh sửa đang dùng và trở về màu #0C0C0C/độ đậm 100%/độ lan 180 px.

**Tải cấu hình** xuất JSON thông số. **Tải Lottie đang chỉnh** xuất một .lottie của clip đang xem, đã bake màu/độ lan/độ đậm hiện tại vào JSON cùng các ảnh nhúng. Gói ZIP stock luôn chứa bản mặc định, không tự cập nhật theo slider. Các export animation 00 vẫn cần font Inter trên runtime native như bản gốc; font cho HTML preview nằm ở before-scan/animation-0/Inter.ttf. Chưa xác minh renderer native/font resolution trên iOS thật.

Có các slot Lottie: `floorGradientOpacity` (number 0–100), `floorGradientTopEnd`, `floorGradientBottomEnd`, `floorGradientLeftEnd`, `floorGradientRightEnd` (vector [x,y] theo sàn 786×652). Web controller cập nhật cả fallback và slot khi export. Runtime không hỗ trợ slots vẫn dùng fallback đã bake. Màu gradient được bake trong `g.k`; không phải color slot đơn. Panel dành cho preview/thiết kế, không phải UI người dùng production. Hai runtime JS mới (floor-gradient.js, fflate.min.js) và license đi kèm để export offline; không gọi CDN.

Không thay contract Scan Now 280ms hoặc thứ tự/chế độ lặp từng clip. Kiểm tra Skottie và web không thay thế kiểm tra player trên iOS thật.

## v21.1 — sửa controller không hiện thay đổi

Đưa lớp màu nền trắng xuống sau bốn nhóm gradient theo thứ tự vẽ Lottie. Trước đây lớp này che gradient: thông số và file export thay đổi nhưng preview không thể hiện đúng. Controller và file export nay cùng dùng đúng thứ tự lớp; mọi màu/opacity/độ lan được render ngay, kể cả khi pause. Không đổi motion, timing hoặc PNG alpha gốc. Cache của dữ liệu và script được đổi để nhận bản sửa.
