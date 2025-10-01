"use client";
import React, { useMemo, useState } from "react";
import useCourses from "@/features/courses/hooks/useCourses";
import CourseCard from "@/features/home/components/CourseCard";
import { motion } from "framer-motion";

export default function AllCourses() {
  const { courses, loading, error, refetch } = useCourses();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  // framer-motion variants
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  } as const;

  const listItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  } as const;

  const tags = [
    "All",
    "Algorithms",
    "C++",
    "Python",
    "React",
    "Machine Learning",
    "Node.js",
    "Data Science",
    "iOS",
  ];

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return courses.filter((c) => {
      const matchText =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q);
      const matchTag =
        activeTag === "All" ||
        c.title.toLowerCase().includes(activeTag.toLowerCase());
      return matchText && matchTag;
    });
  }, [courses, query, activeTag]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero placeholder */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden"
          >
            <img
              src="/images/Course/hero-section.png"
              alt="Courses Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-2"
          >
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  activeTag === t
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50"
                }`}
              >
                {t}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm khóa học..."
                  className="w-64 max-w-[70vw] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
              <button
                onClick={refetch}
                className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Làm mới
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading && (
            <div className="text-center text-gray-600">Đang tải khóa học…</div>
          )}
          {error && !loading && (
            <div className="text-center text-red-600">{error}</div>
          )}
          {!loading && !error && (
            <motion.div
              variants={listContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((course) => (
                <motion.div key={course.id} variants={listItem}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
