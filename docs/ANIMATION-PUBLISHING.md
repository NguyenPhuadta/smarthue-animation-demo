# Hướng dẫn agent: đóng gói và đưa animation lên kho của Phú

## Đọc trước khi làm

Kho công khai: https://nguyenphuadta.github.io/smarthue-animation-demo/
Repo: NguyenPhuadta/smarthue-animation-demo. Checkout hiện tại: deploy/smarthue-flow trong workspace hi bbi. Đây là website tĩnh dùng GitHub Pages, không cần build hay framework. Đọc AGENTS.md trong workspace và hướng dẫn riêng của bộ animation trước khi sửa.

Mở preview của bộ cần sửa và xem các clip liên quan trước khi tích hợp. Nếu bộ có full luồng hoặc preview full app thì kiểm tra thêm các phần đó. Không coi ảnh chụp hoặc kiểm tra JSON là đủ để xác nhận chuyển động. Web preview không xác nhận hiệu năng trên iOS thật.

## Phạm vi hướng dẫn

Tài liệu này chỉ quy định cách đưa nội dung vào kho, đóng gói, kiểm tra và publish. Mỗi bộ tự quy định thời lượng, FPS, kích thước, nền, cách lặp, chuyển cảnh và tương tác. Không lấy hành vi của một bộ làm mặc định cho toàn bộ kho. Bộ chỉ có một animation vẫn được đưa lên kho.

Quy tắc riêng đặt ở `docs/collections/<id>.md` và README của gói tương ứng. Chỉ đọc/áp dụng khi làm đúng bộ đó. Bộ hiện có: [SmartHue](collections/smarthue.md).

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
3. Preview phải nhận các tham số: mode=sequence mở full luồng; mode=single&state=ID mở đúng clip; embed=1 ẩn phần điều hướng trùng với trang kho nhưng giữ các điều khiển phát lại/tạm dừng. Một link full luồng phải khởi động từ đầu; không lấy lựa chọn cũ từ localStorage để ghi đè link. Chế độ single phát hoặc lặp theo quy định riêng của clip; không mặc định mọi clip đều loop. Với bộ chỉ có một clip, chế độ full luồng có thể phát chính clip đó.
4. Làm poster PNG/WebP từ chính frame đã duyệt. Không đưa screenshot có thanh trình duyệt hoặc toàn bộ công cụ editor lên làm ảnh đại diện.
5. Đóng gói ZIP vào handoff/<slug>-<version>.zip. Bên trong gồm các .lottie, README.md mô tả tích hợp và thư mục full-app-preview chạy offline có tất cả ảnh/font/runtime cần thiết. Không kèm file JSON rời ở thư mục gốc nếu người dùng chỉ cần Lottie. JSON/JS bên trong HTML preview được phép. Chạy kiểm tra ZIP và kiểm tra .lottie có manifest cùng animation/assets hợp lệ.
6. Thêm collection vào stock/catalog.json theo schema bên dưới. Cập nhật ngày đúng ngày thực hiện. Mặc định variant đầu tiên là bản được đề xuất. Không ghi số lượng/thời lượng/FPS nếu chưa đọc từ file thật.
7. Chạy kiểm tra, commit và publish theo mục cuối. Không ghi đè ZIP đã bàn giao nếu đó là một phiên bản khác; dùng tên và link có phiên bản để dev phân biệt.

## Schema stock/catalog.json

Các số FPS, kích thước, thời lượng và ID trong ví dụ chỉ là dữ liệu minh họa; lấy giá trị thực từ bộ mới, không sao chép làm mặc định.

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

## README bên trong mỗi gói bàn giao

Ghi rõ tên/phiên bản, canvas, FPS và speed; bảng file/thời lượng; sơ đồ hoặc thứ tự state; điều kiện lặp/thoát; quy tắc chuyển cảnh và ngoại lệ nếu có; nền trong suốt/sàn; assets/font đã nhúng; vị trí các file HTML offline; link preview kho theo đúng variant; thay đổi so với bộ dev đang dùng; giới hạn kiểm tra thực tế. Chỉ kết luận đã kiểm tra iOS khi đã chạy đúng player trên thiết bị và có bằng chứng. LottieFiles dotlottie-ios không đồng nghĩa player web.

## Kiểm tra trước khi publish

- JSON hợp lệ, manifest và assets của tất cả .lottie đầy đủ; ZIP không lỗi.
- File dimensions/fr/ip/op đúng bản bàn giao, thời lượng catalog khớp file.
- Mở trang kho, tìm kiếm có kết quả/không kết quả; mở collection, đổi variant, tải gói; tất cả clip đơn mở đúng ID và nút đang chọn; full luồng mở đúng đầu; nút quay lại trình duyệt hoạt động.
- Desktop và mobile không tràn ngang; iframe có title; nút/link dùng được bằng bàn phím; poster không thiếu.
- Theo dõi lỗi console và HTTP 404. Xem frame đầu, giữa, cuối, điểm nối vòng lặp nếu có và chuyển state quan trọng nếu có. Khi sửa Lottie, dùng skill text-to-lottie và kiểm tra trên Skottie theo skill; trang kho vẫn dùng player hiện có để team review.
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
