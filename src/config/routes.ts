// src/config/routes.ts
export const ROUTES = {
  home: "/",
  marketing: "/",
  auth: {
    login: "login",
    register: "/register",
  },
  dashboard: {
    index: "/dashboard",
    courses: "/dashboard/courses",
    submissions: "/dashboard/submissions",
  },
  play: {
    courseDetail: (slug: string) => `/play/courses/${slug}`,
    exercises: `/exercises`,
    exerciseDetail: (slug: string) => `/exercises/${slug}`,
  },
  admin: {
    index: "/admin",
    problems: "/admin/problems",
    testcases: "/admin/testcases",
  },
  courses:{
    all :"/courses"
  },
  profile: {

    index: "/profile",
  },
  errors: {
    notFound: "/not-found",
    error: "/error",
  },
} as const;

export type RouteKeys = typeof ROUTES;