import { authHandlers } from "./auth";
import { classHandlers } from "./classes";
import { exercisesHandlers } from "./exercises";
export const handlers = [...authHandlers, ...classHandlers, ...exercisesHandlers];
