import { http, HttpResponse } from "msw";
import { mockClasses } from "../fixtures/classes";

export const classHandlers = [
  http.get(`*/api/classes`, () => {
    console.log("📡 Intercepted /classes request");
    return HttpResponse.json(mockClasses);
  }),
  http.get(`*/api/classes/:id`, ({ params }) => {
    const id = Number(params.id);
    const classItem = mockClasses.find((c) => c.id === id);
    if (!classItem) {
      return HttpResponse.json({ message: "Class not found" }, { status: 404 });
    }
    return HttpResponse.json(classItem);
  }),
  http.post(`*/api/classes/:id/enroll`, ({ params }) => {
    const id = Number(params.id);
    const classItem = mockClasses.find((c) => c.id === id);
    if (!classItem) {
      return HttpResponse.json({ message: "Class not found" }, { status: 404 });
    }
    
    if (classItem.students >= classItem.maxStudents) {
      return HttpResponse.json({ message: "Class is full" }, { status: 400 });
    }
    
    // Simulate enrollment
    classItem.students += 1;
    return HttpResponse.json({ 
      message: "Enrolled successfully", 
      class: classItem 
    });
  }),
  http.get(`*/api/classes/category/:category`, ({ params }) => {
    const category = params.category as string;
    const filteredClasses = mockClasses.filter((c) => 
      c.category.toLowerCase() === category.toLowerCase()
    );
    return HttpResponse.json(filteredClasses);
  }),
];

