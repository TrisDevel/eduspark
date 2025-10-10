"use client";
import { useState } from "react";
import { runCode, submitCode, runCodePrecheck, runCodePractice, runCustomCode } from "../api";
import type { RunResponse, ExecutionResponse } from "@/features/exercises/type";

export function useRunCode(exerciseId: string) {
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<ExecutionResponse | null>(null);
  const [lastRunLegacy, setLastRunLegacy] = useState<RunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New precheck functionality - just runs code without saving to database
  const precheck = async (code: string) => {
    if (!code.trim()) {
      throw new Error("Code không được để trống");
    }
    setRunning(true);
    setError(null);
    try {
      console.log("[precheck] Sending request with code length:", code.length);
      const res = await runCodePrecheck({ exerciseId, code });
      setLastRun(res.data);
      console.log("[precheck] Success:", res.data);
      return res;
    } catch (e: any) {
      console.error("[precheck] Error:", e);
      setError(e.message || "Precheck failed");
      throw e;
    } finally {
      setRunning(false);
    }
  };

  // Practice mode - runs code and saves attempt to database
  const practice = async (code: string) => {
    if (!code.trim()) {
      throw new Error("Code không được để trống");
    }
    setRunning(true);
    setError(null);
    try {
      const res = await runCodePractice({ exerciseId, code });
      setLastRun(res.data);
      return res;
    } catch (e: any) {
      setError(e.message || "Practice run failed");
      throw e;
    } finally {
      setRunning(false);
    }
  };

  // Custom input run
  const runWithCustomInput = async (code: string, customInput: string) => {
    setRunning(true);
    setError(null);
    try {
      const res = await runCustomCode({ exerciseId, code, customInput });
      return res;
    } catch (e: any) {
      setError(e.message || "Custom run failed");
      throw e;
    } finally {
      setRunning(false);
    }
  };

  // Legacy functions for backward compatibility
  const run = async (code: string, language: string) => {
    setRunning(true);
    setError(null);
    try {
      const res = await runCode({ exerciseId, language, code });
      setLastRunLegacy(res.data);
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

  return { 
    run, 
    submit, 
    precheck, 
    practice, 
    runWithCustomInput,
    running, 
    lastRun, 
    lastRunLegacy, 
    error 
  };
}