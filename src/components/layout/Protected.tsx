"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/authProvider";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const from = pathname + (params.toString() ? `?${params.toString()}` : "");
      router.replace(`/login?from=${encodeURIComponent(from)}`);
    }
  }, [user, loading, pathname, params, router]);

  if (loading) return null;
  if (!user) return null;
  return <>{children}</>;
}
