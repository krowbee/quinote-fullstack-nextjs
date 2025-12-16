import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, { error: "Password too short" }),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
