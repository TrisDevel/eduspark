// Hàm nối base URL và path, đảm bảo không bị dư/thiếu dấu "/"
function joinUrl(base: string, path: string) {
  const b = (base || "").replace(/\/+$/, "");   // bỏ dấu "/" dư ở cuối base
  const p = (path || "").replace(/^\/+/, "");   // bỏ dấu "/" dư ở đầu path
  return b ? `${b}/${p}` : `/${p}`;             // nếu có base → base/path, nếu rỗng → "/path"
}

// Kiểm tra response có Content-Type = JSON không
function isJson(res: Response) {
  return (res.headers.get("content-type") || "").includes("application/json");
}

// Chờ cho đến khi MSW (Mock Service Worker) khởi động xong
async function waitMswReady() {
  if (typeof window === "undefined") return;                      // trên server không cần
  if (process.env.NEXT_PUBLIC_USE_MOCK !== "1") return;           // nếu không bật mock thì bỏ qua
  if ((window as any).__MSW_READY) return;                        // nếu đã sẵn sàng thì thôi

  // Nếu chưa sẵn sàng → lắng nghe event "msw:ready", resolve khi có
  await new Promise<void>((resolve) => {
    const h = () => { 
      window.removeEventListener("msw:ready", h); 
      resolve(); 
    };
    window.addEventListener("msw:ready", h, { once: true });
  });
}

// Hàm chính để gọi API, generic type <T> là kiểu dữ liệu muốn nhận về
export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  // ⭐ Đảm bảo MSW đã start trước khi gọi fetch (tránh race condition)
  if (typeof window !== "undefined") await waitMswReady();

  // Chuẩn bị headers
  const headers = new Headers(init.headers || {});
  // Nếu chưa có Content-Type và body không phải FormData → mặc định là JSON
  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Lấy token trong localStorage (chỉ khi chạy client)
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (token) headers.set("Authorization", `Bearer ${token}`); // gắn token vào header Authorization

  // Chọn base URL theo mode mock/thật
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "1";
  const base = useMock ? "/api" : (process.env.NEXT_PUBLIC_API_URL || "");
  // Nếu path đã là absolute (http...) thì dùng luôn, nếu không thì ghép với base
  const url = path.startsWith("http") ? path : joinUrl(base, path);

  // In log ra console khi dev để debug
  if (process.env.NODE_ENV !== "production") console.log("[fetch]", url);

  // Thực hiện gọi API
  const res = await fetch(url, { ...init, headers });

  // Nếu status 204 (No Content) → trả về null
  if (res.status === 204) return null as T;

  // Nếu request lỗi (status ngoài 2xx)
  if (!res.ok) {
    if (isJson(res)) { 
      try {
        const j = await res.json();                              // thử đọc JSON
        throw new Error(j?.message || j?.error || `API error: ${res.status}`);
      } catch {
        throw new Error(`API error: ${res.status}`);             // fallback nếu parse fail
      }
    } else {
      const html = await res.text();                             // nếu response là HTML (thường là 404 từ Next)
      throw new Error(`API error ${res.status}. Non-JSON: ${html.slice(0, 100)}…`);
    }
  }

  // Nếu response OK → trả về dữ liệu đã parse JSON, hoặc text nếu không phải JSON
  return isJson(res) ? (await res.json() as T) : (await res.text() as unknown as T);
}