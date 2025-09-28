import type { Chapter } from "@/features/courses/types";

export const mockCourseContent: Chapter[] = [
  {
    id: "c1",
    title: "Chapter 1: Introduction to Web Development",
    lessons: [
      { id: "l1", title: "Getting Started with HTML", durationMinutes: 25 },
      { id: "l2", title: "Understanding CSS Basics", durationMinutes: 35 },
      { id: "l3", title: "Introduction to JavaScript", durationMinutes: 45 },
      {
        id: "l4",
        title: "Setting Up Your Development Environment",
        durationMinutes: 20,
      },
    ],
  },
  {
    id: "c2",
    title: "Chapter 2: Advanced HTML & CSS",
    lessons: [
      { id: "l5", title: "Flexbox Deep Dive", durationMinutes: 30 },
      { id: "l6", title: "CSS Grid Essentials", durationMinutes: 35 },
    ],
  },
  {
    id: "c3",
    title: "Chapter 3: JavaScript Fundamentals",
    lessons: [
      { id: "l7", title: "Variables & Types", durationMinutes: 25 },
      { id: "l8", title: "Functions & Scope", durationMinutes: 35 },
      { id: "l9", title: "DOM Basics", durationMinutes: 30 },
    ],
  },
  {
    id: "c4",
    title: "Chapter 4: Modern JavaScript",
    lessons: [
      { id: "l10", title: "ES6+ Features", durationMinutes: 40 },
      { id: "l11", title: "Async/Await", durationMinutes: 30 },
    ],
  },
  {
    id: "c5",
    title: "Chapter 5: Building Real Projects",
    lessons: [
      { id: "l12", title: "Project Setup", durationMinutes: 20 },
      { id: "l13", title: "Deploying Your App", durationMinutes: 25 },
    ],
  },
];


