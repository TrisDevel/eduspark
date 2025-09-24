# Quản lý Courses trong dự án

## 1. Định nghĩa API cho Courses  
📄 `src/features/courses/api.ts`

```ts
import { api } from "@/lib/fetcher";
import { Course } from "@/types/course";

// GET /courses → danh sách courses
export async function getCoursesApi() {
  return api<Course[]>("/courses");
}

// GET /courses/:id → chi tiết 1 course
export async function getCourseDetailApi(id: string) {
  return api<Course>(`/courses/${id}`);
}
``` 

## 2. Tạo hook để dùng trong UI

📄 src/features/courses/hooks/useCourses.ts
```ts
"use client";
import { useEffect, useState } from "react";
import { getCoursesApi } from "../api";
import { Course } from "@/types/course";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCoursesApi()
      .then(setCourses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { courses, loading, error };
}
```

## 3. Dùng trong trang Dashboard/Courses

📄 src/app/(dashboard)/courses/page.tsx

```ts
"use client";
import { useCourses } from "@/features/courses/hooks/useCourses";

export default function CoursesPage() {
  const { courses, loading, error } = useCourses();

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-600">Lỗi: {error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Khoá học của bạn</h1>
      <ul className="space-y-3">
        {courses.map((c) => (
          <li
            key={c.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{c.title}</h2>
            <p>Tiến độ: {c.progress}%</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

## 4. Luồng hoạt động
1.	FE (CoursesPage) gọi useCourses().
2.	Hook gọi getCoursesApi() trong features/courses/api.ts.
3.	getCoursesApi() dùng fetcher.ts để gọi API thật hoặc mock (MSW).
4.	MSW (nếu bật) intercept /courses và trả về mockCourses.
5.	Data được render ra UI.
