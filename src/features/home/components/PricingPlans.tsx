"use client";
import { motion } from "framer-motion";

export default function PricingPlans() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Gói dịch vụ
          </h2>
          <p className="text-gray-500 mt-2">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div className="relative rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl border border-gray-200 hover:border-orange-500 transition-colors duration-200 shadow p-6 flex flex-col h-full group"
            >
              <div className="text-sm font-medium text-gray-700">Miễn phí</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                0đ
                <span className="text-sm font-normal text-gray-500">
                  /tháng
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Dành cho học viên mới bắt đầu
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span>✓</span> Luyện code cơ bản
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span> Tham gia lớp học miễn phí
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span> Chấm điểm tự động
                </li>
                <li className="flex items-start gap-2 opacity-60">
                  <span>✗</span> AI Review
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border border-gray-300 rounded-lg py-2 font-medium transform transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:scale-105"
                >
                  Bắt đầu miễn phí
                </motion.button>
              </div>
            </motion.div>

            {/* Student - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl border border-gray-200 hover:border-orange-500 transition-colors duration-200 shadow p-6 flex flex-col h-full group"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full bg-orange-500 text-white md:static md:translate-x-0 md:mt-0 md:mb-2 md:self-start">
                Phổ biến
              </span>
              <div className="text-sm font-medium text-gray-700">Student</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                99,000đ
                <span className="text-sm font-normal text-gray-500">
                  /tháng
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Dành cho học viên nghiêm túc
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span>✓</span> Tất cả tính năng miễn phí
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span> AI Review không giới hạn
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span> Báo cáo chi tiết
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border border-gray-300 rounded-lg py-2 font-medium transform transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:scale-105"
                >
                  Chọn gói Student
                </motion.button>
              </div>
            </motion.div>

            {/* Teacher */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl border border-gray-200 hover:border-orange-500 transition-colors duration-200 shadow p-6 flex flex-col h-full group"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full bg-orange-500 text-white md:static md:translate-x-0 md:mt-0 md:mb-2 md:self-start">
                Phổ biến
              </span>
              <div className="text-sm font-medium text-gray-700">Teacher</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                199,000đ
                <span className="text-sm font-normal text-gray-500">
                  /tháng
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Dành cho giảng viên</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span>✓</span> Tất cả tính năng miễn phí
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span> AI Review không giới hạn
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span> Báo cáo chi tiết
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border border-gray-300 rounded-lg py-2 font-medium transform transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:scale-105"
                >
                  Chọn gói Teacher
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
