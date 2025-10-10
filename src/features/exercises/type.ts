export type TestCaseResult = {
  testCase: {
    id: string;
    input: string;
    expectedOutput: string;
  };
  userOutput: string;
  correct: boolean;
};

export type ExecutionResponse = {
  code: string;
  passed: number;
  total: number;
  score: number;
  testCasesResults: TestCaseResult[];
  errorMessage?: string;
  compileTimeMillis: number;
  runTimeMillis: number;
};

// Keep the old RunResponse for backward compatibility
export type RunResponse = {
  exerciseId: string;
  language: string;
  results: RunCaseResult[];
  summary: { passed: number; total: number };
};

export type RunCaseResult = {
  id: string;
  input: number[];
  expectedOutput: number;
  actualOutput: number;
  timeMs: number;
  status: "Passed" | "Failed";
};

export type ExerciseDTO = {
  id: string;
  slug: string;
  title: string;
  categoryPath: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  characterLimit: number;
  statement: string;
  testCases: { id: string; input: number[]; expectedOutput: number }[];
  language?: string; // Programming language from backend
  setup?: string;   // Setup code or instructions from backend
};

// Summary item for list page
export type ExerciseListItem = {
  id: string;
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points?: number;
  acceptance?: number; // 0..100
  tags?: string[];
  status?: "Solved" | "Attempted" | "Unseen";
  level?: "EASY" | "MEDIUM" | "HARD"; // Backend level format
  name?: string; // Backend name field
  description?: string;
  exerciseType?: "PUBLIC" | "COURSE" | "PROTECTED";
  isPublic?: boolean;
  language?: string; // Programming language
};