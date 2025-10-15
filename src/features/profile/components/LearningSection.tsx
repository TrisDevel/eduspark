"use client";

import Link from "next/link";
import type { PurchasedCourse } from "../types";

interface LearningSectionProps {
  courses?: PurchasedCourse[];
}

export default function LearningSection({
  courses = [],
}: LearningSectionProps) {
  const displayCourses = courses.length > 0 ? courses : [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">HỌC TẬP</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-4 py-2 text-sm font-medium text-orange-500 border-b-2 border-orange-500">
          Tất cả khoá học
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Đã đăng ký
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Hoàn thành
        </button>
      </div>

      {/* Course Card */}
      {displayCourses.map((course) => (
        <div key={course.id} className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-4">
            {/* Course Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-medium text-lg">
                  {course.language}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.name}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.level}
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex text-sm text-gray-600 mb-1">
                  <span>Cấp độ:</span>
                  <span className="font-medium ml-2">{course.level}</span>
                </div>
                {/* <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${course.discountedPrice}%` }}
                  ></div>
                </div> */}
              </div>

              {/* Continue Button */}
              <Link
                href={`/learning/${course.id}?name=${encodeURIComponent(course.name)}`}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Tiếp tục học
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
