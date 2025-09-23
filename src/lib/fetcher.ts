"use client";

export async function api(path: string, init: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");

  const base = process.env.NEXT_PUBLIC_API_URL || "";
  const url = path.startsWith("http") ? path : `${base}${path}`;

  const res = await fetch(url, { ...init, headers });
  return res;
}
