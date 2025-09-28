"use client";
import { Course } from "@/features/home/types/Course";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 1.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Image Area */}
      <div className="h-48 relative overflow-hidden">
        <img
          src={course.image.src}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        {/* Stats Row */}
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{course.students.toLocaleString()} Students</span>
          <span>{course.duration}</span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {course.title}
        </h3>

        {/* Description (only for first course) */}
        {course.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-3">
            {course.description}
          </p>
        )}

        {/* Price and Action */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            {course.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
