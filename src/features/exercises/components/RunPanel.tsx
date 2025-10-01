"use client";
import type { RunResponse } from "@/features/exercises/type";

export default function RunPanel({ data }: { data: RunResponse | null }) {
  if (!data) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-sm text-gray-400">
        Chưa có kết quả. Nhấn <b>Run</b> để chạy code.
      </div>
    );
  }

  const { summary, results } = data;

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <div className="text-sm">
          <span className="font-semibold text-white">Test Results</span>
          <span className="ml-2 text-emerald-400">
            ✓ {summary.passed}/{summary.total} Passed
          </span>
        </div>
      </div>

      <div className="px-4 py-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="py-2">Test Case</th>
              <th>Input</th>
              <th>Actual Output</th>
              <th>Expected Output</th>
              <th>Time Limit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t border-gray-700">
                <td className="py-2 text-white">{r.id}</td>
                <td className="font-mono text-gray-300">
                  {JSON.stringify(r.input)}
                </td>
                <td className="font-mono text-gray-300">{r.actualOutput}</td>
                <td className="font-mono text-gray-300">{r.expectedOutput}</td>
                <td className="text-gray-300">1000ms</td>
                <td
                  className={
                    r.status === "Passed" ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {r.status === "Passed" ? "✓ Passed" : r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
