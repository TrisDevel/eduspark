"use client";
import { useEffect, useState } from "react";
import { classesApi } from "../api";
import { Class } from "@/mocks/fixtures/classes";

type UseClassesState = {
  classes: Class[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useClasses(): UseClassesState {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await classesApi.getAllClasses();
      setClasses(data);
    } catch (e) {
      console.log(e);
      setError(e instanceof Error ? e.message : "Unknown error");
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return { classes, loading, error, refetch: fetchClasses };
}

export function useClassById(id: number) {
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClass = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await classesApi.getClassById(id);
      setClassData(data);
    } catch (e) {
      console.log(e);
      setError(e instanceof Error ? e.message : "Unknown error");
      setClassData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClass();
  }, [id]);

  return { classData, loading, error, refetch: fetchClass };
}

export function useClassesByCategory(category: string) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    if (!category) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await classesApi.getClassesByCategory(category);
      setClasses(data);
    } catch (e) {
      console.log(e);
      setError(e instanceof Error ? e.message : "Unknown error");
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [category]);

  return { classes, loading, error, refetch: fetchClasses };
}

export function useEnrollInClass() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = async (classId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await classesApi.enrollInClass(classId);
      return result;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Unknown error";
      setError(errorMessage);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { enroll, loading, error };
}
