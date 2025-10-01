"use client";
import type { Course } from "@/features/home/types/Course";

type Props = {
  course: Course;
};

export default function CourseDetailHero({ course }: Props) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left column: text + stats */}
              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                  {course.title}
                </h1>
                {course.description && (
                  <p className="text-gray-600 mb-5 leading-relaxed text-base md:text-lg">
                    {course.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Free", "Programming", "Algorithm"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1.5 text-xs rounded-full bg-orange-50 text-orange-600 border border-orange-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm md:text-base font-semibold cursor-pointer">
                  Start Learning Now
                </button>
              </div>
              {/* Right column: image */}
              <div className="flex flex-col items-center justify-start">
                <img
                  src={course.image.src}
                  alt={course.title}
                  className="w-full  md:max-w-sm h-40 md:h-44 object-contain"
                />
                {/* Small stats under image, right column */}
                <div className="mt-4 w-full rounded-xl border border-gray-200 p-4 md:p-5 bg-white shadow-lg">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">
                        24
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        Lessons
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">
                        8h 30m
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        Duration
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">
                        {course.students.toLocaleString()}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        Learners
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
