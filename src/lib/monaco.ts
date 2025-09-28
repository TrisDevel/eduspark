// src/lib/monaco.ts
export const MONACO_LANGS = ["javascript", "typescript", "python", "cpp", "java"] as const;
export type MonacoLang = typeof MONACO_LANGS[number];

export const DEFAULT_CODE: Record<MonacoLang, string> = {
  javascript: `function solve(input) {
  // TODO: write your code here
  return 0;
}
`,
  typescript: `function solve(input: number[]): number {
  // TODO: write your code here
  return 0;
}
export {};
`,
  python: `def solve(arr):
    # TODO: write your code here
    return 0
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;
int solve(vector<int>& a){
    // TODO: write your code here
    return 0;
}
int main(){ ios::sync_with_stdio(false); cin.tie(nullptr);
    // parse input if needed
    return 0;
}
`,
  java: `import java.util.*;
public class Main {
  static int solve(int[] a){
    // TODO: write your code here
    return 0;
  }
  public static void main(String[] args){
    // parse input if needed
  }
}
`,
};

export const EDITOR_OPTIONS = {
  fontSize: 14,
  minimap: { enabled: false },
  smoothScrolling: true,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
} as const;

// Key lưu code theo bài + ngôn ngữ
export const codeStorageKey = (exerciseId: string, lang: MonacoLang) =>
  `eduspark:code:${exerciseId}:${lang}`;

export function loadCode(exerciseId: string, lang: MonacoLang) {
  if (typeof window === "undefined") return DEFAULT_CODE[lang];
  const key = codeStorageKey(exerciseId, lang);
  return localStorage.getItem(key) ?? DEFAULT_CODE[lang];
}

export function saveCode(exerciseId: string, lang: MonacoLang, code: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(codeStorageKey(exerciseId, lang), code);
}

// (tuỳ chọn) debounce để giảm số lần ghi localStorage
export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}   