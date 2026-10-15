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

