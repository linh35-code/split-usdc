# Product & Design Spec — App Chia Tiền Nhóm Bằng USDC (trên Arc)

## 1. Tổng quan sản phẩm

**App là gì:** Mobile app cho phép nhóm bạn ghi nhận chi phí chung và thanh toán ngay bằng USDC trong cùng một bước, không cần tính toán ai nợ ai rồi tự chuyển khoản riêng.

**Ai dùng:** Nhóm bạn/đồng nghiệp đa quốc gia, đã quen hoặc sẵn sàng dùng stablecoin, có chi phí chung xuyên biên giới (du lịch, thuê nhà chung, chi phí dự án nhỏ).

**Vấn đề giải quyết:** Xoá bỏ bước "tính toán xong rồi tự chuyển khoản thủ công" và sự thiếu tin cậy khi không có bằng chứng thanh toán; không bị vướng ví/token/chain khác nhau giữa các thành viên (vấn đề mà Splitwise và các bản clone crypto khác — CryptoSplit, Splitwiser — đều gặp).

**Vì sao nên tồn tại:** Splitwise chỉ tính toán, không thanh toán thật; chuyển khoản ngân hàng/MoMo khó dùng xuyên biên giới. Người dùng đã tự yêu cầu tính năng này ("Everyone I use this with settles in crypto already. really frustrating it's not in the app" — Splitwise feedback forum).

**Công nghệ nền tảng:** Arc (blockchain), Circle Wallets (embedded wallet, không cần seed phrase), Circle Paymaster (tài trợ gas), USDC.

**Không làm (giới hạn phạm vi):**
- Không hỗ trợ đổi tiền pháp định (fiat on/off-ramp) trong bản đầu
- Không hỗ trợ FX giữa nhiều loại stablecoin khác nhau (chỉ USDC)
- Không làm tính năng cho vay/mượn có lãi suất
- Không phải ví đa năng (không gửi/nhận tự do ngoài mục đích chia tiền nhóm)

**Platform:** Mobile app (iOS/Android)

---

## 2. Spec tính năng (Bước 3)

### UX
- Đăng nhập bằng cách kết nối ví có sẵn
- Số dư/khoản chi hiển thị chỉ bằng USDC, không quy đổi
- Luôn có màn hình xác nhận trước khi trả (giao dịch onchain không thể hoàn tác)
- Nhắc nhở 1 lần khi có khoản chi mới

### Logic
- Chia đều mặc định khi tạo khoản chi, cho phép chỉnh tay từng phần
- Phần lẻ khi chia không hết do người tạo khoản chi chịu
- Bất kỳ thành viên nào trong nhóm cũng có quyền tạo khoản chi mới
- Khoản chi được coi là hoàn tất khi tất cả thành viên đã trả phần của mình

### Xử lý lỗi
- Giao dịch onchain: hiển thị trạng thái "Đang xử lý", không cho thao tác lại, sau đó báo kết quả thật (thành công/thất bại)
- Không đủ số dư USDC: báo lỗi rõ + hướng dẫn nạp thêm trước khi gửi giao dịch
- Rời nhóm khi còn nợ: chặn thao tác, bắt buộc trả hết hoặc huỷ khoản chi liên quan trước

### Edge cases
- Sửa/xoá khoản chi đã có người trả: không cho phép, chỉ cho huỷ + tạo khoản chi bù trừ mới
- Trả thừa/thiếu do tự nhập số: không cho phép, người trả chỉ xác nhận đúng số hệ thống đã chốt
- Double-submit (2 thiết bị bấm trả cùng lúc): khoá nút trả ngay sau lần bấm đầu + kiểm tra trạng thái server-side trước khi gửi giao dịch mới

### Bảo mật
- Dữ liệu chi tiêu/số dư của nhóm chỉ hiển thị cho thành viên trong nhóm đó
- Thêm thành viên qua email/username nội bộ hệ thống, không nhập địa chỉ ví thủ công
- Có hạn mức thanh toán mỗi giao dịch/ngày, yêu cầu xác thực lại với giao dịch bất thường

---

## 3. Spec giao diện (Bước 4)

### Hệ lưới (Grid System)
- Base unit: 8px — mọi khoảng cách/kích thước là bội số của 8 (4, 8, 16, 24, 32, 48)
- Bố cục: lưới 4 cột, margin lề 16px, gutter 8px
- Tôn trọng vùng an toàn (safe area) trên iOS/Android
- Kích thước chạm tối thiểu: 44x44pt
- Thang bo góc: 8 / 12 / 16px
- Thang chữ: Caption 12, Body 16, Title 20, Heading 24, Display 32 (font mặc định theo nền tảng)

### Wireframe theo nhóm màn hình

**Nhóm A — Onboarding & Auth**
```
┌─────────────────────────┐   ┌─────────────────────────┐
│        [Logo]           │   │   ← Back                │
│                          │   │                          │
│   [Tiêu đề giới thiệu]  │   │   Kết nối ví             │
│   [Mô tả ngắn 1 dòng]   │   │                          │
│                          │   │   [Danh sách ví hỗ trợ]  │
│                          │   │   [ Ví A ]               │
│  [Nút: Kết nối ví]      │   │   [ Ví B ]               │
│                          │   │   [ Ví C ]               │
│  [Link: Tìm hiểu về Arc] │   │                          │
└─────────────────────────┘   └─────────────────────────┘
        Splash/Welcome              Connect Wallet
```

**Nhóm B — Home / Danh sách nhóm**
```
┌─────────────────────────┐   ┌─────────────────────────┐
│ [Avatar]      [+ Tạo nhóm]│  │ ← [Tên nhóm]    [⚙ Cài đặt]│
│                          │   │                          │
│ Tổng bạn cần trả: X USDC │   │ [Avatar thành viên x N] │
│ Tổng bạn được nhận: Y USDC│  │                          │
│                          │   │ Số dư nhóm: Z USDC       │
│ [Danh sách nhóm]         │   │ ── Danh sách khoản chi ──│
│  [ Nhóm 1 — nợ/được: .. ]│   │  [Khoản chi 1] [Trạng thái]│
│  [ Nhóm 2 — nợ/được: .. ]│   │  [Khoản chi 2] [Trạng thái]│
│  [ Nhóm 3 — nợ/được: .. ]│   │                          │
│                          │   │  [Nút: + Thêm khoản chi] │
│ [Tab bar: Nhóm|Hoạt động|Ví]│ │ [Tab bar: Nhóm|Hoạt động|Ví]│
└─────────────────────────┘   └─────────────────────────┘
      Danh sách nhóm              Chi tiết nhóm
```

**Nhóm C — Luồng thêm & chia khoản chi**
```
┌─────────────────────────┐   ┌─────────────────────────┐
│ ← Thêm khoản chi         │   │ ← Chia tiền              │
│                          │   │                          │
│ [Input: Tên khoản chi]  │   │ Tổng: [Số tiền] USDC     │
│ [Input: Số tiền USDC]   │   │                          │
│ [Chọn người tham gia]   │   │ [Toggle: Chia đều/Tuỳ chỉnh]│
│  [x] Người A            │   │  Người A   [Số tiền A]   │
│  [x] Người B            │   │  Người B   [Số tiền B]   │
│  [x] Người C            │   │  Người C   [Số tiền C]   │
│                          │   │                          │
│ [Nút: Tiếp tục]          │   │ [Nút: Xác nhận tạo khoản chi]│
└─────────────────────────┘   └─────────────────────────┘
      Thêm khoản chi              Chia tiền (split editor)
```

**Nhóm D — Luồng thanh toán**
```
┌─────────────────────────┐   ┌─────────────────────────┐
│ ← Xác nhận thanh toán    │   │      [Icon đang xử lý]   │
│                          │   │                          │
│ Trả cho: [Tên khoản chi] │   │   Đang xử lý giao dịch..│
│ Số tiền: [X USDC]       │   │   [Không cho thao tác]  │
│ Người nhận: [Tên nhóm]  │   │                          │
│ Phí gas: Được tài trợ   │   │                          │
│                          │   │                          │
│ [Nút: Xác nhận trả]     │   │                          │
│ [Nút: Huỷ]              │   │                          │
└─────────────────────────┘   └─────────────────────────┘
      Xác nhận trả              Đang xử lý

┌─────────────────────────┐   ┌─────────────────────────┐
│      [Icon thành công]  │   │      [Icon thất bại]    │
│                          │   │                          │
│   Thanh toán thành công! │   │   Thanh toán thất bại    │
│   [Số tiền] USDC         │   │   [Lý do lỗi]            │
│   Mã giao dịch: [Hash]   │   │                          │
│                          │   │  [Nút: Thử lại]          │
│  [Nút: Xong]             │   │  [Nút: Huỷ]              │
└─────────────────────────┘   └─────────────────────────┘
      Kết quả: Thành công         Kết quả: Thất bại
```

**Nhóm E — Quản lý nhóm & thành viên**
```
┌─────────────────────────┐   ┌─────────────────────────┐
│ ← Tạo nhóm mới           │   │ ← Mời thành viên         │
│                          │   │                          │
│ [Input: Tên nhóm]       │   │ [Input: Tìm email/username]│
│ [Ảnh đại diện nhóm]     │   │                          │
│                          │   │ [Kết quả tìm kiếm]       │
│ [Nút: Tạo & Mời thành viên]│ │  [ Người dùng A  [Mời] ]│
│                          │   │  [ Người dùng B  [Mời] ]│
└─────────────────────────┘   └─────────────────────────┘
      Tạo nhóm                    Mời thành viên

┌─────────────────────────┐
│ ← Rời nhóm               │
│                          │
│ [Cảnh báo: còn nợ chưa trả]│
│ [Chi tiết khoản còn nợ]  │
│                          │
│ [Nút: Trả hết trước khi rời]│
│ [Nút: Huỷ] (disabled nếu còn nợ)│
└─────────────────────────┘
      Rời nhóm (chặn khi còn nợ)
```

### Bộ rule chung áp toàn bộ màn hình
1. Mọi số tiền hiển thị đơn vị USDC rõ ràng, không quy đổi
2. Mọi hành động không thể hoàn tác (trả tiền, rời nhóm khi hết nợ) đều có màn hình/hộp thoại xác nhận riêng
3. Nút hành động chính luôn đặt cố định phía dưới cùng, kích thước chạm tối thiểu 44x44pt
4. Trạng thái giao dịch (đang xử lý/thành công/thất bại) luôn hiển thị toàn màn hình, chặn thao tác khác cho đến khi có kết quả
5. Danh sách thành viên chỉ hiển thị qua avatar + tên, không bao giờ hiển thị địa chỉ ví thô ngoài trang chi tiết giao dịch
6. Tab bar cố định (Nhóm | Hoạt động | Ví) xuất hiện ở mọi màn hình chính, ẩn ở màn hình luồng thao tác (thêm khoản chi, thanh toán)
