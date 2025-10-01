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
  // fields for list
  acceptance?: number;      // 0..100
  tags?: string[];
  status?: "Solved" | "Attempted" | "Unseen";
};

export type Topic = {
  id:string;
  name: string;
  count: number;
};

export const topicsFixture: Topic[] = [
  { id: "t1", name: "Array", count: 156 },
  { id: "t2", name: "String", count: 134 },
  { id: "t3", name: "Hash Table", count: 89 },
  { id: "t4", name: "Dynamic Programming", count: 78 },
  { id: "t5", name: "Math", count: 67 },
  { id: "t6", name: "Two Pointers", count: 45 },
  { id: "t7", name: "Binary Search", count: 43 },
  { id: "t8", name: "Greedy", count: 41 },
  { id: "t9", name: "Greedy", count: 41 },
];

export const additionalTopicsFixture: string[] = [
  "Thuật toán",
  "Database",
  "Shell",
  "Concurrency",
  "JavaScript",
];

export const exercisesFixture: Exercise[] = [
  {
    id: "ex1",
    slug: "two-sum",
    title: "Two Sum",
    categoryPath: ["Luyện tập", "Array"],
    difficulty: "Easy",
    points: 10,
    characterLimit: 800,
    statement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    testCases: [
      { id: "t1", input: [2, 7, 11, 15], expectedOutput: 9 },
      { id: "t2", input: [3, 2, 4], expectedOutput: 6 },
      { id: "t3", input: [3, 3], expectedOutput: 6 },
    ],
    acceptance: 55.8,
    tags: ["Array", "Hash Table"],
    status: "Solved",
  },
  {
    id: "ex2",
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    categoryPath: ["Luyện tập", "Linked List"],
    difficulty: "Medium",
    points: 20,
    characterLimit: 1200,
    statement: "You are given two non-empty linked lists representing two non-negative integers...",
    testCases: [
      { id: "t1", input: [2, 4, 3], expectedOutput: 342 },
      { id: "t2", input: [5, 6, 4], expectedOutput: 465 },
    ],
    acceptance: 38.2,
    tags: ["Linked List", "Math"],
    status: "Attempted",
  },
  {
    id: "ex3",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    categoryPath: ["Luyện tập", "String"],
    difficulty: "Medium",
    points: 25,
    characterLimit: 1400,
    statement: "Given a string s, find the length of the longest substring without repeating characters.",
    testCases: [
      { id: "t1", input: [], expectedOutput: 0 },
    ],
    acceptance: 33.8,
    tags: ["Hash Table", "String", "Sliding Window"],
    status: "Unseen",
  },
  {
    id: "ex4",
    slug: "sum-of-array-elements",
    title: "Sum of Array Elements",
    categoryPath: ["Luyện tập", "Arrays"],
    difficulty: "Easy",
    points: 15,
    characterLimit: 500,
    statement:
      "Write a function that calculates the sum of all elements in an array of integers. Return 0 for empty arrays.",
    testCases: [
      { id: "t1", input: [1, 2, 3, 4, 5], expectedOutput: 15 },
      { id: "t2", input: [10, -5, 3], expectedOutput: 8 },
      { id: "t3", input: [], expectedOutput: 0 },
    ],
    acceptance: 62.0,
    tags: ["Array", "Math"],
    status: "Unseen",
  },
  {
    id: "ex5",
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    categoryPath: ["Luyện tập", "String"],
    difficulty: "Medium",
    points: 30,
    characterLimit: 1000,
    statement: "Given a string s, return the longest palindromic substring in s.",
    testCases: [
      { id: "t1", input: [1, 2, 3], expectedOutput: 3 },
      { id: "t2", input: [2, 1, 4], expectedOutput: 4 },
    ],
    acceptance: 32.8,
    tags: ["String", "Dynamic Programming"],
    status: "Solved",
  },
  {
    id: "ex6",
    slug: "zigzag-conversion",
    title: "Zigzag Conversion",
    categoryPath: ["Luyện tập", "String"],
    difficulty: "Medium",
    points: 25,
    characterLimit: 1200,
    statement: "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows.",
    testCases: [
      { id: "t1", input: [1, 2, 3, 4], expectedOutput: 10 },
      { id: "t2", input: [5, 1, 2], expectedOutput: 8 },
    ],
    acceptance: 42.1,
    tags: ["String"],
    status: "Unseen",
  },
  {
    id: "ex7",
    slug: "reverse-integer",
    title: "Reverse Integer",
    categoryPath: ["Luyện tập", "Math"],
    difficulty: "Medium",
    points: 20,
    characterLimit: 600,
    statement: "Given a signed 32-bit integer x, return x with its digits reversed.",
    testCases: [
      { id: "t1", input: [123], expectedOutput: 321 },
      { id: "t2", input: [-123], expectedOutput: -321 },
    ],
    acceptance: 27.3,
    tags: ["Math"],
    status: "Unseen",
  },
  {
    id: "ex8",
    slug: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    categoryPath: ["Luyện tập", "String"],
    difficulty: "Medium",
    points: 35,
    characterLimit: 1500,
    statement: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    testCases: [
      { id: "t1", input: [42], expectedOutput: 42 },
      { id: "t2", input: [-42], expectedOutput: -42 },
    ],
    acceptance: 16.4,
    tags: ["String"],
    status: "Unseen",
  },
  {
    id: "ex9",
    slug: "palindrome-number",
    title: "Palindrome Number",
    categoryPath: ["Luyện tập", "Math"],
    difficulty: "Easy",
    points: 15,
    characterLimit: 500,
    statement: "Given an integer x, return true if x is a palindrome integer.",
    testCases: [
      { id: "t1", input: [121], expectedOutput: 121 },
      { id: "t2", input: [-121], expectedOutput: -121 },
    ],
    acceptance: 52.7,
    tags: ["Math"],
    status: "Solved",
  },
  {
    id: "ex10",
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    categoryPath: ["Luyện tập", "String"],
    difficulty: "Hard",
    points: 50,
    characterLimit: 2000,
    statement: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    testCases: [
      { id: "t1", input: [1, 2, 3, 4, 5], expectedOutput: 15 },
      { id: "t2", input: [2, 1, 3], expectedOutput: 6 },
    ],
    acceptance: 27.9,
    tags: ["String", "Dynamic Programming", "Recursion"],
    status: "Unseen",
  },
];