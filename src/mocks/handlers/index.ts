import { authHandlers } from "./auth";
import { courseHandlers } from "./courses";
export const handlers = [...authHandlers, ...courseHandlers];
