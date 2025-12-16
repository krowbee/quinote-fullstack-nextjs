"use client";
import { ReactNode } from "react";
import { useAuthStore } from "../_store/useAuthStore";
import { useAuthInit } from "../(features)/auth/hooks/useAuthInit";
import { useAuthGuard } from "../(features)/auth/hooks/useAuthGuard";

export default function AuthClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isLoading = useAuthStore((state) => state.isLoading);

  useAuthInit();
  useAuthGuard();

  return !isLoading ? children : null;
}
