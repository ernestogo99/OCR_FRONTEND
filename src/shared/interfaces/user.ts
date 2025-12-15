import { z } from "zod";

export interface Iuser {
  email: string;
  password: string;
}

export const LoginSchema = z.object({
  email: z.email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type loginData = z.infer<typeof LoginSchema>;
