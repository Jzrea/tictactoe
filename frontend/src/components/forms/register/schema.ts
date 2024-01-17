import { z } from "zod";

export const UserResigterSchema = z
  .object({
    username: z.string().min(5).max(224),
    password: z
      .string()
      .min(8, {
        message: "password must contain atleast 8 characters",
      })
      .max(224),
    confirmPassword: z.string(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Password doesn't match.",
    path: ["confirmPassword"],
  });

export type UserRegister = z.infer<typeof UserResigterSchema>;
