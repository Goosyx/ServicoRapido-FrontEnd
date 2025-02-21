import z from "zod";

export const addressSchema = z
  .object({
    street: z.string({
      required_error: "O logradouro é obrigatório"
    }),
    number: z.string({
      required_error: "O número é obrigatório",
    }),
    complement: z.string({
      required_error: "O complemento é obrigatório"
    }),
    city: z.string({
      required_error: "A cidade é obrigatória"
    }),
    state: z.string({
      required_error: "O estado é obrigatório"
    }),
    zipCode: z.string({
      required_error: "O CEP é obrigatório"
    })
  });
