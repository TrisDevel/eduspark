"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/fetcher";
import type { Chapter } from "@/features/courses/type/courseContent";

export function useCourseContent(courseId: string | number) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (id = courseId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api<Chapter[]>(`/courses/${id}/content`);
      setChapters(data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setChapters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId !== undefined && courseId !== null) fetchContent();
  }, [courseId]);

  return { chapters, loading, error, refetch: fetchContent };
}

export default useCourseContent;


