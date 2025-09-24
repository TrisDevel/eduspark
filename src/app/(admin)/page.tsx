"use client";

import RoleGuard from "@/components/layout/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function AdminPage() {
  return (
    // <RoleGuard allow={[ROLES.ADMIN]}>
      <div>Admin</div>
    // {/* </RoleGuard> */}
  );
}
