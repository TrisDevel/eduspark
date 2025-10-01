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
  const [lang, setLang] = useState<MonacoLang>("javascript");
  const [code, setCode] = useState("");
  const { run, submit, running, lastRun } = useRunCode(ex?.id || "");

  useEffect(() => {
    console.debug("[ExerciseClient] slug =", slug, "ex?.id =", ex?.id);
  }, [slug, ex?.id]);

  useEffect(() => {
    console.debug("[ExerciseClient] slug =", slug);
    console.debug("[ExerciseClient] ex =", ex);
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
      toast.warning?.("Code trống");
    }
    try {
      console.debug("[handleRun] exerciseId=", ex.id, "lang=", lang);
      await run(code, lang);
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
      console.debug("[handleSubmit] exerciseId=", ex.id, "lang=", lang);
      const res = await submit(code, lang);
      toast[res.verdict === "ACCEPTED" ? "success" : "error"](
        res.verdict === "ACCEPTED" ? "Accepted 🎉" : "Rejected"
      );
    } catch (e: any) {
      console.error("[handleSubmit] error:", e);
      toast.error(e.message || "Submit failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between animate-fade-in-up">
          <Breadcrumb
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Luyện tập", href: ROUTES.play.exercises },
              { label: ex.title },
            ]}
          />
          <Link
            href={ROUTES.play.exercises}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Đóng
          </Link>
        </div>
        <div className="flex items-center justify-between animate-fade-in-up animation-delay-200">
          <div>
            <h1 className="text-3xl font-bold text-white">{ex.title}</h1>
            <div className="mt-2 flex items-center gap-3">
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-all duration-300 hover:scale-105">
                {ex.difficulty}
              </span>
              <span className="text-sm text-gray-300 transition-colors duration-300 hover:text-white">
                ⭐ {ex.points} Points
              </span>
              <span className="text-sm text-gray-300 transition-colors duration-300 hover:text-white">
                Character Limit: {ex.characterLimit}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in-up animation-delay-400">
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/20">
              <h2 className="mb-4 text-xl font-semibold text-white">
                Exercise
              </h2>
              <p className="text-sm text-gray-300 mb-4">{ex.statement}</p>
              <div className="text-sm text-gray-300">
                <div className="font-semibold mb-2">Your function should:</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="transition-colors duration-300 hover:text-white">
                    Accept an array of integers as input
                  </li>
                  <li className="transition-colors duration-300 hover:text-white">
                    Return the sum of all elements
                  </li>
                  <li className="transition-colors duration-300 hover:text-white">
                    Return 0 for empty arrays
                  </li>
                  <li className="transition-colors duration-300 hover:text-white">
                    Handle negative numbers correctly
                  </li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-gray-300">
                <div className="font-semibold mb-2">Time Complexity:</div>
                <p className="transition-colors duration-300 hover:text-white">
                  The time complexity should be O(n) where n is the length of
                  the array.
                </p>
              </div>

              {/* Example Code */}
              <div className="mt-6">
                <div className="text-sm text-gray-400 mb-2">JavaScript</div>
                <div className="rounded-lg bg-gray-900 p-4 text-sm transition-all duration-300 hover:bg-gray-800">
                  <pre className="text-gray-300">
                    {`function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-3 animate-fade-in-up animation-delay-600">
                <label className="text-sm text-gray-300">Language</label>
                <select
                  className="rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-white transition-all duration-300 hover:border-gray-500 focus:border-emerald-500 focus:outline-none"
                  value={lang}
                  onChange={(e) => setLang(e.target.value as MonacoLang)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={handleRun}
                    disabled={running || !ex.id}
                    className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    {running ? "Running..." : "Run"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!lastRun}
                    className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="mb-3 flex items-center gap-2 animate-fade-in-up animation-delay-800">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step, index) => (
                  <div
                    key={step}
                    className={`px-3 py-1 text-sm rounded transition-all duration-300 transform hover:scale-105 ${
                      step === 1
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    Step {step}
                  </div>
                ))}
              </div>

              <div className="animate-fade-in-up animation-delay-1000">
                <CodeEditor
                  exerciseId={ex.id}
                  language={lang}
                  onChange={setCode}
                  height={460}
                />
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-1200">
              <RunPanel data={lastRun} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
