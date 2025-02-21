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
import { authClient } from "@/api/auth";
import { setCookies } from "@/utils/cookies";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/contexts/useCart";
import { getCartByClientId } from "@/api/cart";
import { createCartItem } from "@/api/cartItem";

const LoginClientForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const { products, cartId } = useCart();
  console.log(products, cartId);

  const cartItemMutation = useMutation({
    mutationFn: createCartItem,
  });

  const cartMutation = useMutation({
    mutationFn: getCartByClientId,
    onSuccess: (data) => {
      if (data.cartItems && data.cartItems?.length === 0) {
        products.map(async (product) => {
          await cartItemMutation.mutate({
            cartId: data.id,
            productId: product.product.id,
            quantity: product.quantity,
          });
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authClient,
    onSuccess: async (data) => {
      const oneDay = 24 * 60 * 60 * 1000;

      await localStorage.setItem("@servrpd:client", JSON.stringify(data.client));

      cartMutation.mutate(data.client.id);

      await setCookies("@servrpd:clientToken", data.token, {
        secure: true,
        expires: new Date(Date.now() + oneDay),
      }).then(() => {
        toast({
          title: "Cliente logado com sucesso",
        });
        window.location.reload();
      });
    },
    onError: () => {
      toast({
        title: "Erro ao logar cliente, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

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
          Entre na sua conta de cliente
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

        <Button type="submit" className="w-full">
          {isPending ? <Loader2 /> : null}
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default LoginClientForm;
