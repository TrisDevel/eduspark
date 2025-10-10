"use client";
import type { RunResponse, ExecutionResponse } from "@/features/exercises/type";

interface RunPanelProps {
  data: ExecutionResponse | RunResponse | null;
}

// Type guard to check if data is ExecutionResponse
function isExecutionResponse(data: any): data is ExecutionResponse {
  return data && 'testCasesResults' in data && 'compileTimeMillis' in data;
}

export default function RunPanel({ data }: RunPanelProps) {
  if (!data) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-sm text-gray-400">
        Chưa có kết quả. Nhấn <b>Chạy</b> để chạy code.
      </div>
    );
  }

  // Handle ExecutionResponse (new backend format)
  if (isExecutionResponse(data)) {
    const { testCasesResults, passed, total, compileTimeMillis, runTimeMillis, errorMessage, score } = data;

    // Show compilation error if any
    if (errorMessage) {
      return (
        <div className="rounded-xl border border-red-600 bg-red-900/20">
          <div className="border-b border-red-600 px-4 py-3">
            <span className="font-semibold text-red-400">Lỗi biên dịch</span>
          </div>
          <div className="px-4 py-3">
            <pre className="text-sm text-red-300 whitespace-pre-wrap">{errorMessage}</pre>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
          <div className="text-sm">
            <span className="font-semibold text-white">Kết quả test</span>
            <span className="ml-2 text-emerald-400">
              ✓ {passed}/{total} Passed
            </span>
            {score > 0 && (
              <span className="ml-2 text-blue-400">
                Điểm: {score}%
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            <span className="mr-3">Compile: {compileTimeMillis}ms</span>
            <span>Runtime: {runTimeMillis}ms</span>
          </div>
        </div>

        <div className="px-4 py-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="py-2">Test Case</th>
                <th>Input</th>
                <th>Your Output</th>
                <th>Expected Output</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {testCasesResults.map((result, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-2 text-white">#{index + 1}</td>
                  <td className="font-mono text-gray-300 max-w-xs truncate">
                    {result.testCase.input}
                  </td>
                  <td className="font-mono text-gray-300 max-w-xs truncate">
                    {result.userOutput}
                  </td>
                  <td className="font-mono text-gray-300 max-w-xs truncate">
                    {result.testCase.expectedOutput}
                  </td>
                  <td
                    className={
                      result.correct ? "text-emerald-400" : "text-red-400"
                    }
                  >
                    {result.correct ? "✓ Đúng" : "✗ Sai"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Handle legacy RunResponse format
  const { summary, results } = data as RunResponse;

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
