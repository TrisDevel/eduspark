"use client";
import { useEffect, useState } from "react";
import { getExercise } from "../api";
import type { ExerciseDTO } from "@/features/exercises/type";

export function useExercise(slug: string) {
  const [data, setData] = useState<ExerciseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.debug("[useExercise] fetch slug =", slug);
    getExercise(slug)
      .then((d) => {
        console.debug("[useExercise] success slug =", slug, "id =", d?.id);
        setData(d);
      })
      .catch((e) => {
        console.error("[useExercise] error slug =", slug, e);
        setError(e.message || "Failed to load exercise");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading, error };
}