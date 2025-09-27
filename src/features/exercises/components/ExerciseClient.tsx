"use client";
import { useState, useEffect } from "react";
import ExerciseHeader from "./ExerciseHeader";
import CodeEditor from "@/features/exercises/components/codeEditor";
import RunPanel from "./RunPanel";
import { useExercise } from "@/features/exercises/hooks/useExercises";
import { useRunCode } from "@/features/exercises/hooks/useRunCode";
import type { MonacoLang } from "@/lib/monaco";
import { toast } from "sonner";

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
          Có thể backend trả về HTML (redirect / 404 / 500). Kiểm tra:
          1. Đúng URL API?
          2. Không bị redirect sang trang đăng nhập?
          3. Content-Type có phải application/json?
        </pre>
      </main>
    );
  }
  if (!ex) {
    return (
      <main className="p-6 space-y-3">
        <div>Không tìm thấy bài tập (ex null).</div>
        <pre className="text-xs bg-yellow-50 p-2 rounded">
          Gợi ý kiểm tra:
          - Endpoint có trả JSON? (Network - Response - nhìn xem có &lt;!doctype)
          - Slug: {slug}
          - Kiểm tra hook useExercise: đã kiểm tra res.ok và Content-Type chưa?
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
    <main className="space-y-6 p-6">
      <ExerciseHeader
        title={ex.title}
        path={ex.categoryPath}
        difficulty={ex.difficulty}
        points={ex.points}
        charLimit={ex.characterLimit}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-2 text-lg font-semibold">Exercise</h2>
          <p className="text-sm text-gray-700">{ex.statement}</p>
          <div className="mt-4 text-sm text-gray-600">
            <div className="font-semibold">Your function should:</div>
            <ul className="list-disc pl-5">
              <li>Accept an array of integers as input</li>
              <li>Return the sum of all elements</li>
              <li>Return 0 for empty arrays</li>
              <li>Handle negative numbers correctly</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <label className="text-sm text-gray-600">Language</label>
            <select
              className="rounded-md border px-2 py-1 text-sm"
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
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {running ? "Running..." : "Run"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!lastRun}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                Submit
              </button>
            </div>
          </div>

          <CodeEditor
            exerciseId={ex.id}
            language={lang}
            onChange={setCode}
            height={460}
          />
        </div>
      </div>

      <RunPanel data={lastRun} />
    </main>
  );
}
