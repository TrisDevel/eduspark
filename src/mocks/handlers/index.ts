import { authHandlers } from "./auth";
import { classHandlers } from "./classes";
import { exercisesHandlers } from "./exercises";
import { profileHandlers } from "./profile";
export const handlers = [...authHandlers, ...classHandlers, ...exercisesHandlers, ...profileHandlers];
