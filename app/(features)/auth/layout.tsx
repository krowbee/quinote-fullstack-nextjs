/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/app/_store/useAuthStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function NonAuthLayout({ children }: { children: ReactNode }) {
  const isLoading = useAuthStore((state) => state.isLoading);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const isAuth = useAuthStore((state) => state.isAuth);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      if (pathname.includes("logout")) {
        return setIsLoading(false);
      }
      router.replace("/notes");
    }
    return setIsLoading(false);
  }, [isAuth]);

  return !isLoading ? children : null;
}
