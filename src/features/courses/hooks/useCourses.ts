"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/features/courses/api";
import { Course } from "@/features/courses/type/Course";
import { PageResponse } from "@/features/courses/type/pagination";

type UseCoursesState = {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination?: PageResponse<Course>;
};

export function useCourses(): UseCoursesState {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PageResponse<Course> | undefined>();

  const fetchCourses = async (page: number = 0, size: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourses(page, size);
      console.log(data);
      
      // Handle paginated response
      if (data && typeof data === 'object' && 'content' in data) {
        setCourses(data.content);
        setPagination({
          content: data.content,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          page: data.page,
          size: data.size
        });
      } else {
        // Fallback for non-paginated response
        setCourses(Array.isArray(data) ? data : []);
        setPagination(undefined);
      }
    } catch (e) {
      console.log(e);
      setError(e instanceof Error ? e.message : "Unknown error");
      setCourses([]);
      setPagination(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: fetchCourses, pagination };
}

export default useCourses;


