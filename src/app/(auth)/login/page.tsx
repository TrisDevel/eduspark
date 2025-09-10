// app/login/page.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // ...simulate login...
    setTimeout(() => setLoading(false), 1500);
  };



  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-orange-100"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <img
            src="/logo.svg"
            alt="EduSpark Logo"
            className="h-12 w-12 rounded-full shadow"
          />
        </motion.div>

        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-orange-600 tracking-tight">
            Đăng Nhập
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Chào mừng quay trở lại! Hãy đăng nhập để tiếp tục.
          </p>
          
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 space-y-7"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                type="email"
                id="email"
                autoComplete="username"
                required
                aria-label="Email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                placeholder="Nhập Email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <button
                  type="button"
                  className="text-xs text-orange-500 hover:underline focus:outline-none"
                  title="Quên mật khẩu?"
                  aria-label="Quên mật khẩu?"
                  tabIndex={0}
                >
                  Quên mật khẩu?
                </button>
              </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                type="password"
                id="password"
                autoComplete="current-password"
                required
                aria-label="Mật khẩu"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : null}
              Đăng Nhập
            </motion.button>
          </div>
        </motion.form>

        {/* OR Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">Hoặc</span>
            </div>
          </div>

          {/* Google Login */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              type="button"
              aria-label="Đăng nhập với Google"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <g>
                  <path
                    fill="#4285F4"
                    d="M44.5 20H24v8.5h11.7C34.9 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3c-7.7 0-14.2 4.4-17.7 10.7z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 44c5.2 0 9.9-1.8 13.4-5.2l-6.2-5.2C29.7 35.1 27 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
                  />
                  <path
                    fill="#EA4335"
                    d="M44.5 20H24v8.5h11.7C34.9 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3c-7.7 0-14.2 4.4-17.7 10.7z"
                  />
                </g>
              </svg>
              Đăng nhập với Google
            </motion.button>
          </div>
        </motion.div>

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="font-semibold text-orange-500 hover:text-orange-600 transition"
          >
            Đăng ký <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
}
