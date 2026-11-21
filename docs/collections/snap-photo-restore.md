# Snap Photo · Colorize Photo · v7

Dùng `Snap-Photo-Restore-720x720-v7.lottie` trong app. Canvas 720 × 720, 60 FPS, 16 giây, speed 1×, lặp liên tục. Ảnh nhúng trong Lottie.

Bốn nhịp, mỗi nhịp 4 giây. Ảnh cũ → quét phục hồi màu và độ nét → giữ ảnh đã phục hồi → chuyển card ra sau. Bản này dùng viền trắng và góc nghiêng 6°.

Demo dialog dùng khung 240 × 184 CSS px và vẽ Lottie với nền trong suốt. Khi tích hợp bản Lottie vào dialog có nền riêng, bỏ hoặc ẩn layer `Background`. Giữ tỉ lệ canvas. Bản standalone trong gói vẫn có nền tối để xem riêng.

Mở demo offline bằng một static server, ví dụ chạy `python3 -m http.server 3040 --directory full-app-preview` tại thư mục giải nén rồi mở localhost:3040. Nút Continue trong demo đóng dialog.

Web stock: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=snap-photo-restore&variant=720x720&clip=flow
