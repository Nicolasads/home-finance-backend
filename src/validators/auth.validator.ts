import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Informe seu nome"),
    email: z.string().trim().toLowerCase().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "Inclua uma letra maiúscula")
      .regex(/[0-9]/, "Inclua um número")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Inclua um símbolo especial"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email("E-mail inválido"),
    password: z.string().trim().min(1, "A senha é obrigatória"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
