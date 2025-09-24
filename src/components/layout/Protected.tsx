// app/.../Protected.tsx
"use client"; 
// ➜ Đánh dấu đây là Client Component (dùng hook, router…); nếu thiếu sẽ lỗi.

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// ➜ Các hook của App Router để điều hướng & đọc URL hiện tại.
import { useAuth } from "@/contexts/authProvider";
// ➜ Hook lấy trạng thái đăng nhập từ AuthProvider (user, loading).

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  // ➜ user: thông tin người dùng (null nếu chưa login)
  //   loading: đang kiểm tra/khởi tạo session (đọc localStorage, gọi API…)

  const router = useRouter();               // ➜ Dùng để chuyển trang.
  const pathname = usePathname();           // ➜ Lấy path hiện tại (vd: /dashboard/courses).
  const params = useSearchParams();         // ➜ Lấy query string hiện tại (?page=2&sort=...)

  useEffect(() => {
    if (loading) return;
    // ➜ Trong lúc còn "đang tải" trạng thái auth thì khoan làm gì cả,
    //   tránh nháy UI/redirect sớm.
    // 
    

    if (!user) {
      const message = encodeURIComponent("Bạn phải đăng nhập trước");
      // ➜ Nếu KHÔNG có user (chưa đăng nhập) thì chuẩn bị redirect sang /login
      //   và kèm query "from" để login xong quay lại đúng trang đang dở.

      const from =
        pathname + (params.toString() ? `?${params.toString()}` : "");
      // ➜ Ghép lại URL đầy đủ hiện tại:
      //   - pathname: "/dashboard/courses"
      //   - params: "page=2" (nếu có)
      //   -> from = "/dashboard/courses?page=2"

      router.replace(`/login?from=${encodeURIComponent(from)}&message=${message}`);
      // ➜ Điều hướng sang /login và nhét from vào query:
      //   /login?from=%2Fdashboard%2Fcourses%3Fpage%3D2
      //   Dùng replace để không thêm lịch sử (back sẽ không quay về trang bị chặn).
      
    }
  }, [user, loading, pathname, params, router]);
  // ➜ useEffect sẽ chạy khi bất kỳ giá trị nào thay đổi:
  //   - loading đổi từ true → false
  //   - user có/không
  //   - URL thay đổi (pathname/params)
  //   - router (ổn định, nhưng tốt khi khai báo đầy đủ deps)

  if (loading) return null;
  // ➜ Khi đang loading (chưa biết có user hay không), tạm không render gì
  //   (bạn có thể trả về Skeleton/Spinner ở đây cho UX tốt hơn).

  if (!user) return null;
  // ➜ Nếu đã hết loading MÀ vẫn không có user (đã redirect), không render nội dung.
  //   (Tránh chớp nội dung nhạy cảm trước khi redirect hoàn tất.)

  return <>{children}</>;
  // ➜ Nếu có user hợp lệ: render nội dung bảo vệ (children).
}