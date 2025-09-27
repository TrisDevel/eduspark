"use client";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import useCourses from "@/features/courses/hooks/useCourses";

export default function PopularCourses() {
  const { courses } = useCourses();
  console.log(courses);
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Khóa học <span className="text-orange-500">phổ biến</span>
          </h2>
          <p className="text-gray-500 mt-2">Hãy biến ước mơ thành sự thật</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-12 rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-1">
                  <CourseCard course={course} />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Tham khảo thêm
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
