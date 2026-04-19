"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!loading && !token && !isPublicRoute) {
      router.replace("/login");
    }
  }, [loading, token, pathname, router, isPublicRoute]);

  if (loading) {
    return <div className="centered">Loading...</div>;
  }

  if (!token && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
