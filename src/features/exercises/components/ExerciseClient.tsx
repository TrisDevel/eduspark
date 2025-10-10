"use client";
import { useState, useEffect } from "react";
import RunPanel from "./RunPanel";
import { useExercise } from "@/features/exercises/hooks/useExercises";
import { useRunCode } from "@/features/exercises/hooks/useRunCode";
import type { MonacoLang } from "@/lib/monaco";
import { toast } from "sonner";
import CodeEditor from "./codeEditor";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ROUTES } from "@/config/routes";
import Link from "next/link";

export default function ExerciseClient({ slug }: { slug: string }) {
  const { data: ex, loading, error } = useExercise(slug);
  const [code, setCode] = useState("");
  const { precheck, practice, running, lastRun, error: runError } = useRunCode(ex?.id || "");

  // Map backend language to Monaco language
  const getMonacoLanguage = (backendLang?: string): MonacoLang => {
    if (!backendLang) return "java"; // default
    
    const langMap: Record<string, MonacoLang> = {
      'Java': 'java',
      'JavaScript': 'javascript', 
      'TypeScript': 'typescript',
      'Python': 'python',
      'C++': 'cpp',
      'CPP': 'cpp',
      // Add more mappings as needed
    };
    
    return langMap[backendLang] || "java";
  };

  // Get language from exercise data, not user selection
  const lang = getMonacoLanguage(ex?.language);

  useEffect(() => {

  }, [slug, ex?.id, ex?.language, lang]);

  useEffect(() => {
    if (error) {
      console.error("[ExerciseClient] load error =", error);
    }
  }, [slug, ex, error]);

  if (loading) return <main className="p-6">Đang tải bài tập…</main>;
  if (error) {
    return (
      <main className="p-6 text-red-600 space-y-3">
        <div>Lỗi tải bài tập: {String(error)}</div>
        <pre className="text-xs bg-red-50 p-2 rounded">
          Có thể backend trả về HTML (redirect / 404 / 500). Kiểm tra: 1. Đúng
          URL API? 2. Không bị redirect sang trang đăng nhập? 3. Content-Type có
          phải application/json?
        </pre>
      </main>
    );
  }
  if (!ex) {
    return (
      <main className="p-6 space-y-3">
        <div>Không tìm thấy bài tập (ex null).</div>
        <pre className="text-xs bg-yellow-50 p-2 rounded">
          Gợi ý kiểm tra: - Endpoint có trả JSON? (Network - Response - nhìn xem
          có &lt;!doctype) - Slug: {slug}- Kiểm tra hook useExercise: đã kiểm
          tra res.ok và Content-Type chưa?
        </pre>
      </main>
    );
  }

  const handleRun = async () => {
    if (!ex?.id) {
      toast.error("Exercise chưa sẵn sàng");
      return;
    }
    if (!code.trim()) {
      toast.error("Vui lòng nhập code trước khi chạy");
      return;
    }
    try {
      console.debug("[handleRun] exerciseId=", ex.id, "running precheck");
      await precheck(code);
      toast.success("Đã chạy xong");
    } catch (e: any) {
      console.error("[handleRun] error:", e);
      toast.error(e.message || "Run failed");
    }
  };

  const handleSubmit = async () => {
    if (!lastRun) {
      toast.error("Cần chạy trước khi submit");
      return;
    }
    try {
      console.debug("[handleSubmit] exerciseId=", ex.id, "running practice mode");
      const res = await practice(code);
      if (res.data.score >= 100) {
        toast.success("Accepted 🎉");
      } else {
        toast.error(`Score: ${res.data.score}% - Cần cải thiện`);
      }
    } catch (e: any) {
      console.error("[handleSubmit] error:", e);
      toast.error(e.message || "Submit failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header with enhanced styling */}
      <div className="border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: "Home", href: ROUTES.home },
                { label: "Luyện tập", href: ROUTES.play.exercises },
                { label: ex.title },
              ]}
            />
            <div className="flex items-center gap-3">
              {/* Progress indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Đang làm bài</span>
              </div>
              <Link
                href={ROUTES.play.exercises}
                className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Đóng
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Enhanced title section */}
        <div className="animate-fade-in-up">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                  {ex.title}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      ex.difficulty === 'Easy' ? 'bg-green-500' : 
                      ex.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ex.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      ex.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    } transition-all duration-300 hover:scale-105`}>
                      {ex.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium">{ex.points} điểm</span>
                  </div>
                  {ex.characterLimit && (
                    <div className="flex items-center gap-1 text-blue-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm">Giới hạn: {ex.characterLimit} ký tự</span>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Enhanced layout with better spacing and design */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up animation-delay-400">
          {/* Problem description panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-600/30 overflow-hidden">
              {/* Header with icon */}
              <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-b border-gray-600/30">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Đề bài</h2>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {ex.statement}
                  </div>
                </div>
                
                {/* Setup instructions with enhanced styling */}
                {ex.setup && (
                  <div className="mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-amber-400">Yêu cầu chi tiết</h3>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-gray-600/20">
                      <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                        {ex.setup}
                      </div>
                    </div>
                  </div>
                )}

                {/* Example section with real test case */}
                {ex.testCases && ex.testCases.length > 0 && (
                  <div className="mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-green-400">Ví dụ</h3>
                      {ex.testCases.length > 1 && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          {ex.testCases.length} test cases
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {/* First test case */}
                      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-gray-600/20">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center">
                            <span className="text-xs text-green-400 font-bold">1</span>
                          </div>
                          <span className="text-xs text-gray-400">Test Case #{ex.testCases[0].id}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400 mb-2">Input:</div>
                            <code className="text-blue-300 bg-gray-800/50 px-2 py-1 rounded block break-all">
                              {Array.isArray(ex.testCases[0].input) 
                                ? JSON.stringify(ex.testCases[0].input)
                                : String(ex.testCases[0].input)
                              }
                            </code>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-2">Expected Output:</div>
                            <code className="text-green-300 bg-gray-800/50 px-2 py-1 rounded block break-all">
                              {String(ex.testCases[0].expectedOutput)}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* Show second test case if available */}
                      {ex.testCases.length > 1 && (
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-gray-600/20">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center">
                              <span className="text-xs text-blue-400 font-bold">2</span>
                            </div>
                            <span className="text-xs text-gray-400">Test Case #{ex.testCases[1].id}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400 mb-2">Input:</div>
                              <code className="text-blue-300 bg-gray-800/50 px-2 py-1 rounded block break-all">
                                {Array.isArray(ex.testCases[1].input) 
                                  ? JSON.stringify(ex.testCases[1].input)
                                  : String(ex.testCases[1].input)
                                }
                              </code>
                            </div>
                            <div>
                              <div className="text-gray-400 mb-2">Expected Output:</div>
                              <code className="text-green-300 bg-gray-800/50 px-2 py-1 rounded block break-all">
                                {String(ex.testCases[1].expectedOutput)}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Show "and more" indicator if there are more test cases */}
                      {ex.testCases.length > 2 && (
                        <div className="text-center py-2">
                          <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                            +{ex.testCases.length - 2} test cases khác sẽ được kiểm tra khi bạn submit
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced code editor panel */}
          <div className="space-y-6">
            {/* Toolbar with better design */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-600/30 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-b border-gray-600/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Ngôn ngữ</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-600/50 rounded-lg border border-gray-500/30">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-purple-300 font-medium">{ex?.language || 'Java'}</span>
                    <span className="text-xs text-gray-400">(Tự động)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Run button with enhanced styling */}
                  <button
                    onClick={handleRun}
                    disabled={running || !ex.id}
                    className="flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    {running ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Đang chạy...</span>
                      </>
                    ) : (
                      <>
                        <span>Chạy</span>
                      </>
                    )}
                  </button>

                  {/* Submit button with enhanced styling */}
                  <button
                    onClick={handleSubmit}
                    disabled={!lastRun || running}
                    className="flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-orange-400 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                  >
                    <span>Nộp bài</span>
                  </button>
                </div>
              </div>

              {/* Code editor with enhanced container */}
              <div className="p-6">
                <div className="rounded-xl overflow-hidden border border-gray-600/30 bg-gray-900/50">
                  <CodeEditor
                    exerciseId={ex.id}
                    language={lang}
                    setupCode={ex.setup}
                    onChange={setCode}
                    height={460}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced results panel */}
            <div className="animate-fade-in-up animation-delay-1000">
              <RunPanel data={lastRun} />
            </div>
          </div>
        </div>

        {/* Additional floating elements for professional look */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
          {/* Help button */}
          <button className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Theme toggle */}
          <button className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
