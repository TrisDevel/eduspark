import { Role } from "@/constants/role";

    export interface User {
    id: string;
    username: string;
    role?: Role;
    fullName?: string;
    email?: string;
  }