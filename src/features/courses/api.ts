// src/features/courses/api.ts
import { api } from "@/lib/fetcher";
import { Course } from "@/features/home/types/Course";
import { mockCourses } from "@/mocks/fixtures/courses";


export async function getCourses() {
    console.log(api)
  const data = await api<Course[]>(`/courses`);
  console.log(data);
  return data;
// return mockCourses;
} 
