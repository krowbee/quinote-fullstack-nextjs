"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: { id: number; email: string } | null;

  isLoading: boolean;
  isAuth: boolean;
  setIsLoading: (isLoading: boolean) => void;
  login: (user: { id: number; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoading: true,
      isAuth: false,
      user: null,

      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      login: (user: { id: number; email: string }) =>
        set({ isAuth: true, user }),
      logout: () => set({ isAuth: false }),
    }),
    { name: "auth-token" }
  )
);
