"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authProvider";
import { type Role, ROLES } from "@/constants/roles";
import { DEFAULT_HOME, HOME_BY_ROLE } from "@/constants/roleHome";

export default function RoleGuard({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const role = user.role || ROLES.USER;
    if (!allow.includes(role)) {
      router.replace(HOME_BY_ROLE[role] || DEFAULT_HOME);
    }
  }, [user, loading, allow, router]);

  if (loading) return null;
  if (!user) return null;
  const role = user.role || ROLES.USER;
  if (!allow.includes(role)) return null;
  return <>{children}</>;
}
