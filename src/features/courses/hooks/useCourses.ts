"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/features/courses/api";
import { Course } from "@/features/home/types/Course";

type UseCoursesState = {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useCourses(): UseCoursesState {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      console.log(data);
      setCourses(data as Course[]);
    } catch (e) {
      console.log(e);
      setError(e instanceof Error ? e.message : "Unknown error");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: fetchCourses };
}

export default useCourses;


