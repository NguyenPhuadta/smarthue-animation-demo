# Hướng dẫn agent: đóng gói và đưa animation lên kho của Phú

## Đọc trước khi làm

Kho công khai: https://nguyenphuadta.github.io/smarthue-animation-demo/
Repo: NguyenPhuadta/smarthue-animation-demo. Checkout hiện tại: deploy/smarthue-flow trong workspace hi bbi. Đây là website tĩnh dùng GitHub Pages, không cần build hay framework. Đọc AGENTS.md trong workspace và hướng dẫn riêng của bộ animation trước khi sửa.

Bắt buộc mở preview full app của bộ cần sửa, xem full luồng và từng clip trước khi tích hợp. Không coi ảnh chụp hoặc kiểm tra JSON là đủ để xác nhận chuyển động. Web preview không xác nhận hiệu năng trên iOS thật.

## Cấu trúc kho

- index.html, stock/library.css, stock/library.js: giao diện kho, màn chi tiết, bộ chọn clip/kích thước.
- stock/catalog.json: danh sách các bộ animation. Thêm bộ mới ở đây để nó xuất hiện trong kho; không hardcode thêm card trong HTML.
- stock/*-poster.png: ảnh đại diện tĩnh, không autoplay nhiều bộ trên trang danh sách.
- original-demo.html: preview SmartHue gốc 393×326; dùng chung assets và script ở thư mục gốc.
- resize-362x300/: preview SmartHue 362×300.
- handoff/: ZIP bàn giao có phiên bản rõ ràng.
- docs/ANIMATION-PUBLISHING.md: tài liệu này.

Không đưa các bản tối ưu thử nghiệm hoặc bản cũ chưa được duyệt vào danh sách chính. Bản thử nghiệm có thể tồn tại ở link riêng. Không xóa các link đã gửi team. Các link root cũ có mode/state/clip được trang chủ chuyển tiếp sang original-demo.html để tương thích.

## Thêm một bộ mới

1. Chọn slug không dấu, chữ thường và dấu gạch ngang, ví dụ lamp-reset. Tạo thư mục collections/lamp-reset/ chứa preview cùng toàn bộ dữ liệu phụ thuộc. Dùng đường dẫn tương đối để hoạt động trong project GitHub Pages. Không dùng đường dẫn /assets tính từ domain root, đường dẫn file trên máy hoặc port localhost trong bản publish.
2. Giữ file gốc đã duyệt. Không giảm keyframe, đổi FPS, thay easing hoặc nén ảnh mất chất lượng nếu chưa được yêu cầu. Tách bản mới khi đổi kích thước hoặc thử tối ưu. Ảnh, font, masks, track mattes và layer sàn phải đi cùng cảnh.
3. Preview phải nhận các tham số: mode=sequence mở full luồng; mode=single&state=ID mở đúng clip; embed=1 ẩn phần điều hướng trùng với trang kho nhưng giữ các điều khiển phát lại/tạm dừng. Một link full luồng phải khởi động từ đầu; không lấy lựa chọn cũ từ localStorage để ghi đè link. Single phải lặp theo contract của clip.
4. Làm poster PNG/WebP từ chính frame đã duyệt. Không đưa screenshot có thanh trình duyệt hoặc toàn bộ công cụ editor lên làm ảnh đại diện.
5. Đóng gói ZIP vào handoff/<slug>-<version>.zip. Bên trong gồm các .lottie, README.md mô tả tích hợp và thư mục full-app-preview chạy offline có tất cả ảnh/font/runtime cần thiết. Không kèm file JSON rời ở thư mục gốc nếu người dùng chỉ cần Lottie. JSON/JS bên trong HTML preview được phép. Chạy kiểm tra ZIP và kiểm tra .lottie có manifest cùng animation/assets hợp lệ.
6. Thêm collection vào stock/catalog.json theo schema bên dưới. Cập nhật ngày đúng ngày thực hiện. Mặc định variant đầu tiên là bản được đề xuất. Không ghi số lượng/thời lượng/FPS nếu chưa đọc từ file thật.
7. Chạy kiểm tra, commit và publish theo mục cuối. Không ghi đè ZIP đã bàn giao nếu đó là một phiên bản khác; dùng tên và link có phiên bản để dev phân biệt.

## Schema stock/catalog.json

File gốc chứa version: 1 và collections: một mảng. Mỗi collection có dạng:

```json
{
  "id": "lamp-reset",
  "title": "Tên bộ animation",
  "description": "Mô tả ngắn để team biết bộ này làm gì.",
  "updated": "2026-10-15",
  "poster": "stock/lamp-reset-poster.png",
  "fps": 60,
  "tags": ["Onboarding", "Device"],
  "variants": [
    {
      "id": "362x300",
      "label": "362 × 300 px",
      "preview": "collections/lamp-reset/",
      "download": "handoff/lamp-reset-v1.zip"
    }
  ],
  "clips": [
    {
      "id": 0,
      "title": "Tên cảnh",
      "seconds": 8,
      "description": "Hành vi, cách lặp hoặc điều kiện tiếp tục."
    }
  ]
}
```

ID collection và variant phải duy nhất; ID clip phải đúng với preview. Danh sách clips được hiển thị đúng thứ tự khai báo. seconds dùng (op-ip)/fr, không đếm op như frame inclusive. Không nhúng dữ liệu animation vào catalog; trang kho chỉ tải dữ liệu bộ được mở. Link chia sẻ: ?collection=lamp-reset&variant=362x300&clip=flow hoặc clip=0.

## Contract SmartHue đã chốt — phải giữ

- Có 8 file: 00, 01, 02, 03, 04, 05, 07, 08. Không cần 06 và không cần clip tìm đèn entry riêng.
- 00 Before Scan dài 8s, hướng dẫn tắt → chờ → bật. Sóng 10s là minh họa fill 1,5s, không phải đồng hồ đếm đủ 10 giây thật. Không tự scan khi intro kết thúc. Sau lượt đầu, loop frame [20,480).
- Scan Now là ngoại lệ duy nhất: app preload 01, fade riêng vùng animation 0 trong 280ms, dừng 00 rồi phát 01 từ frame 0 với opacity=1. UI app không fade. Không có fade out cuối clip được bake trong 00. Không thêm fade in/clip entry thứ hai. Nếu chưa preload xong, giữ intro đến khi 01 sẵn sàng rồi mới fade.
- Các clip khác phải phát hết trước khi chuyển. Sự kiện BLE giữa chừng lưu pending state, xử lý ở completion callback, không dùng timer ước lượng để cắt clip.
- Luồng thành công: 01 → 02 → 05 → 03 → 04. 01 chưa có kết quả thì lặp trọn clip; không tìm thấy thì 01 → 07. 03 chờ thì lặp trọn clip; timeout thì 03 → 08. 03 thành công chuyển thẳng 04, không có bridge 06.
- Khoảng cách gần là 15cm, xa là 2m. Giữ check và bóng chữ theo vị trí designer. Không áp localStorage cũ của công cụ căn chỉnh lên production.
- 60 FPS, speed=1. Bộ gốc 393×326, bản resize 362×300 giữ nguyên tỉ lệ nội dung. Background ngoài sàn trong suốt; sàn, mép mềm và bóng nằm trong animation. Nền app #0C0C0C. Không stretch/crop ảnh để vừa khung.
- Preview full luồng đợi Scan Now ở animation 0 rồi mới tiếp tục; production dùng BLE thật và không sao chép việc tự tiến/lặp toàn bộ demo.

## README bên trong mỗi gói bàn giao

Ghi rõ tên/phiên bản, canvas, FPS và speed; bảng file/thời lượng; sơ đồ hoặc thứ tự state; điều kiện lặp/thoát; rule completion và ngoại lệ; nền trong suốt/sàn; assets/font đã nhúng; vị trí các file HTML offline; link preview kho theo đúng variant; thay đổi so với bộ dev đang dùng; giới hạn kiểm tra thực tế. Chỉ kết luận đã kiểm tra iOS khi đã chạy đúng player trên thiết bị và có bằng chứng. LottieFiles dotlottie-ios không đồng nghĩa player web.

## Kiểm tra trước khi publish

- JSON hợp lệ, manifest và assets của tất cả .lottie đầy đủ; ZIP không lỗi.
- File dimensions/fr/ip/op đúng bản bàn giao, thời lượng catalog khớp file.
- Mở trang kho, tìm kiếm có kết quả/không kết quả; mở collection, đổi variant, tải gói; tất cả clip đơn mở đúng ID và nút đang chọn; full luồng mở đúng đầu; nút quay lại trình duyệt hoạt động.
- Desktop và mobile không tràn ngang; iframe có title; nút/link dùng được bằng bàn phím; poster không thiếu.
- Theo dõi lỗi console và HTTP 404. Xem frame đầu, giữa, cuối, loop seam và chuyển state quan trọng. Khi sửa Lottie, dùng skill text-to-lottie và kiểm tra trên Skottie theo skill; trang kho vẫn dùng player hiện có để team review.
- So sánh bản mới với file gốc khi resize/đóng gói: giữ mọi keyframe, easing, opacity, image bytes, thời lượng nếu không có yêu cầu thay đổi.
- Không thêm token, thông tin riêng tư hoặc dữ liệu chưa được phép công khai. Repo và toàn bộ asset được xuất bản công khai.

## Xuất bản trên GitHub Pages

Chạy trong checkout repo, kiểm tra diff và chỉ stage các file của công việc hiện tại:

```sh
git status --short
git diff --stat
git add <các-file-đã-kiểm-tra>
git commit -m "Add animation collection: lamp-reset"
git push origin main
gh run list --limit 3
```

Chờ đúng lượt pages build and deployment của commit mới thành công. Mở URL công khai và xác nhận catalog/preview/download trả về HTTP 200, đúng dữ liệu mới. Push thành công chưa có nghĩa Pages đã cập nhật. Nếu bị chặn quyền, thiếu tài nguyên hoặc render khác dự kiến, báo ngay cho người dùng: phát hiện gì, ảnh hưởng, điều chưa chắc và bước kiểm tra tiếp; không âm thầm chờ lâu. Báo tiến độ tối thiểu mỗi 60 giây.

Khi bàn giao, gửi link trang kho hoặc link collection + clip/variant cụ thể và link ZIP. Nêu rõ những kiểm tra đã làm, không đảm bảo FPS thiết bị chỉ từ web preview.
