"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/lib/fetcher";
import { LoginRes } from "@/features/auth/api";
import { User } from "./types/UserDto";



type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User | null) => void; // khi cần cập nhật hồ sơ
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Khởi động: đọc localStorage
  useEffect(() => {
    try {
      const t = localStorage.getItem("token");
      const rt = localStorage.getItem("refresh_token");
      const u = localStorage.getItem("user");
      if (t) setToken(t);
      if (rt) setRefreshToken(rt);
      if (u) setUser(JSON.parse(u));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    const res = await api<LoginRes>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    console.log(res.data);
    if (!res) {
      setLoading(false);
      throw new Error("Sai tài khoản hoặc mật khẩu");
    }
    // BE nên trả { accessToken, user }
    const { token, user, refreshToken } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setRefreshToken(refreshToken);
    setUser(user as User | null);
    setLoading(false);
  };

  const logout = () => {
    // (tuỳ) gọi /auth/logout ở BE nếu có
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setToken(null);
    setRefreshToken(null);
    setUser(null as User | null);
  };

  const value = useMemo(
    () => ({ user, token, refreshToken, loading, login, logout, setUser }),
    [user, token, refreshToken, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
