export type Difficulty = "Easy" | "Medium" | "Hard";

export type TestCase = {
  id: string;
  input: number[];          // demo: mảng số
  expectedOutput: number;   // demo: tổng
};

export type Exercise = {
  id: string;
  slug: string;
  title: string;
  categoryPath: string[];   // breadcrumb
  difficulty: Difficulty;
  points: number;
  characterLimit: number;
  statement: string;        // mô tả đề
  testCases: TestCase[];    // test public (demo)
};

export const exercisesFixture: Exercise[] = [
  {
    id: "ex1",
    slug: "sum-of-array-elements",
    title: "Sum of Array Elements",
    categoryPath: ["Practice", "Arrays"],
    difficulty: "Easy",
    points: 50,
    characterLimit: 500,
    statement:
      "Write a function that calculates the sum of all elements in an array of integers. Return 0 for empty arrays.",
    testCases: [
      { id: "t1", input: [1, 2, 3, 4, 5], expectedOutput: 15 },
      { id: "t2", input: [10, -5, 3], expectedOutput: 8 },
      { id: "t3", input: [], expectedOutput: 0 },
    ],
  },
];