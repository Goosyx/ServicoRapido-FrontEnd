"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/api/auth";
import { getProductByUser } from "@/api/product";
import { ProductCard } from "./productCard";

type IStoreProductListProps = {
  id?: string;
}

const StoreProductList = ({ id }: IStoreProductListProps) => {
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return getProductByUser(id!);
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-5 w-full gap-4 max-lg:!grid-cols-4 max-md:!grid-cols-3 max-sm:!grid-cols-2">
        {data?.filter(el => el.status === true).length === 0 && <div className="flex w-full"><p className="text-slate-500">Nenhum produto cadastrado</p></div>}
        {data?.filter(el => el.status === true).map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreProductList;
