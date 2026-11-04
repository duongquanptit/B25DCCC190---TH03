# Bananna Shop

Ứng dụng cửa hàng mini bằng React + TypeScript (Vite). Quản lý state bằng `useState`, Context API và Redux Toolkit.

## Chạy dự án
```bash
npm install
npm run dev
```
Đăng nhập thử: username bất kỳ, password `123456`.

## Phân chia state: useState, Context hay Redux

Nguyên tắc chọn: dữ liệu chỉ một component dùng thì để `useState`. Dữ liệu cấu hình toàn app, đơn giản và ít thay đổi thì dùng Context. Dữ liệu dùng chung nhiều trang, có logic nghiệp vụ hoặc bất đồng bộ thì dùng Redux Toolkit.

### 1. `useState` (state cục bộ trong component)

| Dữ liệu | Nằm ở | Lý do |
|---|---|---|
| `keyword` (từ khoá tìm kiếm) | `HomePage` | Chỉ ô tìm kiếm và lưới sản phẩm ở trang chủ dùng. Rời trang thì không cần giữ lại. |
| `username`, `password`, `error` | `LoginPage` | Là dữ liệu tạm của form, không component nào khác cần. |
| `success` (đã đặt hàng chưa) | `CheckoutPage` | Chỉ để chuyển giữa màn hình thanh toán và thông báo thành công. Không cần chia sẻ. |

Đưa các dữ liệu này vào Context hoặc Redux sẽ gây phức tạp không cần thiết.

### 2. Context API (state toàn cục, đơn giản)

| Dữ liệu | Nằm ở | Lý do |
|---|---|---|
| `theme` (sáng/tối) và `toggleTheme` | `ThemeContext` | Là cấu hình giao diện cho cả app, chỉ có hai giá trị, thay đổi hiếm. Không có logic bất đồng bộ nên Context là đủ. |
| `user`, `login`, `logout` | `AuthContext` | `Header`, `ProtectedRoute` và `LoginPage` đều cần biết ai đang đăng nhập. Đăng nhập giả lập, đồng bộ, không gọi API nên không cần Redux. |

Mỗi Context có custom hook (`useTheme()`, `useAuth()`) và báo lỗi nếu dùng ngoài Provider.

### 3. Redux Toolkit (state toàn cục, nhiều logic)

| Dữ liệu | Nằm ở | Lý do |
|---|---|---|
| `products`: `items`, `status`, `error` | `productsSlice` | Dữ liệu lấy từ API, có nhiều trạng thái (`idle`, `loading`, `succeeded`, `failed`) nên dùng `createAsyncThunk` xử lý gọn. Trang chủ và trang chi tiết dùng chung nên không phải tải lại. |
| `cart`: `items` | `cartSlice` | Giỏ hàng được dùng ở `Header` (số lượng), `ProductCard`, `ProductDetailPage`, `CartPage` và `CheckoutPage`. Có nhiều thao tác (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`) và giá trị suy ra (tổng số lượng, tổng tiền) tính bằng selector. |

Reducer là hàm thuần, dễ theo dõi, dễ kiểm thử, và Redux Toolkit cho phép viết kiểu "mutate" an toàn nhờ Immer.

## Cấu trúc thư mục
```
src/
├── app/         store.ts, hooks.ts
├── features/    products/productsSlice.ts, cart/cartSlice.ts
├── contexts/    ThemeContext.tsx, AuthContext.tsx
├── components/  Header, ProductCard, ProtectedRoute
├── layouts/     MainLayout.tsx
├── pages/       Home, ProductDetail, Cart, Login, Checkout, NotFound
├── types/       index.ts (Product, CartItem, User)
├── App.tsx      khai báo Routes
└── main.tsx     bọc Provider, ThemeProvider, AuthProvider, BrowserRouter
```
