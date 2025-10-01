import { api } from "@/lib/fetcher";
import type { ExerciseDTO, RunResponse, ExerciseListItem } from "@/features/exercises/type";
import type { Topic } from "@/mocks/fixtures/exercises";

// Helper: chuẩn hoá path để tránh // hoặc /api/api
function normalizeApiPath(p: string) {
  if (!p.startsWith("/")) p = "/" + p;
  // Không cho truyền sẵn /api nếu wrapper cũng tự thêm /api => ghi chú để dev nhận ra
  if (p.startsWith("/api/")) {
    console.warn("[api:getExercise] Path truyền vào đã có /api prefix:", p);
  }
  return p.replace(/\/{2,}/g, "/");
}

// Guard parse JSON (bắt lỗi HTML)
async function assertJson(res: Response, endpoint: string) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = (await res.text()).slice(0, 200).replace(/\s+/g, " ");
    throw new Error(`[API] Non-JSON from ${endpoint} status=${res.status} contentType=${ct} snippet="${text}"`);
  }
}

export async function getExercise(slug: string) {
  // Nếu NEXT_PUBLIC_API_URL đã kết thúc /api -> backend route thực tế có thể chỉ /exercises/:slug
  // fetcher đã có fallback bỏ /api nếu 404.
  return api<ExerciseDTO>(`/exercises/${slug}`);
}

export async function getExercisesList() {
  return api<ExerciseListItem[]>(`/exercises`);
}

export async function getTopics() {
  return api<Topic[]>(`/topics`);
}

export async function getAdditionalTopics() {
  return api<string[]>(`/topics/additional`);
}

export async function runCode(args: { exerciseId: string; language: string; code: string }) {
  return api<RunResponse>("/run", {
    method: "POST",
    body: JSON.stringify(args),
  } as any);
}

export async function submitCode(args: { exerciseId: string; language: string; code: string }) {
  return api<{ verdict: "ACCEPTED" | "REJECTED"; summary: { passed: number; total: number } }>(
    "/submit",
    { method: "POST", body: JSON.stringify(args) } as any
  );
}