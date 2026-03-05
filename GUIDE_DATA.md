# Hướng dẫn Nhập liệu Portfolio (v1-bi-analyst)

Chào bạn! Để hoàn thiện Portfolio này với các đường link thực tế của bạn, hãy làm theo các bước dưới đây:

## 1. Cách nhúng Link Power BI Public
Để báo cáo Power BI hiển thị trực tiếp (không cần đăng nhập), bạn cần lấy link "Publish to web" từ Power BI Service:
1. Mở báo cáo trên Power BI Service.
2. Chọn **File** > **Embed report** > **Publish to web (public)**.
3. Copy đoạn link URL (dạng `https://app.powerbi.com/view?r=...`).
4. Mở file `assets/js/data.js`.
5. Tìm đến dự án tương ứng (ví dụ: `kpim-mall-bi`) và dán link vào thuộc tính `powerbiLink`:
   ```javascript
   powerbiLink: 'https://app.powerbi.com/view?r=YOUR_LINK_HERE',
   ```

## 2. Cách cập nhật File tải xuống (Docs/Data)
Nếu bạn có các file PDF, Word hoặc Excel mẫu muốn cho người xem tải về:
1. Copy các file đó vào thư mục `assets/docs/` hoặc `assets/data/`.
2. Mở file `assets/js/data.js`.
3. Cập nhật mảng `docs` cho dự án:
   ```javascript
   docs: [
       { label: 'Tài liệu giải pháp (PDF)', url: 'assets/docs/solution_guide.pdf' }
   ],
   sampleData: 'assets/data/sample_dataset.xlsx'
   ```

## 3. Chỉnh sửa nội dung Text
Tất cả thông tin về các dự án (Tên, Mô tả, Công cụ) đều nằm trong file `assets/js/data.js`. Bạn chỉ cần sửa nội dung trong các dấu ngoặc đơn `'...'`.

## 4. Kiểm tra kết quả
Sau khi lưu file `.js`, bạn chỉ cần **F5 (Refresh)** lại trình duyệt để thấy thay đổi. Không cần khởi động lại server.

---
**Tip:** Nếu bạn muốn đổi ảnh Profile, hãy thay thế file `assets/img/profile/AVATAR.jpg` bằng ảnh mới của bạn (giữ nguyên tên file hoặc cập nhật tên trong `index.html`).
