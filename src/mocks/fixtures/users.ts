export type Role = "ADMIN" | "TEACHER" | "USER";

export const mockUsers = [
  {
    id: "u1",
    email: "admin@example.com",
    password: "123456",
    role: "ADMIN",
    name: "Admin One",
  },
  {
    id: "u2",
    email: "teacher@example.com",
    password: "123456",
    role: "TEACHER",
    name: "Teacher Two",
  },
  {
    id: "u3",
    email: "user@example.com",
    password: "123456",
    role: "USER",
    name: "User Three",
  },
];
