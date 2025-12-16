"use client";

import { useAuthStore } from "@/app/_store/useAuthStore";
import { useEffect } from "react";
import { getMe } from "../services/auth.client.service";

export function useAuthInit() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    const init = async () => {
      const user = await getMe();
      if (user) login(user);
      else logout();
      setIsLoading(false);
    };
    init();
  }, [login, logout, setIsLoading]);
}
