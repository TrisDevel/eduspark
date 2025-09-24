import { ROLES, type Role } from "@/constants/roles";

export const HOME_BY_ROLE: Record<Role, string> = {
  [ROLES.ADMIN]: "/admin",
  [ROLES.TEACHER]: "/teacher",
  [ROLES.USER]: "/home",
};

export const DEFAULT_HOME = "/home";
