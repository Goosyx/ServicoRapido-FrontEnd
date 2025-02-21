import z from "zod";

export const userSchema = z
  .object({
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email({ message: "Email inválido" }),
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
      cpf: z
      .string()
      .optional(),
    cnpj: z
      .string()
      .optional(),
  })
