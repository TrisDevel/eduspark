import { authHandlers } from "./auth";
import { classHandlers } from "./classes";
import { courseHandlers } from "./courses";
import { exercisesHandlers } from "./exercises";
import { profileHandlers } from "./profile";
export const handlers = [...authHandlers, ...classHandlers, ...courseHandlers, ...exercisesHandlers, ...profileHandlers];
