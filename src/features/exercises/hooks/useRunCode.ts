"use client";
import { useState } from "react";
import { runCode, submitCode } from "../api";
import type { RunResponse } from "@/features/exercises/type";

export function useRunCode(exerciseId: string) {
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<RunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (code: string, language: string) => {
    setRunning(true);
    setError(null);
    try {
      const res = await runCode({ exerciseId, language, code });
      setLastRun(res);
      return res;
    } catch (e: any) {
      setError(e.message || "Run failed");
      throw e;
    } finally {
      setRunning(false);
    }
  };

  const submit = async (code: string, language: string) => {
    return submitCode({ exerciseId, language, code });
  };

  return { run, submit, running, lastRun, error };
}