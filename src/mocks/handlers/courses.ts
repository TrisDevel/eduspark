import { http, HttpResponse } from "msw";
import { mockCourses } from "../fixtures/courses";
import { mockCourseContent } from "../fixtures/courseContent";


export const courseHandlers = [
  http.get(`*/api/courses`, () => {
    console.log("📡 Intercepted /courses request");
    return HttpResponse.json(mockCourses);
  }),
  http.get(`*/api/courses/:id`, ({ params }) => {
    const id = Number(params.id);
    const item = mockCourses.find((c) => c.id === id);
    if (!item) {
      return HttpResponse.json({ message: "Course not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
  http.get(`*/api/courses/:id/content`, ({ params }) => {
    // For demo, same content for all courses
    return HttpResponse.json(mockCourseContent);
  }),
];