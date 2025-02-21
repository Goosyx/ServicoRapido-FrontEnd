/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "../../schemas/userSchema";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { getMe, updateMe } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserReq } from "../../types/userType";
import { toast } from "../ui/use-toast";

export const DataForm = () => {
  const [isCnpj, setIsCnpj] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      name: "",
      cpf: undefined,
      cnpj: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    mutate(values);
  }

  const { mutate } = useMutation({
    mutationFn: (v: UpdateUserReq) => {
      setIsLoading(true);
      return updateMe(v);
    },
    onSuccess: async () => {
      setIsLoading(false);
      toast({
        title: "Dados atualizados com sucesso",
      });
    },
    onError: (e) => {
      setIsLoading(false);
      toast({
        title: "Erro ao atualizar dados, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

  async function getInitialValues() {
    const v = await getMe();
    if (v.cnpj) setIsCnpj(true);
    if (v) {
      form.setValue("name", v.name);
      form.setValue("email", v.email);
      form.setValue("cnpj", v.cnpj);
      form.setValue("cpf", v.cpf);
    }
  }

  useEffect(() => {
    getInitialValues();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="w-full flex items-end justify-between">
          <h1 className="text-xl text-slate-900 font-semibold w-full">
            Meus dados
          </h1>
          <Button type="submit" size="sm" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar dados
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
                      disabled
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
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
