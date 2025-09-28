"use client";
import { useMemo, useState } from "react";
import type { Chapter } from "@/features/courses/type/courseContent";

type Props = { chapters: Chapter[] };

export default function CourseContent({ chapters }: Props) {
  const [activeChapterId, setActiveChapterId] = useState<string>(
    chapters[0]?.id || ""
  );

  const activeChapter = useMemo(
    () => chapters.find((c) => c.id === activeChapterId) || chapters[0],
    [chapters, activeChapterId]
  );

  const totalLessons = useMemo(
    () => chapters.reduce((sum, c) => sum + c.lessons.length, 0),
    [chapters]
  );

  return (
    <section className="bg-white">
      <div className="max-w-7xl xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border bg-white">
              <div className="px-4 py-3 border-b">
                <h3 className="text-sm font-semibold text-gray-900">
                  Course Content
                </h3>
                <p className="text-xs text-gray-500">
                  {chapters.length} chapters • {totalLessons} lessons
                </p>
              </div>
              <div className="divide-y">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterId(ch.id)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between text-sm transition-colors ${
                      ch.id === activeChapterId
                        ? "bg-orange-50 text-orange-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="line-clamp-1">{ch.title}</span>
                    <span className="text-xs text-gray-400">
                      {ch.lessons.length} lessons
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-white">
              <div className="px-5 py-4 border-b">
                <h3 className="font-semibold">
                  {activeChapter?.title || "Chapter"}
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {activeChapter?.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-lg border flex items-center justify-between hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 grid place-items-center font-semibold">
                        {lesson.title.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {lesson.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lesson.durationMinutes} minutes
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-300">•</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
