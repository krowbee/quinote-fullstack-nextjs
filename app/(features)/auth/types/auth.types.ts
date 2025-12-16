import { UserType } from "@/domains/auth/types/user.type";

export type AuthActionResult =
  | { success: true; user: UserType }
  | { success: false; message: string };

export type LogoutResult =
  | { success: true }
  | { success: false; message: string };
