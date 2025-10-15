"use client";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ROUTES } from "@/config/routes";
import CourseDetailHero from "@/features/courses/components/CourseDetailHero";
import useCourseById from "@/features/courses/hooks/useCourseById";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
} as const;

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
} as const;

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
} as const;

export default function CourseDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { course, loading, error, refetch } = useCourseById(id);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải nội dung khóa học...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Có lỗi xảy ra</p>
          <p className="mt-2">{error || "Không tìm thấy khóa học"}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      {/* Breadcrumb */}
      <motion.section
        className="bg-white border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: ROUTES.home },
              { label: "Khóa học", href: ROUTES.courses.all },
              { label: course.course.name },
            ]}
          />
        </div>
      </motion.section>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CourseDetailHero
          course={course.course}
          user={course.user}
          tags={course.tags}
          sections={course.sections}
        />
      </motion.div>

      <div className="border-b"></div>

      {/* Main Content */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* What you will learn */}
            <motion.div
              className="border rounded-xl p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">
                What you will learn
              </h3>
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
            </motion.div>

            {/* Goals & Audience */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
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
            </motion.div>

            {/* Why join & Prerequisites */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
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
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* Course Curriculum - Sections */}
            {course.sections && course.sections.length > 0 && (
              <motion.div
                className="border rounded-xl p-6"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-semibold mb-4">
                  Nội dung khóa học
                </h3>
                <div className="space-y-3">
                  {course.sections
                    .sort((a, b) => a.orderNumber - b.orderNumber)
                    .map((section) => (
                      <div
                        key={section.sectionId}
                        className="border rounded-lg overflow-hidden"
                      >
                        {/* Section Header */}
                        <button
                          onClick={() => toggleSection(section.sectionId.toString())}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-orange-500">
                              {expandedSections.has(section.sectionId.toString()) ? (
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
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              ) : (
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
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="font-semibold text-left">
                              {section.sectionName}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {section.courseMaterials?.length || 0} bài học
                          </span>
                        </button>

                        {/* Section Materials */}
                        <AnimatePresence initial={false}>
                          {expandedSections.has(section.sectionId.toString()) &&
                            section.courseMaterials &&
                            section.courseMaterials.length > 0 && (
                              <motion.div
                                key={`section-${section.sectionId}`}
                                className="bg-white divide-y overflow-hidden"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.04, 0.62, 0.23, 0.98],
                                }}
                              >
                                {section.courseMaterials
                                  .sort((a, b) => a.orderNum - b.orderNum)
                                  .map((material, index) => (
                                    <motion.div
                                      key={material.courseMaterialId}
                                      className="p-4 hover:bg-gray-50 transition-colors ml-4"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -20 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                      }}
                                    >
                                      <div className="flex items-start gap-3">
                                        {/* Material Type Icon */}
                                        <span className="mt-1 text-gray-400">
                                          {material.materialType === "VIDEO" ? (
                                            <svg
                                              className="w-5 h-5"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                            </svg>
                                          ) : material.materialType ===
                                            "DOCUMENT" ? (
                                            <svg
                                              className="w-5 h-5"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          ) : (
                                            <svg
                                              className="w-5 h-5"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                              <path
                                                fillRule="evenodd"
                                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          )}
                                        </span>

                                        <div className="flex-1 ">
                                          <h5 className="font-medium text-gray-900">
                                            {material.title ||
                                              material.materialName}
                                          </h5>
                                          {material.materialName && (
                                            <p className="text-sm text-gray-500 mt-1">
                                              {material.materialName}
                                            </p>
                                          )}
                                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                              <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                              </svg>
                                              {material.expectDuration} phút
                                            </span>
                                           
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.aside
            className="lg:col-span-1"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-20 space-y-6">
              {/* Course Card */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {course.course.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.course.description}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {course.course.price > 0
                        ? `${course.course.price.toLocaleString()} VND`
                        : "Miễn phí"}
                    </div>
                    {course.course.discount > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        Giảm {course.course.discount}%
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
                    Đăng ký ngay
                  </button>
                </div>
              </div>

              {/* Course Information */}
              <div className="bg-white rounded-xl border p-6">
                <h4 className="font-semibold text-lg mb-4">
                  Thông tin khóa học
                </h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600 flex items-center gap-2">
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
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Mã khóa học
                    </span>
                    <span className="font-semibold">{course.course.code}</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600 flex items-center gap-2">
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Cấp độ
                    </span>
                    <span className="font-semibold">{course.course.level}</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600 flex items-center gap-2">
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
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      Ngôn ngữ
                    </span>
                    <span className="font-semibold">
                      {course.course.language}
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600 flex items-center gap-2">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Thời lượng
                    </span>
                    <span className="font-semibold">
                      {course.course.durationInWeeks} tuần
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600 flex items-center gap-2">
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Bài học
                    </span>
                    <span className="font-semibold">
                      {course.sections?.reduce(
                        (acc, section) =>
                          acc + (section.courseMaterials?.length || 0),
                        0
                      ) || 0}{" "}
                      bài
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center gap-2">
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
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                      Chứng chỉ
                    </span>
                    <span className="font-semibold text-green-600">Có</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </motion.div>
  );
}
