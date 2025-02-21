"use client";

import { loginSchema } from "@/schemas/loginSchema";
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
import { authUser, getUserId } from "@/api/auth";
import { setCookies } from "@/utils/cookies";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: authUser,
    onSuccess: async (data) => {
      const oneDay = 24 * 60 * 60 * 1000;
      localStorage.setItem("@servrpd:user", JSON.stringify(data.user));
      if (data.address) {
        localStorage.setItem("@servrpd:address", JSON.stringify(data.address));
      }

      await setCookies("@servrpd:token", data.token, {
        secure: true,
        expires: new Date(Date.now() + oneDay),
      }).then(() => {
        window.location.reload();
      });

      toast({
        title: "Usuário logado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao logar usuário, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (getUserId() !== null) router.push("/dashboard");
  }, [router]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-96 flex flex-col items-center"
      >
        <h1 className="text-2xl font-semibold">
          Entre na sua conta Serviço Rápido
        </h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
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
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="flex gap-4 items-center">
                  <Input
                    placeholder="Digite sua senha"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant={"ghost"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <span
            className="text-sm hover:underline cursor-pointer"
            onClick={() => {
              router.push("/clientLogin");
            }}
          >
            É cliente? clique aqui
          </span>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
