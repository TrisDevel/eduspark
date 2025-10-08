"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen, Users, Star, TrendingUp } from "lucide-react";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { ClassCard } from "@/features/classes/components/ClassCard";
import { Class } from "@/mocks/fixtures/classes";

const categories = [
  { id: "all", name: "Tất cả", icon: BookOpen },
  { id: "Lập trình", name: "Lập trình", icon: BookOpen },
  { id: "Web Development", name: "Web Development", icon: BookOpen },
  { id: "Data Science", name: "Data Science", icon: TrendingUp },
  { id: "Mobile Development", name: "Mobile Development", icon: BookOpen },
  { id: "Design", name: "Design", icon: Star },
];

const levels = [
  { id: "all", name: "Tất cả" },
  { id: "beginner", name: "Cơ bản" },
  { id: "intermediate", name: "Trung bình" },
  { id: "advanced", name: "Nâng cao" },
];

export default function ClassesPage() {
  const { classes, loading, error } = useClasses();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredClasses = classes?.filter((classItem: Class) => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || classItem.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || classItem.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h2>
          <p className="text-gray-600">Vui lòng thử lại sau</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Khám phá Lớp học
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-orange-100 mb-8"
            >
              Tham gia các lớp học chất lượng cao với giảng viên chuyên nghiệp
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm lớp học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Bộ lọc
              </button>
              <span className="text-gray-600">
                {filteredClasses.length} lớp học
              </span>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-4 w-full lg:w-auto"
              >
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                          selectedCategory === category.id
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>

                {/* Level Filter */}
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        selectedLevel === level.id
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredClasses.map((classItem, index) => (
              <ClassCard
                key={classItem.id}
                classData={classItem}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy lớp học
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
