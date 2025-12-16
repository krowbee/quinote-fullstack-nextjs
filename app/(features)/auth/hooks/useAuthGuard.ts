"use client";

import { useAuthStore } from "@/app/_store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/", "/auth/register", "/auth/login"];
const authRoutes = ["/auth/login", "/auth/register"];

export function useAuthGuard() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth && !publicRoutes.includes(pathname)) {
      router.replace("/auth/login");
      return;
    }

    if (isAuth && authRoutes.includes(pathname)) {
      router.replace("/notes");
      return;
    }
  }, [isAuth, isLoading, pathname, router]);
}
