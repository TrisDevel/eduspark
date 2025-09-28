"use client";
import { useEffect, useState } from "react";
import { getCourseById } from "@/features/courses/api";
import type { Course } from "@/features/home/types/Course";

type UseCourseState = {
  course: Course | null;
  loading: boolean;
  error: string | null;
  refetch: (id?: string | number) => Promise<void>;
};

export default function useCourse(courseId: string | number): UseCourseState {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = async (id: string | number = courseId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourseById(id);
      setCourse(data as Course);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId !== undefined && courseId !== null) {
      fetchCourse(courseId);
    }
  }, [courseId]);

  return { course, loading, error, refetch: fetchCourse };
}


