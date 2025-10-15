"use client";
import { useState, useEffect } from "react";
import { getSectionsByCourseId } from "../api";
import type { Section } from "../type/CourseDetail";

export function useSections(courseId: string | number) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const data = await getSectionsByCourseId(courseId);
        setSections(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchSections();
    }
  }, [courseId]);

  return { sections, loading, error };
}

