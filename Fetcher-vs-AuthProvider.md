# AuthProvider vs. fetcher — Khác nhau ở đâu?

## 1. Vai trò
- **AuthProvider**  
  - Quản lý phiên đăng nhập ở UI (React)  
  - Giữ `user`, `token`, `loading`  
  - Expose hàm `login()`, `logout()`, `setUser()`  
  - Quyết định redirect theo role, hiển thị navbar trạng thái, guard trang…

- **fetcher (`src/lib/fetcher.ts`)**  
  - HTTP client wrapper, không phụ thuộc React  
  - Gắn `baseURL` từ `.env`  
  - Tự thêm `Authorization: Bearer <token>` (lấy từ localStorage)  
  - Parse JSON, ném lỗi chuẩn

---

## 2. Trách nhiệm
- **AuthProvider**
  - Đọc/ghi `localStorage` (lưu token + user)  
  - Gọi API gián tiếp qua layer `features/*/api.ts`  
  - Cập nhật UI state sau khi login/logout  
  - Điều hướng theo role / `?from=...`

- **fetcher**
  - Không biết `role`, `redirect`, `UI`  
  - Chỉ biết: gửi request, nhận response, chuẩn hoá lỗi

---

## 3. Dòng chảy chuẩn (login)

flowchart TD
  A[LoginPage] -->|useAuth().login(email,pw)| B[AuthProvider.login()]
  B --> C[loginApi(email,pw)]
  C --> D[api('/auth/login', {...}) via fetcher]
  D --> E[(MSW hoặc BE thật) trả {accessToken, user}]
  E --> F[AuthProvider set localStorage + setState(user,token)]
  F --> G[Redirect theo role hoặc ?from]

## 4. Ranh giới code (dễ bảo trì)

UI / Flow / Redirect → AuthProvider + pages/components

Business API theo domain → src/features/<domain>/api.ts

HTTP chung → src/lib/fetcher.ts

## 6. Khi dùng MSW

Không đổi AuthProvider hay fetcher.

MSW chỉ “đứng giữa” intercept URL ${NEXT_PUBLIC_API_URL}/... và trả mock.

## 7. Lỗi thường gặp

Nhét redirect/role vào fetcher → sai tầng (fetcher phải thuần HTTP).

Gọi fetch trực tiếp trong UI → bỏ qua logic token/lỗi chuẩn hoá ở fetcher.

Trộn quá nhiều logic trong AuthProvider → nên đẩy gọi API về features/*/api.ts.

## 🎯 Một câu chốt

AuthProvider = não phiên đăng nhập & điều hướng UI.
fetcher = cánh tay HTTP (stateless), phục vụ cho mọi features/*/api.ts.