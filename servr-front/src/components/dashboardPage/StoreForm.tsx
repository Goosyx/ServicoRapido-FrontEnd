/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { storeSchema } from "../../schemas/storeSchema";
import { getMyStore, updateMyStore } from "../../api/store";
import { useMutation } from "@tanstack/react-query";
import { StoreReq } from "../../types/storeType";
import { toast } from "../ui/use-toast";

export const StoreForm = () => {
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof storeSchema>) {
    mutate(values);
  }

  const { mutate } = useMutation({
    mutationFn: (v: StoreReq) => {
      setIsLoading(true)
      return updateMyStore(v)
    },
    onSuccess: async () => {
      setIsLoading(false)
      toast({
        title: "Loja atualizada com sucesso",
      });
    },
    onError: (e) => {
      setIsLoading(false)
      toast({
        title: "Erro ao atualizar dados da loja, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

  async function getInitialValues() {
    const v = await getMyStore();
    if (v) {
      form.setValue('name', v.name)
    }
  }

  useEffect(() => {
    getInitialValues()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        <div className="w-full flex items-end justify-between">
          <h1 className="text-xl text-slate-900 font-semibold w-full">Minha loja</h1>
          <Button type="submit" size='sm' disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar dados da loja
          </Button>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da loja</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da sua loja" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}