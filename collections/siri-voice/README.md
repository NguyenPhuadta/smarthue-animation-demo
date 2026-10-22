# Siri · Sóng sáng 88 × 88 — v1.0.0

Bản đã duyệt ngày 22/10/2026. Canvas 88 × 88 px, 60 FPS, speed 1×, 948 frame (ip 0, op 948 exclusive), thời lượng 15,8 giây.

| File | Hành vi |
| --- | --- |
| siri-voice-88x88-v1.0.0.lottie | Một clip, lặp toàn bộ khi host bật loop |

Animation có nền đen, khối cầu, dải sóng sáng ở giữa và viền sáng hai bên. Nội dung lớn hơn khoảng 22,7% so với tỷ lệ trong frame 1080 gốc, khối cầu khoảng 75–84 px khi chuyển động. Keyframe, easing, FPS và thời lượng gốc được giữ lại; kích thước đổi bằng parent transform. Không có image/font phụ thuộc bên ngoài.

Preview: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=siri-voice&variant=88x88&clip=flow

## Chạy và chỉnh màu

Mở full-app-preview/index.html offline hoặc preview trên kho. Mặc định hiển thị đúng 88 px; có chế độ 4× để xem chi tiết. Phát lại bắt đầu frame 0; nút tạm dừng và thanh tiến trình điều khiển clip. mode=sequence và mode=single&state=0 đều mở clip duy nhất từ đầu. embed=1 ẩn header, giữ playback và chỉnh màu. Không dùng lựa chọn clip từ localStorage.

Bật Đổi màu dải sáng để dùng Màu dải sáng. Bật Đổi màu viền để chỉnh độc lập Viền trái / Viền phải. Tắt toggle tương ứng để dùng màu gốc của phần đó. Khôi phục bản đã duyệt trả về palette đã duyệt trong player trước khi xuất bản. Nút Tải Lottie đang chỉnh xuất đúng màu hiện tại vào fallback của effect và native slots. Gói ZIP luôn chứa bản đã duyệt, không tự đổi theo preview.

Native slot: waveTintAmount, waveTintColor, rimTintAmount, rimLeftColor, rimRightColor. Amount 0/100; RGBA 0..1. Hiệu ứng dùng native Tint (ty 20), Gaussian Blur (ty 29), masks và track mattes. Khi nhúng native, bật loop và speed=1. Player phải hỗ trợ các effect này để giữ đúng hình ảnh.

Source .lottie có giá trị slot hiện tại được đồng bộ vào fallback, giúp player không hỗ trợ slots vẫn hiển thị palette đã duyệt. Web preview của riêng bộ Siri dùng CanvasKit Skottie 0.41.1, cùng runtime với player authoring, để giữ đúng Gaussian Blur và track mattes. lottie-web SVG đã cho thấy các khối blur bị cắt ở hai viền nên không dùng cho bộ này. Runtime được đóng gói cùng preview; WASM nhúng trong JavaScript để mở offline không cần fetch file://. Render web không xác nhận chất lượng hay FPS trên iOS thật; chưa kiểm tra trên thiết bị iOS.

CanvasKit dùng BSD-3-Clause, kèm canvaskit-LICENSE.txt; fflate dùng MIT, kèm vendor-notices.txt. Animation nguồn do chủ kho cung cấp và duyệt trong phiên làm việc.

Thay đổi: resize frame về 88 × 88, phóng nội dung, thêm chỉnh màu dải sáng và hai viền, đóng gói stock v1.0.0.
