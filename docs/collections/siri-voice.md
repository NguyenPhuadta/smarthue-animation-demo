# Siri · Sóng sáng — size gốc 88 × 88

## Quy tắc bàn giao hiện tại — bộ 04 · một size gốc

**Chỉ dùng canvas 88 × 88 px (`88x88`) cho mọi trạng thái thiết bị.** Khi iPhone Duo mở ngang hoặc partially folded, dev / coding agent tiếp tục dùng chính file gốc và resize view chứa player bằng code host; không cần asset Lottie riêng cho màn ngang.

- Giữ nguyên file `.lottie`, timeline, keyframe, FPS, speed và quy tắc phát của bộ này. Resize chỉ đổi kích thước hiển thị.
- Scale đồng đều hai chiều, giữ tỉ lệ gốc. Dùng aspect-fit/contain trong container mà layout app dành cho animation; không stretch hoặc crop artwork.
- Với container `W × H`, canvas gốc `w × h`: `scale = min(W / w, H / h)`; kích thước hiển thị `w × scale`, `h × scale`. Căn giữa trong container; khoảng trống do host layout xử lý.
- Khi đổi hướng/gập/mở, cập nhật layout và kích thước view, giữ nguyên asset và tiến trình playback; không tự replay chỉ vì resize.
- Container hiển thị lấy từ design/layout app, không tự suy ra bằng kích thước toàn màn hình. Nếu chưa có thông số layout, hỏi lại Phú.
- Các bản kích thước phụ trong release/link cũ chỉ để tương thích lịch sử, **không phải file dev cần tích hợp mới**. ZIP hiện tại chỉ bàn giao một size gốc cho bộ này.

File tích hợp: `siri-voice-88x88-v1.1.1.lottie`. 60 FPS · 15,8 giây · speed 1× · loop toàn clip.

Nền ngoài khối cầu trong suốt: đã bỏ layer Black Solid 1 và hai ellipse Gaussian Blur phía sau khối cầu (Ellipse 71607, Ellipse 71606). Mặt cầu tối, dải sóng và viền sáng vẫn là nội dung của animation. Không có image/font bên ngoài. File gốc 88 × 88 giữ nguyên toàn bộ keyframe, easing, opacity, thời lượng, FPS và palette đã chọn. Khối cầu chiếm khoảng 90–96% frame khi chuyển động.

Size gốc: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=siri-voice&variant=88x88&clip=flow

## Preview và chỉnh màu

Mở full-app-preview/index.html để chạy offline. Preview cũ có thể còn bộ chọn size; tích hợp mới chỉ dùng file 88 × 88. Mặc định xem đúng pixel, có phóng 4× để soi chi tiết. Nền ô trong suốt / sáng / tối chỉ để xem thử, không nằm trong Lottie hay export.

mode=sequence và mode=single&state=0 đều mở clip duy nhất từ frame 0; embed=1 ẩn header, giữ playback và chỉnh màu. Không dùng trạng thái clip từ localStorage. Phát lại bắt đầu frame 0; tạm dừng và thanh tiến trình điều khiển clip. Animation gốc lặp toàn bộ 15,8 giây; không cắt lại hay tối ưu điểm nối của animation gốc.

Bật Đổi màu dải sáng để chỉnh Màu dải sáng. Bật Đổi màu viền để chỉnh Viền trái / Viền phải riêng. Tắt toggle tương ứng để dùng màu gốc phần đó. Khôi phục bản đã duyệt trả về palette đã chọn khi xuất bản. Tải Lottie đang chỉnh xuất đúng kích thước, nền trong suốt và màu hiện tại. ZIP chứa palette mặc định của bản bàn giao.

Native slots: waveTintAmount, waveTintColor, rimTintAmount, rimLeftColor, rimRightColor. Amount 0/100; RGBA 0..1. Slots được đồng bộ vào fallback để player không hỗ trợ slots vẫn đọc màu đã chọn. Các effect cần hỗ trợ: native Tint (ty 20), Gaussian Blur (ty 29), masks, track mattes.

Preview dùng CanvasKit Skottie 0.41.1, cùng runtime với player authoring. Runtime/WASM được đóng gói đủ; WASM nhúng JavaScript để mở offline. Native Skottie đã kiểm tra frame đầu, giữa, cuối ở cả hai kích thước, nền phẳng đã trong suốt, glow giữ alpha mềm và tâm có nội dung. Preview web không xác nhận FPS hay chất lượng trên iOS thật; chưa kiểm tra trên thiết bị iPhone Duo.

Thay đổi từ v1.1.0: bỏ hai lớp blur nền phía sau khối cầu ở cả hai size. Giữ chuyển động, dải sóng sáng, viền và bộ chọn màu. Gói v1.0.0 và đường dẫn file cũ vẫn được giữ lại. CanvasKit: BSD-3-Clause (canvaskit-LICENSE.txt); fflate: MIT (vendor-notices.txt).
