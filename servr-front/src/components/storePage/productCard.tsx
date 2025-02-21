"use client";

/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getImageByProduct } from "../../api/product";
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";

type IProductCardProps = {
  name: string;
  price: number;
  id: string;
};

function ProductCard({ name, id, price }: IProductCardProps) {
  const router = useRouter();

  const imgQuery = useQuery({
    queryKey: ["productImage", id],
    queryFn: () => {
      return getImageByProduct(id);
    },
  });

  function goToProduct() {
    router.push(`/${price}/${id}`);
  }

  return (
    <div
      onClick={goToProduct}
      className="w-full h-96 rounded-md bg-white relative hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {imgQuery.data ? (
        <div className="absolute h-96 rounded-md bg-gradient-to-t from-slate-900/80 to-slate-100/0 top-0 w-full" />
      ) : null}
      {imgQuery.data && imgQuery.data.length > 0 ? (
        <img
          className="w-full h-96 object-cover bg-cover rounded-md"
          src={imgQuery.data[0].imageUrl}
          alt={`image ${name} - ${id}`}
        />
      ) : null}
      <div className="absolute bottom-2 p-4 flex flex-col gap-4">
        <h1
          className={cn(
            "text-lg font-semibold",
            imgQuery.data ? "text-white" : "text-gray-950"
          )}
        >
          {name}
        </h1>
        <div className="w-fit py-px px-2 rounded bg-white flex items-center justify-start">
          <h3 className="font-semibold">R$ {(price / 100).toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
