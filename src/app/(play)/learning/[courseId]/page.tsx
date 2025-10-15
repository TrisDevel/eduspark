"use client";
import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSections } from "@/features/courses/hooks/useSections";
import CourseLearning from "@/features/courses/components/CourseLearning";
import Protected from "@/components/layout/Protected";

function LearningContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const courseName = searchParams.get("name") || "Course Content";
  const { sections, loading, error } = useSections(courseId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Course
          </h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <a
            href="/profile"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Back to Profile
          </a>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Content Available
          </h2>
          <p className="text-gray-600 mb-4">
            This course doesn't have any sections yet.
          </p>
          <a
            href="/profile"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Back to Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <Protected>
      <CourseLearning sections={sections} courseName={courseName} />
    </Protected>
  );
}

export default function LearningPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 text-lg">Loading course...</p>
          </div>
        </div>
      }
    >
      <LearningContent />
    </Suspense>
  );
}
