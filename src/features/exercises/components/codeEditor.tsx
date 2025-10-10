// src/features/exercises/components/CodeEditor.tsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  debounce,
  EDITOR_OPTIONS,
  loadCode,
  MonacoLang,
  saveCode,
} from "@/lib/monaco";

// Dynamic import Monaco (chỉ chạy ở client)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-lg border bg-white/50 p-4">
      <p className="text-sm text-gray-500">Loading editor…</p>
    </div>
  ),
});

type Props = {
  exerciseId: string;
  language: MonacoLang; // "javascript" | "python" | ...
  setupCode?: string; // Setup code from backend
  onChange?: (code: string) => void; // callback cho parent (nếu cần)
  height?: string | number; // mặc định 460
};

export default function CodeEditor({
  exerciseId,
  language,
  setupCode,
  onChange,
  height = 460,
}: Props) {
  const [value, setValue] = useState("");
  const debouncedSave = useMemo(() => debounce(saveCode, 300), []);
  const latestLang = useRef(language);

  // Load code khi mount hoặc đổi language
  useEffect(() => {
    latestLang.current = language;
    
    
    // Check if there's saved code first, then fallback to setup code, then default
    const savedCode = typeof window !== "undefined" ? localStorage.getItem(`eduspark:code:${exerciseId}:${language}`) : null;
    
    
    if (savedCode) {
      // User has previously written code for this exercise
      setValue(savedCode);
    } else if (setupCode && setupCode.trim() && isValidCode(setupCode)) {
      // Use setup code from backend if it looks like actual code
      setValue(setupCode);
    } else {
      // Fallback to default template
      const defaultCode = loadCode(exerciseId, language);
      setValue(defaultCode);
    }
  }, [exerciseId, language, setupCode]);

  // Helper function to check if setup code looks like actual code
  const isValidCode = (code: string): boolean => {
    const codeIndicators = [
      'import', 'public', 'class', 'function', 'def', 'var', 'let', 'const',
      '{', '}', '(', ')', ';', '//', '/*', '#include', 'using namespace'
    ];
    
    return codeIndicators.some(indicator => code.includes(indicator));
  };

  const handleChange = (val?: string) => {
    const code = val ?? "";
    setValue(code);
    debouncedSave(exerciseId, latestLang.current, code);
    onChange?.(code);
  };

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 shadow-sm">
      <MonacoEditor
        height={height}
        language={language}
        value={value}
        onChange={handleChange}
        options={EDITOR_OPTIONS as any}
        theme="vs-dark"
      />
    </div>
  );
}
