import { authHandlers } from "./auth";
import { courseHandlers } from "./courses";
import { exercisesHandlers } from "./exercises";
import { profileHandlers } from "./profile";
export const handlers = [...authHandlers, ...courseHandlers, ...exercisesHandlers, ...profileHandlers];
