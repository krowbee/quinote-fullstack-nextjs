"use client";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../_store/useAuthStore";
import { fetchToApi } from "@/lib/api/http-client";
import { usePathname, useRouter } from "next/navigation";

export default function AuthClientProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isAuth = useAuthStore((state) => state.isAuth);
  const router = useRouter();
  const isLoading = useAuthStore((state) => state.isLoading);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetchToApi("/api/auth/me", { method: "GET" });
      if (res.ok) {
        const json = await res.json();
        login(json.user);
        setIsLoading(false);
        return;
      }
      logout();
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/auth/register" ||
      pathname === "/auth/login"
    )
      return;
    if (!isAuth && !isLoading) {
      router.replace("/auth/login");
      return;
    }
  }, [isAuth, isLoading, pathname]);

  return !isLoading ? children : null;
}
