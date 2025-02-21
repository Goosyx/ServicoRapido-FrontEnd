/* eslint-disable @next/next/no-img-element */
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { ProductReq, ProductRes } from "@/types/productType";
import { productRegisterSchema } from "@/schemas/productRegisterSchema";
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getImageByProduct,
  updateProduct,
} from "@/api/product";
import { Textarea } from "../ui/textarea";
import CurrencyInput from "react-currency-input-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import ImgInput from "../imgInput";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import Firebase from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type ProductRegisterFormProps = {
  product?: ProductRes;
};

const ProductRegisterForm = ({ product }: ProductRegisterFormProps) => {
  const [imgsToExclude, setImgsToExclude] = useState<string[]>([]);
  const form = useForm<z.infer<typeof productRegisterSchema>>({
    resolver: zodResolver(productRegisterSchema),
    defaultValues: {
      category: product?.category || "",
      color: product?.color || [],
      description: product?.description || "",
      materials: product?.materials || [],
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      size: product?.size || [],
      title: product?.title || "",
      unit: product?.unit || "kg",
      weight: product?.weight || 0,
    },
  });

  const firebase = new Firebase();
  firebase.initializeApp();

  const storage = firebase.startStorageListener();

  const router = useRouter();

  const categories = [
    "Blusas",
    "Calças",
    "Saias",
    "Vestidos",
    "Casacos",
    "Camisetas",
    "Bermudas",
    "Agasalhos",
    "Macacões",
    "Meias",
    "Acessórios",
    "Outros",
  ];

  const imgQuery = useQuery({
    queryKey: ["productImage", product?.id],
    queryFn: () => {
      return getImageByProduct(product?.id!);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      toast({
        title: "Produto atualizado com sucesso",
      });
      router.push("/products");
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar produto",
        variant: "destructive",
      });
    },
  });

  const setToExclude = (id: string) => {
    setImgsToExclude([...imgsToExclude, id]);
  };

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast({
        title: "Produto criado com sucesso",
      });
      router.push("/products");
    },
    onError: (e) => {
      toast({
        title: "Erro ao criar produto",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast({
        title: "Produto excluído com sucesso",
      });
      router.push("/products");
    },
    onError: () => {
      toast({
        title: "Erro ao excluir produto",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof productRegisterSchema>) {
    var newValues = {} as ProductReq;

    const promises = values.media?.map(async (file) => {
      const storageRef = ref(
        storage!,
        `products/${JSON.parse(localStorage.getItem("@servrpd:user")!).id}/${
          values.title
        }/${file.file.name}`
      );
      await uploadBytes(storageRef, file.file);
      const url = await getDownloadURL(storageRef);
      return url;
    });

    await Promise.all(promises || []).then((e: string[]) => {
      Object.assign(newValues, { ...values, media: e });
    });

    newValues = {
      ...newValues,
      status: true,
      userId: JSON.parse(localStorage.getItem("@servrpd:user")!).id,
      price: values.price * 100,
    };

    if (product) {
      await Promise.all(imgsToExclude.map(async (el) => await deleteImage(el)));

      updateMutation.mutate({
        ...newValues,
        id: product.id,
      });
    } else {
      createMutation.mutate(newValues);
    }
  }

  const [newColor, setNewColor] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newSize, setNewSize] = useState("");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 space-y-8 rounded-lg w-full h-full bg-white border-2 border-slate-200 overflow-auto"
      >
        <div className="flex gap-16 max-lg:flex-col">
          <div className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do produto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8 max-lg:flex-col">
              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o peso"
                          type="number"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-fit mt-8">
                            <SelectValue defaultValue="kg" placeholder="kg" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* kg, g, lb, oz*/}
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                          <SelectItem value="oz">oz</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a quantidade"
                        type="number"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-8 max-lg:flex-col">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        id="milePaidPrice"
                        decimalSeparator=","
                        groupSeparator="."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                        allowNegativeValue={false}
                        prefix="R$"
                        defaultValue={0}
                        decimalsLimit={2}
                        allowDecimals
                        // value={field.value}
                        onValueChange={(value, name, values) => {
                          field.onChange(values?.float || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-8">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full space-y-8 ">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cores</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 max-lg:flex-col">
                      <Input
                        placeholder="Adicionar nova cor"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                      />
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          if (!newColor.trim()) return;
                          field.onChange([...field.value, newColor]);
                          setNewColor("");
                        }}
                        type="button"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </FormControl>
                  <div className="border-2 border-slate-200 p-2 w-full rounded-lg flex gap-4 flex-wrap">
                    {field.value.map((color, index) => (
                      <div
                        className="border-2 border-slate-100 p-2 py-1 w-fit rounded-lg flex gap-1 items-center"
                        key={index}
                      >
                        {color}
                        <X
                          className="cursor-pointer hover:bg-slate-100 rounded-full p-1 text-slate-400"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Materiais</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 max-lg:flex-col">
                      <Input
                        placeholder="Adicionar novo material"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                      />
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          if (!newMaterial.trim()) return;
                          field.onChange([...field.value, newMaterial]);
                          setNewMaterial("");
                        }}
                        type="button"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </FormControl>
                  <div className="border-2 border-slate-200 p-2 w-full rounded-lg flex gap-4 flex-wrap">
                    {field.value.map((material, index) => (
                      <div
                        className="border-2 border-slate-100 p-2 py-1 w-fit rounded-lg flex gap-1 items-center"
                        key={index}
                      >
                        {material}
                        <X
                          className="cursor-pointer hover:bg-slate-100 rounded-full p-1 text-slate-400"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanhos</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 max-lg:flex-col">
                      <Input
                        placeholder="Adicionar novo tamanho"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                      />
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          if (!newSize.trim()) return;
                          field.onChange([...field.value, newSize]);
                          setNewSize("");
                        }}
                        type="button"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </FormControl>
                  <div className="border-2 border-slate-200 p-2 w-full rounded-lg flex gap-4 flex-wrap">
                    {field.value.map((size, index) => (
                      <div
                        className="border-2 border-slate-100 p-2 py-1 w-fit rounded-lg flex gap-1 items-center"
                        key={index}
                      >
                        {size}
                        <X
                          className="cursor-pointer hover:bg-slate-100 rounded-full p-1 text-slate-400"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Imagens (opcional)</Label>
          <ImgInput
            submitImgs={(imgs) => {
              form.setValue(
                "media",
                imgs === null
                  ? []
                  : form.getValues().media
                  ? [...form.getValues().media!, ...imgs]
                  : imgs
              );
            }}
          />

          {imgQuery.data
            ?.filter((el) => !imgsToExclude.includes(el.id))
            .map((img) => {
              return (
                <div
                  key={img.id}
                  className="flex items-center justify-between p-4 rounded border-2 border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={img.imageUrl}
                      alt={img.id}
                      className="w-24 h-24 rounded object-cover"
                    />
                    <p className="text-slate-500">img_{img.id}.png</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setToExclude(img.id)}
                  >
                    Excluir imagem
                  </Button>
                </div>
              );
            })}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-end gap-4">
          <Button
            type="submit"
            className="w-full md:w-fit"
            disabled={createMutation.isPending}
          >
            <Loader2
              size={24}
              className={`animate-spin ${
                createMutation.isPending ? "block" : "hidden"
              }`}
            />
            {product ? "Atualizar" : "Cadastrar"} produto
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (product) deleteMutation.mutate(product.id);
              else router.push("/products");
            }}
            className={`w-full md:w-fit ${product ? "block" : "hidden"}`}
            variant={"destructive"}
            disabled={deleteMutation.isPending}
          >
            <Loader2
              size={24}
              className={`animate-spin ${
                deleteMutation.isPending ? "block" : "hidden"
              }`}
            />
            Excluir produto
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductRegisterForm;
