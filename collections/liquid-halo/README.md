# Liquid Halo · iPhone Duo — v1.2.1 (2026-10-20)

## Bắt buộc cho agent / dev: chọn đúng kích thước

| File | Canvas | Trường hợp sử dụng |
| --- | --- | --- |
| liquid-halo-136.lottie | **136 × 136 px** | **iPhone Duo lúc gập** (folded / closed) |
| liquid-halo-200.lottie | **200 × 200 px** | **iPhone Duo lúc mở ngang** (unfolded, landscape) |

Đây là mapping sản phẩm do chủ dự án chỉ định. Agent phải chọn theo trạng thái gập/mở của thiết bị, **không suy đoán chỉ từ chiều rộng màn hình**, không tráo hai file và không dùng bản 720 × 540 cũ thay cho hai bản này. Cả hai là canvas vuông thật; giữ aspect ratio 1:1 và không stretch/crop trong app. Các kích thước px là kích thước canvas/tài nguyên; host quyết định layout và mật độ điểm ảnh phù hợp.

## Nhịp và tích hợp

Cả hai file: **60 FPS, speed 1.0, ip=0, op=1280 exclusive, 21.33333333 giây**. Mỗi file chứa bốn chu kỳ giống nhau, **320 frame = 5.33333333 giây/chu kỳ**. Loop toàn bộ file liên tục, không chèn pause, không gọi replay hoặc reload file mỗi chu kỳ. State duy nhất là **0**. Full sequence và single đều mở từ frame 0 và loop cùng animation; không có nhánh success/error.

Khi iPhone Duo đổi trạng thái, chuyển sang file có kích thước tương ứng tại **cùng normalized progress hoặc cùng frame modulo 320**. Tránh bắt đầu lại từ frame 0 khi đổi size nếu animation vẫn đang hiển thị. Khi app rời màn hình, host có thể pause/stop; resume giữ phase nếu sản phẩm cần liên tục.

Vầng sáng #33A0FF, bóng đèn SVG trắng lớn hơn từ bản v1.1.0. Khối cầu giữ bán kính cố định, hiện xuyên suốt lúc ánh sáng chuyển pha. Chuyển động được giãn nhịp, nội suy với tangent dùng chung và làm mềm chuyển vận tốc, giảm lóe sáng khi edge-on, nối vòng tuần hoàn không có frame giữ giả. Hai kích thước dùng cùng timing và cùng hình học; chỉ khác transform bố cục đồng nhất. Phản chiếu sàn được đặt lại để nằm trong canvas vuông. **Nền đen opaque**, không transparent; không bỏ layer nền/sàn hay masks.

## Preview và assets

Mở `full-app-preview/index.html`, chọn 136 hoặc 200; tất cả runtime và animation data đều nằm trong gói. Từng preview hỗ trợ `mode=sequence`, `mode=single&state=0`, `embed=1`, có phát lại/tạm dừng/scrub và hiển thị ở kích thước thật. Không tải font/ảnh từ mạng. Tất cả artwork là native vector/gradient, không external image/font assets.

Stock 136: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=liquid-halo&variant=136x136&clip=flow

Stock 200: https://nguyenphuadta.github.io/smarthue-animation-demo/?collection=liquid-halo&variant=200x200&clip=flow

## Thay đổi và kiểm tra

v1.2.1: vệt sáng cuối vòng quay, bloom và phản chiếu sàn mờ dần trong 42 frame (0,7 giây), mất hoàn toàn trước khi chuyển pha. Giữ nguyên shading khối cầu, hình học, kích thước, FPS và nhịp loop. Bản ZIP v1.2.0 được giữ nguyên.

v1.2.0 thay thế bố cục 720 × 540 bằng hai kích thước iPhone Duo; chu kỳ từ 194 lên 320 frame để chuyển động dịu hơn; giữ sphere fixed-radius và bóng đèn trắng to. Các ZIP v1.0.0/v1.1.0 và preview gốc vẫn được giữ nguyên để các link bàn giao cũ hoạt động.

Đã render toàn bộ chu kỳ bằng CanvasKit Skottie; kiểm tra kích thước, JSON, manifest .lottie, ZIP và source hash; kiểm tra browser stock/native-size và điểm nối. Preview stock dùng runtime lottie-web hiện có (MIT), có adapter `hasMask` chỉ khi nạp preview để xử lý mask tangents; file .lottie giữ đúng byte nguồn của bản này. Chưa kiểm tra dotlottie-ios trên iPhone thật, chưa chứng nhận FPS thiết bị. Preview offline được đóng gói đủ phụ thuộc; browser automation chỉ cho HTTP(S) nên chưa mở trực tiếp file://.

## Source SHA-256

- 136: `74151104edf8a97fff574c2bae3c64631eae329117edbb03be629da4e6455859`
- 200: `0b60ab9a009226d9ec2f43fd042d437cf1260f2f7d4e6546ee5eaf01b0f15578`
