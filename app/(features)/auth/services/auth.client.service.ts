import { UserType } from "@/domains/auth/types/user.type";
import { fetchToApi, fetchWithoutRefresh } from "@/lib/api/http-client";
import { LoginFormInputs } from "@/shared/schemas/LoginSchema";
import { RegisterFormInputs } from "@/shared/schemas/RegisterSchema";
import { AuthActionResult, LogoutResult } from "../types/auth.types";

export async function getMe(): Promise<UserType | null> {
  const res = await fetchToApi("/api/auth/me", { method: "GET" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.user;
}

export async function loginUser(
  formData: LoginFormInputs
): Promise<AuthActionResult> {
  const res = await fetchWithoutRefresh("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  const json = await res.json();
  if (!res.ok) return { message: json.message, success: false };
  return { success: true, user: json.user };
}

export async function registerUser(
  formData: RegisterFormInputs
): Promise<AuthActionResult> {
  const res = await fetchWithoutRefresh("/api/auth/register", {
    body: JSON.stringify(formData),
    method: "POST",
  });
  const json = await res.json();
  if (!res.ok) return { message: json.message, success: false };
  return { success: true, user: json.user };
}

export async function logoutUser(): Promise<LogoutResult> {
  const res = await fetchToApi("/api/auth/logout", { method: "POST" });
  const json = await res.json();
  if (!res.ok) return { message: json.message, success: false };
  return { success: true };
}
