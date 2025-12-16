import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, { error: "Password too short" }),
});

export type RegisterFormInputs = z.infer<typeof RegisterSchema>;
