// import { http, HttpResponse } from "msw";
// import { mockUsers } from "../fixtures/users";
// import { ROUTES } from "@/config/routes";

// // Base URL dùng chung cho FE & mock
// const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

// export const authHandlers = [
//   // POST /auth/login -> { accessToken, user }
//   http.post(`${API}/${ROUTES.auth.login}`, async ({ request }) => {
//     const { email, password } = (await request.json()) as {
//       email: string;
//       password: string;
//     };
//     const user = mockUsers.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!user) {
//       return HttpResponse.json(
//         { message: "Sai email hoặc mật khẩu" },
//         { status: 401 }
//       );
//     }
//     // token mock đơn giản: mock.<id>.<role>
//     const accessToken = `mock.${user.id}.${user.role}`;
//     return HttpResponse.json({ accessToken, user }, { status: 200 });
//   }),

//   http.post(`${API}/auth/register`, async ({ request }) => {
//         console.log("[MSW] HIT /auth/register"); //  debug
//     const { email, password, name } = (await request.json()) as {
//       email: string;
//       password: string;
//       name: string;
//     };
//     const existingUser = mockUsers.find((u) => u.email === email);

//     if (existingUser) {
//       return HttpResponse.json(
//         { message: "Email đã được sử dụng" },
//         { status: 400 }
//       );
//     }
//     const newUser = {
//       id: (mockUsers.length + 1).toString(),
//       email,
//       password,
//       name,
//       role: "USER" as const,
//     };
//     mockUsers.push(newUser);
//     const accessToken = `mock.${newUser.id}.${newUser.role}`;
//     return HttpResponse.json({ accessToken, user: newUser }, { status: 201 });
//   }),

//   // (tuỳ chọn) POST /auth/logout
//   http.post(`${API}/auth/logout`, () => {
//     return HttpResponse.json({ ok: true });
//   }),
// ];


import { http, HttpResponse } from "msw";
import { mockUsers } from "../fixtures/users";

export const authHandlers = [
  http.post("*/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as any;
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) return HttpResponse.json({ message: "Sai email hoặc mật khẩu" }, { status: 401 });
    const accessToken = `mock.${user.id}.${user.role}`;
    return HttpResponse.json({ accessToken, user }, { status: 200 });
  }),

  http.post("*/api/auth/register", async ({ request }) => {
    const { name, email, password } = (await request.json()) as any;
    if (mockUsers.some(u => u.email === email)) {
      return HttpResponse.json({ message: "Email đã tồn tại" }, { status: 400 });
    }
    const user = { id: String(mockUsers.length + 1), name, email, password, role: "USER" as const };
    mockUsers.push(user);
    const accessToken = `mock.${user.id}.${user.role}`;
    return HttpResponse.json({ accessToken, user }, { status: 201 });
  }),

  http.post("*/api/auth/logout", () => HttpResponse.json({ ok: true })),
];