import { http, HttpResponse } from "msw";
import { mockUsers } from "../fixtures/users";

// Base URL dùng chung cho FE & mock
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export const authHandlers = [
  // POST /auth/login -> { accessToken, user }
  http.post(`${API}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return HttpResponse.json({ message: "Sai email hoặc mật khẩu" }, { status: 401 });
    }
    // token mock đơn giản: mock.<id>.<role>
    const accessToken = `mock.${user.id}.${user.role}`;
    return HttpResponse.json({ accessToken, user }, { status: 200 });
  }),

  // (tuỳ chọn) POST /auth/logout
  http.post(`${API}/auth/logout`, () => HttpResponse.json({ ok: true })),
];