"use client";

import { ProductRes } from "@/types/productType";
import Image from "next/image";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Edit3 } from "lucide-react";
import { Label } from "../ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageByProduct, updateProduct } from "@/api/product";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductRes;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(product.status);

  const useClient = useQueryClient();

  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        title: "Produto atualizado com sucesso",
      });
      useClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar o produto",
        variant: "destructive",
      });
    },
  });

  const imgQuery = useQuery({
    queryKey: ["productImage", product.id],
    queryFn: () => {
      return getImageByProduct(product.id);
    },
  });

  return (
    <div
      className={`w-full max-w-96 border-2 border-slate-200 rounded-lg p-4 flex max-lg:flex-col max-lg:justify-center max-lg:items-center gap-4 ${
        updateMutation.isPending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <Image
        src={imgQuery.data?.[0]?.imageUrl || "/no-image.jpg"}
        alt={product.title}
        width={200}
        height={200}
        className="h-32 object-cover max-lg:w-full w-32 rounded-lg"
      />
      <div className="flex flex-col justify-between w-full max-lg:gap-4">
        <div className="flex justify-between items-center w-full gap-4 max-lg:flex-col">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p>
              {(product.price / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push(`/productRegister/${product.id}`)}
          >
            <Edit3 />
          </Button>
        </div>
        <div className="flex gap-2 items-center lg:self-end self-center">
          <Label>Disponível?</Label>
          <Switch
            checked={isAvailable}
            onCheckedChange={(checked) => {
              setIsAvailable(checked);
              updateMutation.mutate({
                ...product,
                status: checked,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
