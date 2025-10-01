"use client";
import { useState } from "react";
import {
  useExercisesList,
  useTopics,
  useAdditionalTopics,
} from "@/features/exercises/hooks/useExercises";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function ExercisesPage() {
  const { data: exercises, loading: exercisesLoading } = useExercisesList();
  const { data: topics, loading: topicsLoading } = useTopics();
  const { data: additionalTopics, loading: additionalTopicsLoading } =
    useAdditionalTopics();

  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("Tất cả");
  const [sortBy, setSortBy] = useState<string>("default");

  const filteredExercises = exercises?.filter((exercise) => {
    const matchesTopic =
      selectedTopic === "All" || exercise.tags?.includes(selectedTopic);
    const matchesSearch = exercise.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || exercise.difficulty === difficultyFilter;
    return matchesTopic && matchesSearch && matchesDifficulty;
  });

  // Sort exercises
  const sortedExercises = [...(filteredExercises || [])].sort((a, b) => {
    switch (sortBy) {
      case "acceptance":
        return (b.acceptance || 0) - (a.acceptance || 0);
      case "difficulty":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return (
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        );
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (exercisesLoading || topicsLoading || additionalTopicsLoading) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải bài tập...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-white min-h-screen">
      <Breadcrumb
        items={[{ label: "Home", href: ROUTES.home }, { label: "Luyện tập" }]}
      />

      <div className="space-y-6 max-w-[90%] mt-10 mx-auto">
        {/* Header */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Luyện tập</h1>
          <p className="text-gray-600">
            Giải quyết các thách thức mã hóa để cải thiện kỹ năng của bạn
          </p>
        </div>

        {/* Topics Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 animate-fade-in-up animation-delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Chủ đề</h2>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors duration-200">
              Expand
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics?.map((topic, index) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-3 py-1.5 cursor-pointer hover:bg-gray-100 border border-gray-200 rounded-sm text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedTopic === topic.name
                    ? "bg-orange-500 text-white border border-orange-200 scale-105"
                    : "bg-gray-50  text-gray-700 hover:bg-gray-200"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {topic.name} ({topic.count || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 items-center justify-between animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[
                "Tất cả",
                "Thuật toán",
                "Database",
                "Shell",
                "Concurrency",
                "JavaScript",
              ].map((category, index) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer hover:bg-gray-100 border border-gray-200 transition-all duration-300 transform hover:scale-105 ${
                    categoryFilter === category
                      ? "bg-orange-500 text-white border border-orange-200 scale-105"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-4 animate-fade-in-up animation-delay-600">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm"
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 focus:scale-105"
            />
            <svg
              className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-3 bg-orange-100 border border-orange-200 rounded-lg text-sm text-orange-700 hover:bg-orange-200 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              Sắp xếp
            </button>

            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              Lọc
            </button>
          </div>
        </div>
        {/* Exercises Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-fade-in-up animation-delay-800">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Acceptance
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Level
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedExercises?.map((exercise, index) => (
                  <tr
                    key={exercise.id}
                    className="hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-4 py-3">
                      {exercise.status === "Solved" ? (
                        <svg
                          className="h-5 w-5 text-white bg-green-500 rounded-full transition-transform duration-300 hover:scale-110"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={ROUTES.play.exerciseDetail(exercise.slug)}
                        className="text-gray-900 hover:text-orange-500 text-sm transition-colors duration-300"
                      >
                        {exercise.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {exercise.acceptance?.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          exercise.difficulty === "Easy"
                            ? "bg-blue-100 text-blue-800"
                            : exercise.difficulty === "Medium"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {exercise.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {exercise.tags?.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                            style={{ animationDelay: `${tagIndex * 100}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                        {exercise.tags && exercise.tags.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{exercise.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between animate-fade-in-up animation-delay-1000">
          <div className="text-sm text-gray-600">
            Showing {sortedExercises?.length || 0} problems
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-orange-100 text-orange-800 border border-orange-200 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              3
            </button>
            <span className="px-2 text-sm text-gray-500">...</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              Next
            </button>
          </div>
        </div>

        {sortedExercises?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Không tìm thấy bài tập nào
            </div>
            <div className="text-gray-400 text-sm mt-2">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
