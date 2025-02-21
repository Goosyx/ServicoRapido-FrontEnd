"use client";

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
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createAddress } from "../../api/address";
import { AddressReq } from "../../types/addressType";
import { addressSchema } from "../../schemas/addressSchema";
import { statesCities } from "../../utils/stateAndCities";
import { getUserId, verifyComplete } from "../../api/auth";

const ContinueForm = () => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      number: "",
      city: "São Paulo",
      state: "SP",
      complement: "",
      zipCode: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (value: AddressReq) => {
      setIsLoading(true);
      return createAddress({
        ...value,
        userId: getUserId(),
      });
    },
    onSuccess: () => {
      localStorage.setItem("@servrpd:address", JSON.stringify(form.getValues()));
      setIsLoading(false);
      toast({
        title: "Endereço atualizado com sucesso",
      });
      router.push("dashboard");
    },
    onError: (e) => {
      setIsLoading(false);
      toast({
        title:
          "Erro ao atualizar endereço, verifique os dados e tente novamente",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof addressSchema>) {
    const newValues = {
      ...values,
      userId: "oia",
      number: values.number || "*",
    };

    mutate(newValues);
  }

  useEffect(() => {
    router.push(verifyComplete("/continue"));
  }, [router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-96 flex flex-col items-center"
      >
        <h1 className="text-2xl font-semibold">Só falta uma coisa...</h1>
        <div className="w-96 gap-4 flex">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full mt-8">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {statesCities.estados.map((state, i) => {
                      return (
                        <SelectItem key={i} value={state.sigla}>
                          {state.nome}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full mt-8">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statesCities.estados
                      .find((el) => el.sigla === form.getValues().state)
                      ?.cidades.map((el, i) => {
                        return (
                          <SelectItem key={i} value={el}>
                            {el}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Rua/Avenida</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua rua/avenida" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-96 gap-4 flex">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Deixe em branco caso não possua"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu CEP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input placeholder="Alguma observação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar endereço
        </Button>
      </form>
    </Form>
  );
};

export default ContinueForm;
