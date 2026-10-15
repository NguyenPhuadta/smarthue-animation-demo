# Kho animation stock của Phú

Thư viện các bộ animation đã làm: xem full luồng, xem từng clip, chọn kích thước và tải gói bàn giao.

- Kho: https://nguyenphuadta.github.io/smarthue-animation-demo/
- SmartHue 362×300: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue&variant=362x300&clip=flow
- Hướng dẫn bắt buộc cho agent thêm/sửa bộ: [docs/ANIMATION-PUBLISHING.md](docs/ANIMATION-PUBLISHING.md).
- Danh sách bộ và metadata: stock/catalog.json. Đây là nguồn dữ liệu của trang kho; không hardcode card.

Website tĩnh trên GitHub Pages, không cần build. Dùng static server ở thư mục repo để xem local. Các link preview cũ vẫn hoạt động; root với mode/state/clip cũ chuyển sang original-demo.html. Bản 362×300 và bản 393×326 giữ nguyên nội dung/chuyển động, 60 FPS, speed=1. Bản thử tối ưu không được đưa vào catalog được đề xuất.

Quy tắc phát, lặp, chuyển cảnh, thời lượng và nền được mô tả riêng cho từng bộ. Với SmartHue, đọc [docs/collections/smarthue.md](docs/collections/smarthue.md) cùng README trong ZIP. Không áp dụng quy tắc của bộ này cho bộ khác.
