# Kho animation stock của Phú

Trước khi thêm, sửa hoặc publish animation, đọc toàn bộ [docs/ANIMATION-PUBLISHING.md](docs/ANIMATION-PUBLISHING.md) và README của bộ cần sửa. Giữ mọi rule của AGENTS.md ở workspace cha.

- Cập nhật stock/catalog.json để thêm bộ; không hardcode card trong index.html.
- Luôn xem preview full app và từng clip; giữ link đã chia sẻ hoạt động.
- Đóng gói có phiên bản, giữ bản gốc đã duyệt. Không giảm keyframe/FPS hoặc nén ảnh mất chất lượng khi chưa có yêu cầu.
- Với SmartHue, Scan Now fade riêng animation 0 trong code 280ms rồi chạy thẳng 01. Clip khác phải hoàn tất trước khi đổi; BLE giữa chừng lưu pending.
- Kiểm tra desktop/mobile, console, link preview/download và chờ GitHub Pages xuất bản thành công trước khi báo link đã sẵn sàng.
