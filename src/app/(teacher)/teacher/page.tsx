"use client";

import RoleGuard from "@/components/layout/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function TeacherPage() {
  return (
    <RoleGuard allow={[ROLES.TEACHER, ROLES.ADMIN]}>
      <div>Teacher</div>
    </RoleGuard>
  );
}
