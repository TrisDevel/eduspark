// src/features/auth/api.ts
import { api } from "@/lib/fetcher";

// === Types (tuỳ backend, bạn chỉnh lại cho khớp) ===
export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  role?: "ADMIN" | "TEACHER" | "USER";
};

export type LoginRes = { accessToken: string; user: AuthUser };
export type RegisterPayload = { name: string; email: string; password: string };
export type RegisterRes = { user?: AuthUser; message?: string };

// === Auth APIs ===

// POST /auth/login  -> { accessToken, user }
// MSW sẽ bắt URL `${NEXT_PUBLIC_API_URL}/auth/login` và trả mock khi USE_MOCK=1
export async function loginApi(email: string, password: string) {
  return api<LoginRes>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// POST /auth/register -> { user?, message? }
// MSW có thể mock endpoint này tương tự /auth/login
export async function registerApi(payload: RegisterPayload) {
  return api<RegisterRes>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// POST /auth/logout -> { ok: true } (tuỳ BE)
export async function logoutApi() {
  return api<{ ok: boolean } | null>("/auth/logout", { method: "POST" });
}

// GET /auth/me -> user (dùng nếu BE chỉ trả token ở /login)
export async function meApi() {
  return api<AuthUser>("/auth/me");
}