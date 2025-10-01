export type RunCaseResult = {
  id: string;
  input: number[];
  expectedOutput: number;
  actualOutput: number;
  timeMs: number;
  status: "Passed" | "Failed";
};

export type RunResponse = {
  exerciseId: string;
  language: string;
  results: RunCaseResult[];
  summary: { passed: number; total: number };
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
};

// Summary item for list page
export type ExerciseListItem = {
  id: string;
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  acceptance: number; // 0..100
  tags: string[];
  status: "Solved" | "Attempted" | "Unseen";
};