// import { http, HttpResponse } from "msw";
// import { exercisesFixture } from "../fixtures/exercises";

// const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

// function findBySlug(slug: string) {
//   return exercisesFixture.find((e) => e.slug === slug);
// }

// export const exercisesHandlers = [
//   // GET /exercises/:slug -> trả đề + test cases
//   http.get(`*/exercises/:slug`, ({ params }) => {
//     const slug = String(params.slug);
//     const ex = findBySlug(slug);
//     if (!ex) return HttpResponse.json({ message: "Not found" }, { status: 404 });
//     return HttpResponse.json(ex, { status: 200 });
//   }),

//   // POST /run -> nhận { exerciseId, language, code } -> trả kết quả test
//   http.post("*/run", async ({ request }) => {
//     const body = (await request.json()) as {
//       exerciseId: string;
//       language: string;
//       code: string;
//     };
//     const ex = exercisesFixture.find((e) => e.id === body.exerciseId);
//     if (!ex) return HttpResponse.json({ message: "Not found" }, { status: 404 });

//     // Demo: giả lập "đã pass" nếu code có chữ 'return' hoặc 'sum'
//     const allPassHeuristic = /return|sum/i.test(body.code);

//     const results = ex.testCases.map((tc) => {
//       const expected = tc.expectedOutput;
//       const actual = allPassHeuristic ? expected : expected + 1; // cố ý sai khi chưa viết gì
//       const passed = actual === expected;
//       return {
//         id: tc.id,
//         input: tc.input,
//         expectedOutput: expected,
//         actualOutput: actual,
//         timeMs: Math.floor(5 + Math.random() * 12),
//         status: passed ? "Passed" : "Failed",
//       };
//     });

//     const passedCount = results.filter((r) => r.status === "Passed").length;

//     return HttpResponse.json(
//       {
//         exerciseId: ex.id,
//         language: body.language,
//         results,
//         summary: { passed: passedCount, total: results.length },
//       },
//       { status: 200 }
//     );
//   }),

//   // POST /submit -> demo: pass nếu tất cả test Passed
//   http.post("*/submit", async ({ request }) => {
//     const body = (await request.json()) as {
//       exerciseId: string;
//       language: string;
//       code: string;
//     };
//     // đơn giản chạy lại /run logic
//     const fakeRun = await (
//       await fetch("/run", {
//         method: "POST",
//         body: JSON.stringify(body),
//       })
//     ).json();

//     const accepted = fakeRun.summary?.passed === fakeRun.summary?.total;
//     return HttpResponse.json(
//       {
//         verdict: accepted ? "ACCEPTED" : "REJECTED",
//         summary: fakeRun.summary,
//       },
//       { status: 200 }
//     );
//   }),
// ];


import { http, HttpResponse } from "msw";
import { exercisesFixture, topicsFixture, additionalTopicsFixture } from "../fixtures/exercises";

export const exercisesHandlers = [
  // List
  http.get("*/api/exercises", () => {
    const list = exercisesFixture.map(e => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      difficulty: e.difficulty,
      acceptance: e.acceptance ?? Math.round(30 + Math.random() * 40 * 10) / 10,
      tags: e.tags ?? [],
      status: e.status ?? "Unseen",
    }));
    return HttpResponse.json(list);
  }),

  // Topics
  http.get("*/api/topics", () => {
    return HttpResponse.json(topicsFixture);
  }),

  // Additional Topics
  http.get("*/api/topics/additional", () => {
    return HttpResponse.json(additionalTopicsFixture);
  }),
  http.get("*/api/exercises/:slug", ({ params }) => {
    const ex = exercisesFixture.find(e => e.slug === String(params.slug));
    return ex
      ? HttpResponse.json(ex)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),

  http.post("*/api/run", async ({ request }) => {
    const { exerciseId, language, code } = (await request.json()) as any;
    const ex = exercisesFixture.find(e => e.id === exerciseId);
    if (!ex) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    const allPass = /return|sum/i.test(code);
    const results = ex.testCases.map(tc => {
      const expected = tc.expectedOutput;
      const actual = allPass ? expected : expected + 1; // cố tình sai nếu chưa viết code
      return {
        id: tc.id, input: tc.input, expectedOutput: expected,
        actualOutput: actual, timeMs: Math.floor(5 + Math.random() * 12),
        status: actual === expected ? "Passed" : "Failed",
      };
    });
    const passed = results.filter(r => r.status === "Passed").length;
    return HttpResponse.json({ exerciseId, language, results, summary: { passed, total: results.length } });
  }),

  http.post("*/api/submit", async ({ request }) => {
    const body = await request.json() as any;
    // demo: reuse logic của /run
    const run = await (await fetch("/api/run", { method: "POST", body: JSON.stringify(body) })).json();
    const accepted = run.summary?.passed === run.summary?.total;
    return HttpResponse.json({ verdict: accepted ? "ACCEPTED" : "REJECTED", summary: run.summary });
  }),
];