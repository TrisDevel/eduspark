"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-orange-600 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-orange-500/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900/50"></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Small Heading */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-300 text-sm font-medium uppercase tracking-wider"
              >
                KHÔNG THẦY ĐỒ MÀY LÀM NÊN
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Nền tảng luyện code và lớp học công nghệ tích hợp AI
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl"
              >
                EduSpark cung cấp môi trường luyện code trực tuyến hiện đại với AI review thông minh, 
                giúp học viên và giáo viên tối ưu hóa quá trình học tập và giảng dạy lập trình.
              </motion.p>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-4"
              >
                <a
                  href="/courses"
                  className="text-white text-lg font-medium hover:text-orange-300 transition-colors duration-300 underline underline-offset-4"
                >
                  Tham gia khóa học miễn phí
                </a>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="pt-8"
              >
                <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Hôm nay học gì?"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Tìm kiếm
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Right Content - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              {/* Floating Elements */}
              <div className="relative h-96">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute right-0 w-120 h-120 bg-[#F66F23] rounded-full blur-3xl"
                />
               
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
