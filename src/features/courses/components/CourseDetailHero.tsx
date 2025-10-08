"use client";
import type { Course } from "@/features/courses/type/Course";
import type { User } from "@/contexts/types/UserDto";
import type { Tag, Section } from "@/features/courses/type/CourseDetail";

type Props = {
  course: Course;
  user: User | null;
  tags: Tag[];
  sections: Section[];
};

export default function CourseDetailHero({
  course,
  user,
  tags,
  sections,
}: Props) {
  // Calculate total lessons and videos
  const totalLessons = sections.reduce(
    (acc, section) => acc + (section.courseMaterials?.length || 0),
    0
  );

  const totalVideos = sections.reduce(
    (acc, section) =>
      acc +
      (section.courseMaterials?.filter((m) => m.materialType === "VIDEO")
        .length || 0),
    0
  );

  const totalDuration = sections.reduce(
    (acc, section) =>
      acc +
      (section.courseMaterials?.reduce(
        (sum, m) => sum + (m.expectDuration || 0),
        0
      ) || 0),
    0
  );

  // Convert minutes to hours and minutes
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left column: text + stats */}
              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                  {course.name}
                </h1>
                {course.description && (
                  <p className="text-gray-600 mb-5 leading-relaxed text-base md:text-lg">
                    {course.description}
                  </p>
                )}
                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag.tagId}
                        className="px-2.5 py-1.5 text-xs rounded-full bg-orange-50 text-orange-600 border border-orange-200"
                      >
                        {tag.tagName}
                      </span>
                    ))}
                  </div>
                )}
                <button className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm md:text-base font-semibold cursor-pointer">
                  Start Learning Now
                </button>

                {/* Instructor Section */}
                {user && (
                  <div className="mt-3 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Giảng viên
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {user.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 truncate">
                          {user.username}
                        </h5>
                        <p className="text-sm text-gray-600 truncate">
                          {user.email}
                        </p>
                        {user.role && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                            {user.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Right column: image */}
              <div className="flex flex-col items-center justify-start">
                <img
                  src={"http://localhost:8080/" + course.image}
                  alt={course.name}
                  className="w-full  md:max-w-sm h-40 md:h-44 object-contain"
                />
                {/* Small stats under image, right column */}
                <div className="mt-4 w-full rounded-xl border border-gray-200 p-4 md:p-5 bg-white shadow-lg">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">
                        {totalLessons}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        Lessons
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-orange-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                        <div className="text-xl md:text-2xl font-bold text-gray-900">
                          {totalVideos}
                        </div>
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        Videos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">
                        {hours}h {minutes}m
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        Duration
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
