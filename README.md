# Kho animation stock của Phú

Thư viện các bộ animation đã làm: xem full luồng, xem từng clip, chọn kích thước và tải gói bàn giao.

- Kho: https://nguyenphuadta.github.io/smarthue-animation-demo/
- SmartHue 362×300: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue&variant=362x300&clip=flow
- Hướng dẫn bắt buộc cho agent thêm/sửa bộ: [docs/ANIMATION-PUBLISHING.md](docs/ANIMATION-PUBLISHING.md).
- Danh sách bộ và metadata: stock/catalog.json. Đây là nguồn dữ liệu của trang kho; không hardcode card.

Website tĩnh trên GitHub Pages, không cần build. Dùng static server ở thư mục repo để xem local. Các link preview cũ vẫn hoạt động; root với mode/state/clip cũ chuyển sang original-demo.html. Bản 362×300 và bản 393×326 giữ nguyên nội dung/chuyển động, 60 FPS, speed=1. Bản thử tối ưu không được đưa vào catalog được đề xuất.

Xem full app trước khi tích hợp. Ngoại lệ animation 0: Scan Now fade riêng vùng animation trong 280ms bằng code rồi phát 01 từ đầu. Những clip còn lại phải chạy hết trước khi đổi state; BLE giữa chừng lưu pending và xử lý ở completion callback. Đọc toàn bộ hướng dẫn và README trong ZIP, không tự thêm clip entry hoặc bridge 06.
