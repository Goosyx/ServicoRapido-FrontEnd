import z from "zod";
import { cnpj, cpf } from "cpf-cnpj-validator";

export const registerClientSchema = z
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
    password: z
      .string({
        required_error: "Senha é obrigatória",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).{6,}$/,
        "Senha deve ter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial"
      ),
    confirmEmail: z
      .string({
        required_error: "Confirmação de email é obrigatória",
      })
      .email({ message: "Email inválido" }),
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória",
      })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  })
  .refine(
    (data) => {
      return data.email === data.confirmEmail;
    },
    {
      message: "Emails não são iguais",
      path: ["confirmEmail"],
    }
  )
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Senhas não são iguais",
      path: ["confirmPassword"],
    }
  );
