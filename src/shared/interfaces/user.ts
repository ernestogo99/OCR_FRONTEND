import { z } from "zod";

export interface Iuser {
  id: string;
  email: string;
  name?: string;
  password: string;
}

export interface IuserRequest {
  email: string;
  password: string;
}

export interface IcurrentUserResposne {
  userId: string;
  email: string;
}

export const LoginSchema = z.object({
  email: z.email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type loginData = z.infer<typeof LoginSchema>;
