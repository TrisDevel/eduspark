import { http, HttpResponse } from "msw";
import { mockCourses } from "../fixtures/courses";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export const courseHandlers = [
  http.get(`${API}/courses`, () => HttpResponse.json(mockCourses)),
];
