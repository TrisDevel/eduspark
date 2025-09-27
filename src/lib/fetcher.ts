// src/lib/fetcher.ts
export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers || {});

  // Chỉ set Content-Type nếu chưa có (tránh phá multipart/form-data)
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Lấy token từ localStorage ở client (trên server sẽ là null)
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const base = process.env.NEXT_PUBLIC_API_URL || "";
  const url = path.startsWith("http") ? path : `${base}${path}`;

  const res = await fetch(url, { ...init, headers });
  console.log(res.status);
  if (!res.ok) {
    // thử đọc message từ body nếu có
    let message = `API error: ${res.status}`;
    try {
      const text = await res.clone().text();
      if (text) {
        const data = JSON.parse(text);
        if (data?.message) message = data.message;
      }
    } catch {}
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return null as T;

  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}