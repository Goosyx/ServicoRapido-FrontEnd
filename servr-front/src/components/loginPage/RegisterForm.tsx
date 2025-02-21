"use client";

import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/user";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { UserReq } from "../../types/userType";
import { authUser, verifyComplete } from "../../api/auth";
import { setCookies } from "../../utils/cookies";

const RegisterForm = () => {
  const router = useRouter();
  const [isCnpj, setIsCnpj] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      cpf: undefined,
      cnpj: undefined,
      confirmEmail: "",
      confirmPassword: "",
      companyName: undefined,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (v: UserReq) => {
      setIsLoading(true);
      return createUser(v);
    },
    onSuccess: async () => {
      setIsLoading(false);
      toast({
        title: "Usuário criado com sucesso",
      });

      const res = await authUser({
        email: form.getValues("email"),
        password: form.getValues("password"),
      });

      const oneDay = 24 * 60 * 60 * 1000;

      setCookies("@servrpd:token", res.token, {
        secure: true,
        expires: new Date(Date.now() + oneDay),
      });

      localStorage.setItem("@servrpd:user", JSON.stringify(res.user));

      if (res.address) {
        localStorage.setItem("@servrpd:address", JSON.stringify(res.address));
      }

      router.push("continue");
    },
    onError: (e) => {
      setIsLoading(false);
      toast({
        title: "Erro ao criar usuário, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    const newValues = { ...values, userType: isCnpj ? "PJ" : "PF" };

    mutate(newValues);
  }

  useEffect(() => {
    router.push(verifyComplete("/register", true));
  }, [router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-96"
      >
        <h1 className="text-2xl font-semibold">Seja um vendedor Serviço Rápido</h1>
        <Select
          value={isCnpj ? "ok" : "no"}
          onValueChange={(v) => {
            if (v === "ok") {
              setIsCnpj(true);
            } else {
              setIsCnpj(false);
            }
          }}
        >
          <SelectTrigger className="w-full mt-8">
            <SelectValue defaultValue="no" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">Vendedor particular</SelectItem>
            <SelectItem value="ok">Vendedor profissional</SelectItem>
          </SelectContent>
        </Select>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar email</FormLabel>
              <FormControl>
                <Input placeholder="Confirme seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-8 w-full">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className={isCnpj ? "hidden" : "w-full"}>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu CPF"
                    value={cpf.format(field.value as string)}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem className={isCnpj ? "w-full" : "hidden"}>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu CNPJ"
                    value={cnpj.format(field.value as string)}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isCnpj && (
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da loja </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome da loja a ser cadastrada"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirme sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
