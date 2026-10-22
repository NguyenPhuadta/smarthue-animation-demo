# Siri · Sóng sáng trong suốt — v1.1.1

Ngày 22/10/2026. Hai kích thước cùng chuyển động và cùng phase: 88 × 88 px và 200 × 200 px cho iPhone Duo mở ngang. 60 FPS, speed 1×, 948 frame (ip 0, op 948 exclusive), 15,8 giây mỗi chu kỳ. Host bật loop toàn clip.

| File | Canvas | Dùng cho |
| --- | --- | --- |
| siri-voice-88x88-v1.1.1.lottie | 88 × 88 | Bản nhỏ |
| siri-voice-200x200-v1.1.1.lottie | 200 × 200 | iPhone Duo mở ngang |

Nền ngoài khối cầu trong suốt: đã bỏ layer Black Solid 1 và hai ellipse Gaussian Blur phía sau khối cầu (Ellipse 71607, Ellipse 71606). Mặt cầu tối, dải sóng và viền sáng vẫn là nội dung của animation. Không có image/font bên ngoài. Bản 200 dùng parent transform của bản 88 nhân 200/88; toàn bộ keyframe, easing, opacity, thời lượng, FPS và palette đã chọn được giữ nguyên. Khối cầu chiếm khoảng 90–96% frame khi chuyển động.

88 px: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=siri-voice&variant=88x88&clip=flow

200 px: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=siri-voice&variant=200x200&clip=flow

## Preview và chỉnh màu

Mở full-app-preview/index.html để chạy offline. Chọn kích thước animation ở đầu trang; mặc định 88 px, dùng ?size=200x200 để mở bản 200. Mặc định xem đúng pixel, có phóng 4× để soi chi tiết. Nền ô trong suốt / sáng / tối chỉ để xem thử, không nằm trong Lottie hay export.

mode=sequence và mode=single&state=0 đều mở clip duy nhất từ frame 0; embed=1 ẩn header, giữ playback và chỉnh màu. Không dùng trạng thái clip từ localStorage. Phát lại bắt đầu frame 0; tạm dừng và thanh tiến trình điều khiển clip. Cả hai size lặp toàn bộ 15,8 giây; không cắt lại hay tối ưu điểm nối của animation gốc.

Bật Đổi màu dải sáng để chỉnh Màu dải sáng. Bật Đổi màu viền để chỉnh Viền trái / Viền phải riêng. Tắt toggle tương ứng để dùng màu gốc phần đó. Khôi phục bản đã duyệt trả về palette đã chọn khi xuất bản. Tải Lottie đang chỉnh xuất đúng kích thước, nền trong suốt và màu hiện tại. ZIP chứa palette mặc định của bản bàn giao.

Native slots: waveTintAmount, waveTintColor, rimTintAmount, rimLeftColor, rimRightColor. Amount 0/100; RGBA 0..1. Slots được đồng bộ vào fallback để player không hỗ trợ slots vẫn đọc màu đã chọn. Các effect cần hỗ trợ: native Tint (ty 20), Gaussian Blur (ty 29), masks, track mattes.

Preview dùng CanvasKit Skottie 0.41.1, cùng runtime với player authoring. Runtime/WASM được đóng gói đủ; WASM nhúng JavaScript để mở offline. Native Skottie đã kiểm tra frame đầu, giữa, cuối ở cả hai kích thước, nền phẳng đã trong suốt, glow giữ alpha mềm và tâm có nội dung. Preview web không xác nhận FPS hay chất lượng trên iOS thật; chưa kiểm tra trên thiết bị iPhone Duo.

Thay đổi từ v1.1.0: bỏ hai lớp blur nền phía sau khối cầu ở cả hai size. Giữ chuyển động, dải sóng sáng, viền và bộ chọn màu. Gói v1.0.0 và đường dẫn file cũ vẫn được giữ lại. CanvasKit: BSD-3-Clause (canvaskit-LICENSE.txt); fflate: MIT (vendor-notices.txt).
