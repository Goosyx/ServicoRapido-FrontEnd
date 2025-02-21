"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./productCard";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/api/auth";
import { getProductByUser } from "@/api/product";
import { useEffect } from "react";

const ProductList = () => {
  const { data } = useQuery({
    queryKey: ["products", getUserId()],
    queryFn: () => {
      return getProductByUser(getUserId());
    },
  });

  useEffect(() => {
    if(getUserId() === null) router.push('/')
  }, [])

  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-slate-900 font-semibold">Produtos</h1>
        <Button
          onClick={() => router.push("/productRegister/create")}
          className="flex w-fit gap-2  p-4 items-center"
        >
          Adicionar Produto <Plus />
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap max-lg:justify-center">
        {data?.length === 0 && <div className="flex w-full"><p className="text-slate-500">Nenhum produto cadastrado</p></div>}
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
