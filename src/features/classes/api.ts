import { api } from "@/lib/fetcher";
import { Class } from "@/mocks/fixtures/classes";

export const classesApi = {
  getAllClasses: async (): Promise<Class[]> => {
    const res = await api<Class[]>("/api/classes");
    return res.data;
  },

  getClassById: async (id: number): Promise<Class> => {
    const res = await api<Class>(`/api/classes/${id}`);
    return res.data;
  },

  getClassesByCategory: async (category: string): Promise<Class[]> => {
    const res = await api<Class[]>(`/api/classes/category/${category}`);
    return res.data;
  },

  enrollInClass: async (id: number): Promise<{ message: string; class: Class }> => {
    const res = await api<{ message: string; class: Class }>(`/api/classes/${id}/enroll`, {
      method: "POST",
    });
    return res.data;
  },
};
