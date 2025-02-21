import z from "zod";

export const storeSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  })
