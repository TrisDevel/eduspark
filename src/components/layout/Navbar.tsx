"use client";
import { useAuth } from "@/contexts/authProvider";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  console.log(user);
  const navigationItems = [
    { name: "Trang Chủ", href: "/", hasDropdown: true },
    { name: "Khóa Học", href: "/courses", hasDropdown: true },
    { name: "Luyện Tập", href: "/exercises", hasDropdown: true },
    { name: "Lớp Học", href: "/classes", hasDropdown: true },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="EduSpark"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                EduSpark
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item, index) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      item.name === "Trang Chủ"
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <svg
                        className="w-3 h-3 text-gray-400 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link
                          href={`${item.href}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          Tất cả {item.name.toLowerCase()}
                        </Link>
                        <Link
                          href={`${item.href}/popular`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          Phổ biến
                        </Link>
                        <Link
                          href={`${item.href}/new`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          Mới nhất
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          {user ? (
            <Link
              href="/profile"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
            >
              {user.name}
            </Link>
          ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors underline"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Đăng ký
            </Link>
          </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-orange-500 focus:outline-none focus:text-orange-500"
              aria-label="Open main menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 text-base font-medium transition-colors ${
                item.name === "Trang Chủ"
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <Link
              href="/profile"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500"
            >
              {user.name}
            </Link>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-3">
                <Link
                  href="/login"
                  className="text-base font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
