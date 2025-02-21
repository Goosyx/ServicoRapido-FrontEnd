"use client";

import { registerClientSchema } from "@/schemas/registerClientSchema";
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
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { authClient } from "../../api/auth";
import { setCookies } from "../../utils/cookies";
import { createClient } from "@/api/client";

const RegisterClientForm = () => {
  const form = useForm<z.infer<typeof registerClientSchema>>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmEmail: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createClient,
    onSuccess: async () => {
      toast({
        title: "Cliente criado com sucesso",
      });

      const res = await authClient({
        email: form.getValues("email"),
        password: form.getValues("password"),
      });

      const oneDay = 24 * 60 * 60 * 1000;
      localStorage.setItem("@servrpd:client", JSON.stringify(res.client));

      await setCookies("@servrpd:clientToken", res.token, {
        secure: true,
        expires: new Date(Date.now() + oneDay),
      }).then(() => {
        toast({
          title: "Cliente cadastrado com sucesso",
        });
        window.location.reload();
      });
    },
    onError: (e) => {
      toast({
        title: "Erro ao criar usuário, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof registerClientSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-96"
      >
        <h1 className="text-2xl font-semibold">Seja um cliente Serviço Rápido</h1>
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
        />{" "}
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterClientForm;
