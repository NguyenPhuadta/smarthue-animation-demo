# Kho animation stock của Phú

Thư viện các bộ animation đã làm: xem full luồng, xem từng clip, chọn kích thước và tải gói bàn giao.

- Kho: https://nguyenphuadta.github.io/smarthue-animation-demo/
- SmartHue 362×300: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=smarthue&variant=362x300&clip=flow
- Hướng dẫn bắt buộc cho agent thêm/sửa bộ: [docs/ANIMATION-PUBLISHING.md](docs/ANIMATION-PUBLISHING.md).
- Danh sách bộ và metadata: stock/catalog.json. Đây là nguồn dữ liệu của trang kho; không hardcode card.

Website tĩnh trên GitHub Pages, không cần build. Dùng static server ở thư mục repo để xem local. Các link preview cũ vẫn hoạt động; root với mode/state/clip cũ chuyển sang original-demo.html. Bản 362×300 và bản 393×326 giữ nguyên nội dung/chuyển động, 60 FPS, speed=1. Bản thử tối ưu không được đưa vào catalog được đề xuất.

Quy tắc phát, lặp, chuyển cảnh, thời lượng và nền được mô tả riêng cho từng bộ. Với SmartHue, đọc [docs/collections/smarthue.md](docs/collections/smarthue.md) cùng README trong ZIP. Không áp dụng quy tắc của bộ này cho bộ khác.

## Chọn size cho các animation voice control

| Nhóm | iPhone Duo gập dọc | iPhone Duo mở ngang | iPhone Duo mở ngang, partially folded |
| --- | --- | --- | --- |
| SmartHue Siri phòng khách / phòng ngủ / hành lang | 466 × 444 | 951 × 669 | 473 × 669 |
| SmartHue Siri Chill / Basic Mode | 466 × 444 | 951 × 669 | 473 × 669 |
| Siri · Sóng sáng | 88 × 88 | Dùng lại 88 × 88, host resize | Dùng lại 88 × 88, host resize |

Dev / coding agent đọc README trong `collections/<collection-id>/README.md` hoặc README trong ZIP trước khi chọn file. Host chọn theo trạng thái thiết bị, giữ tỉ lệ canvas và đổi variant khi layout thay đổi. Không suy ra mapping giữa các bộ khác nhau.

## Bộ 02, 04, 05 — dùng chung một size gốc

Bridge (02): 362 × 362. Siri sóng sáng (04): 88 × 88. Splash (05): 466 × 678. Dev dùng cùng file gốc cho gập dọc, mở ngang và partially folded, scale đồng đều bằng host code theo container design; không tạo hay chọn asset ngang riêng. README trong từng bộ/ZIP có công thức aspect-fit và quy tắc giữ playback khi resize. Quy tắc này thay hướng dẫn nhiều size trước đây của ba bộ này.
