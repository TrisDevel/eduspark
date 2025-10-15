// src/features/courses/api.ts
import { api } from "@/lib/fetcher";
import { Course } from "@/features/courses/type/Course";
import { PageResponse } from "@/features/courses/type/pagination";
import { CourseDetail, Section } from "@/features/courses/type/CourseDetail";

export async function getCourses(page: number = 0, size: number = 10) {
  const res = await api<PageResponse<Course>>(`/courses?page=${page}&size=${size}`, {
    method: "GET"
  });
  console.log(res.data);
  return res.data;
  // return mockCourses;
} 

export async function getCourseById(id: string | number) {
  const res = await api<CourseDetail>(`/courses/${id}`,{
    method: "GET"
  });
  console.log(res.data);
  return res.data;
}

export async function getSectionsByCourseId(courseId: string | number) {
  const res = await api<Section[]>(`/sections/course/${courseId}`, {
    method: "GET"
  });
  console.log(res.data);
  return res.data;
}