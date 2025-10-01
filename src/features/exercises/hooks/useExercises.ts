"use client";
import { useEffect, useState } from "react";
import { getExercise, getExercisesList, getTopics, getAdditionalTopics } from "../api";
import type { ExerciseDTO, ExerciseListItem } from "@/features/exercises/type";
import type { Topic } from "@/mocks/fixtures/exercises";

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

export function useExercisesList() {
  const [data, setData] = useState<ExerciseListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getExercisesList()
      .then((d) => setData(d))
      .catch((e) => setError(e.message || "Failed to load exercises"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useTopics() {
  const [data, setData] = useState<Topic[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTopics()
      .then((d) => setData(d))
      .catch((e) => setError(e.message || "Failed to load topics"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useAdditionalTopics() {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdditionalTopics()
      .then((d) => setData(d))
      .catch((e) => setError(e.message || "Failed to load additional topics"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}