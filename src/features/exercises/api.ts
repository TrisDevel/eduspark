import { api } from "@/lib/fetcher";
import type { ExerciseDTO, RunResponse, ExerciseListItem, ExecutionResponse } from "@/features/exercises/type";
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

// Helper function to map Backend Exercise to Frontend ExerciseListItem
function mapBackendExerciseToListItem(backendExercise: any): ExerciseListItem {
  const difficultyMap: Record<string, 'Easy' | 'Medium' | 'Hard'> = {
    'EASY': 'Easy',
    'MEDIUM': 'Medium', 
    'HARD': 'Hard'
  };

  // Extract tags from exerciseCategories
  let tags: string[] = [];
  if (backendExercise?.exerciseCategories && Array.isArray(backendExercise.exerciseCategories)) {
    tags = backendExercise.exerciseCategories.map((category: any) => {
      // ExerciseCategory might have different structures, try common field names
      return category?.name || category?.categoryName || category?.title || category?.category || String(category);
    }).filter(Boolean); // Remove null/undefined values
  }

  const mapped: ExerciseListItem = {
    id: String(backendExercise?.id || Math.random()),
    slug: backendExercise?.slung || backendExercise?.slug || `exercise-${backendExercise?.id || Math.random()}`,
    title: backendExercise?.name || backendExercise?.title || "Untitled Exercise",
    difficulty: difficultyMap[backendExercise?.level as string] || 'Easy',
    description: backendExercise?.description || '',
    exerciseType: backendExercise?.exerciseType,
    isPublic: backendExercise?.isPublic !== false, // default to true
    level: backendExercise?.level,
    name: backendExercise?.name,
    language: backendExercise?.language || 'Unknown', // Extract language directly
    // Default values for FE-specific fields
    points: 100,
    acceptance: Math.random() * 100,
    tags: tags, // Use extracted tags from exerciseCategories
    status: (backendExercise?.status === "COMPLETED" ? "Solved" : "Unseen") as "Solved" | "Attempted" | "Unseen"
  };
  return mapped;
}

export async function getExercise(slug: string) {
  console.log("[getExercise] Starting API call for slug:", slug);
  
  try {
    const response = await api<any>(`/exercises/${slug}`);
    console.log("[getExercise] API response received:", response);
    
    // Handle response structure - similar to getExercisesList
    let exerciseData = response.data || response;
    console.log("[getExercise] Exercise data:", exerciseData);
    
    if (!exerciseData) {
      throw new Error("No exercise data received");
    }

    // Map Backend Exercise to ExerciseDTO
    const difficultyMap: Record<string, 'Easy' | 'Medium' | 'Hard'> = {
      'EASY': 'Easy',
      'MEDIUM': 'Medium', 
      'HARD': 'Hard'
    };

    // Extract test cases
    let testCases: { id: string; input: number[]; expectedOutput: number }[] = [];
    if (exerciseData.testCasesRequest && Array.isArray(exerciseData.testCasesRequest)) {
      testCases = exerciseData.testCasesRequest.map((testCase: any, index: number) => ({
        id: String(testCase.id || index),
        input: testCase.input || [],
        expectedOutput: testCase.expectedOutput || 0
      }));
    }

    const mapped: ExerciseDTO = {
      id: String(exerciseData.id || ''),
      slug: exerciseData.slung || exerciseData.slug || slug,
      title: exerciseData.name || exerciseData.title || "Untitled Exercise",
      categoryPath: ["Luyện tập"], // Default breadcrumb
      difficulty: difficultyMap[exerciseData.level as string] || 'Easy',
      points: exerciseData.points || 100,
      characterLimit: exerciseData.characterLimit || 2000,
      statement: exerciseData.description || "No description available",
      testCases: testCases,
      language: exerciseData.language || 'Java',
      setup: exerciseData.setup || "No setup available"
    };
    
    console.log("[getExercise] Final mapped exercise:", mapped);
    return mapped;
  } catch (error) {
    console.error("[getExercise] API call failed:", error);
    throw error;
  }
}

export async function getExercisesList() {
  
  try {
    const response = await api<{
      content: any[];
      totalElements: number;
      totalPages: number;
      page: number;
      size: number;
    }>(`/exercises`);

    
    // Handle different response structures
    let exercises: any[] = [];
    
    // The fetcher returns the parsed JSON directly, not wrapped in .data
    // So response IS the actual data object
    const actualData = response;
    
  
    
    if (actualData) {
      // Case 1: actualData.content (paginated) - Most likely case
      if ((actualData as any).content && Array.isArray((actualData as any).content)) {
        exercises = (actualData as any).content;
      }
      // Case 2: actualData.data.content (nested)
      else if (actualData.data && (actualData.data as any).content && Array.isArray((actualData.data as any).content)) {
        exercises = (actualData.data as any).content;
      }
      // Case 3: actualData.data is directly an array
      else if (actualData.data && Array.isArray(actualData.data)) {
        exercises = actualData.data;
      }
      // Case 4: actualData is directly an array
      else if (Array.isArray(actualData)) {
        exercises = actualData;
      }
    }
    
    // Map backend exercises to frontend format
    const mappedExercises = exercises.map((exercise, index) => {
      return mapBackendExerciseToListItem(exercise);
    });
    
    
    return mappedExercises;
  } catch (error) {
    console.error("[getExercisesList] API call failed:", error);
    throw error;
  }
}

export async function getTopics() {
  return api<Topic[]>(`/topics`);
}

export async function getAdditionalTopics() {
  return api<string[]>(`/topics/additional`);
}

export async function runCodePrecheck(args: { exerciseId: string; code: string; customInput?: string }) {
  return api<ExecutionResponse>(`/judgement/precheck/${args.exerciseId}`, {
    method: "POST",
    body: JSON.stringify({
      code: args.code,
      customInput: args.customInput || "no custom input" // Backend requires non-blank customInput
    }),
  } as any);
}

export async function runCodePractice(args: { exerciseId: string; code: string; customInput?: string }) {
  return api<ExecutionResponse>(`/judgement/practice/${args.exerciseId}`, {
    method: "POST",
    body: JSON.stringify({
      code: args.code,
      customInput: args.customInput || "no custom input"
    }),
  } as any);
}

export async function runCustomCode(args: { exerciseId: string; code: string; customInput: string }) {
  return api<string>(`/judgement/${args.exerciseId}/run-custom-code`, {
    method: "POST",
    body: JSON.stringify({
      code: args.code,
      customInput: args.customInput
    }),
  } as any);
}

// Keep old functions for backward compatibility
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