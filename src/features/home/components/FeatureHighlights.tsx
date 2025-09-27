"use client";
import { motion } from "framer-motion";

export default function FeatureHighlights() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Tính năng <span className="text-orange-500">nổi bật</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Khám phá những điểm mạnh của EduSpark
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cột trái: Dành cho học viên */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Dành cho học viên
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Luyện code trực tuyến
                    </p>
                    <p className="text-sm">
                      Hỗ trợ Python, C/C++, Java, JavaScript với trình biên dịch
                      tích hợp.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                  <div>
                    <p className="font-medium text-gray-800">
                      AI Review thông minh
                    </p>
                    <p className="text-sm">
                      Nhận góp ý chi tiết và tối ưu code từ AI.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Theo dõi tiến trình
                    </p>
                    <p className="text-sm">
                      Xem lịch sử làm bài và phân tích kết quả học tập.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg"
                >
                  Dùng thử miễn phí
                </motion.button>
              </div>
            </div>

            {/* Cột phải: Code preview */}
            <div className="flex-1 space-y-4">
              <div className="rounded-xl bg-gray-900 text-gray-100 overflow-hidden border border-gray-800">
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-gray-300 border-b border-gray-800">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400"></span>
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-300"></span>
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400"></span>
                  <span className="ml-auto opacity-70">main.py</span>
                </div>
                <pre className="px-5 py-4 text-sm leading-6 font-mono">
                  {`def fibonacci(n):
                         if n <= 1:
                          return n

                       return fibonacci(n-1) + fibonacci(n-2)`}
                </pre>
              </div>

              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs">
                    ✓
                  </span>
                  <div>
                    <p className="font-medium text-green-800">
                      AI Review: Code chạy đúng!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Thuật toán fibonacci hoạt động tốt. Gợi ý: Có thể tối ưu
                      bằng dynamic programming để giảm độ phức tạp thời gian.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8 mt-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cột trái: Feature list với icon */}
            <div className="flex-1">
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl">👥</span>
                    Lớp học tương tác
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Tham gia lớp học trực tuyến với giảng viên và học viên khác.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    Theo dõi tiến độ
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Báo cáo chi tiết về quá trình học tập và kỹ năng đã đạt
                    được.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    AI Code Review
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Hệ thống AI phân tích và đưa ra phản hồi chi tiết về code
                    của bạn.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl">🧑‍💻</span>
                    Môi trường luyện tập
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Platform coding trực tuyến với đầy đủ công cụ và thư viện
                    cần thiết.
                  </p>
                </li>
              </ul>
            </div>

            {/* Cột phải: Dành cho giáo viên */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Dành cho giáo viên
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Quản lý lớp học dễ dàng
                    </p>
                    <p className="text-sm">
                      Tạo lớp, mời học viên, quản lý bài tập và theo dõi tiến
                      độ.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Chấm điểm tự động
                    </p>
                    <p className="text-sm">
                      Hệ thống test case tự động đảm bảo chấm chính xác và nhanh
                      chóng.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Báo cáo chi tiết
                    </p>
                    <p className="text-sm">
                      Xuất báo cáo lớp học và quản lý doanh thu từ khóa học.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Tạo lớp học ngay
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
