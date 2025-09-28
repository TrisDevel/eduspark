import { authHandlers } from "./auth";
import { courseHandlers } from "./courses";
import { exercisesHandlers } from "./exercises";
export const handlers = [...authHandlers, ...courseHandlers, ...exercisesHandlers];
