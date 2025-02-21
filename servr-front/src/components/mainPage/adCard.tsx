"use client";

import { ProductRes } from "@/types/productType";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getImageByProduct } from "@/api/product";

type AdCardProps = {
  product: ProductRes;
};

const AdCard = ({ product }: AdCardProps) => {
  const imgQuery = useQuery({
    queryKey: ["productImage", product.id],
    queryFn: () => {
      return getImageByProduct(product.id);
    },
  });

  return (
    <div className={`border-2 border-slate-200 rounded-lg p-4 flex gap-4`}>
      <Image
        src={imgQuery.data?.[0]?.imageUrl || "/no-image.jpg"}
        alt={product.title}
        width={200}
        height={200}
        className="h-32 bg-cover w-32 rounded-lg"
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p>
              {(product.price / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
