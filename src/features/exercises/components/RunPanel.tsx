"use client";
import type { RunResponse } from "@/features/exercises/type";

export default function RunPanel({ data }: { data: RunResponse | null }) {
  if (!data) {
    return (
      <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
        Chưa có kết quả. Nhấn <b>Run</b> để chạy code.
      </div>
    );
  }

  const { summary, results } = data;

  return (
    <div className="rounded-xl border bg-white">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="text-sm">
          <span className="font-semibold">{summary.passed}/{summary.total} Passed</span>
        </div>
      </div>

      <div className="px-4 py-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-2">Test Case</th>
              <th>Input</th>
              <th>Actual</th>
              <th>Expected</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.id}</td>
                <td className="font-mono">{JSON.stringify(r.input)}</td>
                <td className="font-mono">{r.actualOutput}</td>
                <td className="font-mono">{r.expectedOutput}</td>
                <td>{r.timeMs}ms</td>
                <td className={r.status === "Passed" ? "text-emerald-600" : "text-red-600"}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}