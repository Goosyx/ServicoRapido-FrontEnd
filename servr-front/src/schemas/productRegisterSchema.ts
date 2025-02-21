import z from "zod";

export const productRegisterSchema = z.object({
  title: z
    .string({
      required_error: "O título é obrigatório",
    })
    .min(3, {
      message: "O título deve ter no mínimo 3 caracteres",
    }),
  description: z.string({
    required_error: "A descrição é obrigatória",
  }),
  price: z
    .number({
      required_error: "O preço é obrigatório",
    })
    .positive({
      message: "O preço deve ser maior que zero",
    }),
  quantity: z
    .number({
      required_error: "A quantidade é obrigatória",
    })
    .positive({
      message: "A quantidade deve ser maior que zero",
    }),
  color: z.array(z.string(), {
    required_error: "A cor é obrigatória",
  }),
  size: z.array(z.string(), {
    required_error: "O tamanho é obrigatório",
  }),
  materials: z.array(z.string(), {
    required_error: "Os materiais são obrigatórios",
  }),
  category: z.string({
    required_error: "A categoria é obrigatória",
  }),
  unit: z.string({
    required_error: "A unidade é obrigatória",
  }),
  weight: z
    .number()
    .nonnegative({
      message: "O peso deve ser maior ou igual a zero",
    })
    .optional(),
  media: z
    .array(z.object({ file: z.instanceof(File), url: z.string() }))
    .optional(),
});
