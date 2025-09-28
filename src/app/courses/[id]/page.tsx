"use client";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import useCourse from "@/features/courses/hooks/useCourse";
import { ROUTES } from "@/config/routes";
import CourseDetailHero from "@/features/courses/components/CourseDetailHero";
import CourseContent from "@/features/courses/components/CourseContent";
import type { Chapter } from "@/features/courses/type/courseContent";
import useCourseContent from "@/features/courses/hooks/useCourseContent";

export default function CourseDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { course, loading, error, refetch } = useCourse(id);
  const {
    chapters,
    loading: contentLoading,
    error: contentError,
  } = useCourseContent(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: ROUTES.home },
              { label: "Khóa học", href: ROUTES.courses.all },
              { label: course?.title || "Đang tải..." },
            ]}
          />
        </div>
      </section>

      {!loading && !error && course && <CourseDetailHero course={course} />}
      {loading && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            Đang tải nội dung khóa học…
          </div>
        </section>
      )}
      {error && !loading && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-red-600">
            {error}
          </div>
        </section>
      )}

      {/* Tabs */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 text-sm overflow-x-auto">
            {["Introduction", "Reviews", "Certificates", "Curriculum"].map(
              (t, i) => (
                <button
                  key={t}
                  className={`py-3 border-b-2 -mb-px ${
                    i === 0
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What you will learn */}
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-4">What you will learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  "Understand fundamental sorting algorithms",
                  "Implement data structures efficiently",
                  "Solve real-world programming problems",
                  "Master searching techniques and optimization",
                  "Analyze time and space complexity",
                  "Build algorithmic thinking skills",
                ].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] grid place-items-center">
                      ✔
                    </span>
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Goals</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Build a strong foundation in algorithmic thinking",
                    "Develop problem-solving skills for technical interviews",
                    "Understand computational complexity and optimization",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Who This Course Is For</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Computer science students",
                    "Self-taught programmers",
                    "Job seekers preparing for technical interviews",
                    "Developers wanting to improve problem-solving skills",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why join & Prerequisites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Why Join This Course</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Completely free with lifetime access",
                    "Hands-on coding exercises and projects",
                    "Certificate of completion",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Prerequisites</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Basic programming knowledge in any language",
                    "Understanding of basic mathematical concepts",
                    "Willingness to practice and solve problems",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold mb-3">Skills You'll Gain</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "C Programming",
                  "Algorithms",
                  "Data Structures",
                  "Problem Solving",
                  "Time Complexity",
                  "Space Complexity",
                  "Sorting",
                  "Searching",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-xs border bg-white text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-white rounded-xl border p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">
                  {course?.price}
                </div>
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                  Start Learning Now
                </button>
                <button
                  onClick={() => refetch()}
                  className="mt-2 w-full border border-gray-200 py-2 rounded-lg hover:bg-gray-50"
                >
                  Refresh
                </button>
              </div>

              <div className="bg-white rounded-xl border p-4">
                <h4 className="font-semibold mb-3">Course Information</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex justify-between">
                    <span>Level</span>
                    <span>Beginner</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Language</span>
                    <span>English</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Updated</span>
                    <span>2025-01-01</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Duration</span>
                    <span>{course?.duration}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Learners</span>
                    <span>{course?.students.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Certificate</span>
                    <span>Included</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Course Content */}
      {!contentLoading && !contentError && (
        <CourseContent chapters={chapters as Chapter[]} />
      )}
    </div>
  );
}
