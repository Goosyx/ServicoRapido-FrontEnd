"use client";

import { ProductRes } from "@/types/productType";
import { CardFull, CardHalf } from "./section2Card";
import { getImages } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Section2Props = {
  products: ProductRes[];
  title: string;
  recents?: boolean;
};

const Section2 = ({ products, title, recents }: Section2Props) => {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  function goTo(id?: string) {
    if(recents) {
      router.push('/recents')
    } else {
      router.push(`/store/${id}`)
    }
  }

  if (products.length == 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-slate-400">Tudo para você</p>
          <Button variant={`link`} onClick={() => goTo(products.length ? products[0].userId : '')}>Ver mais</Button>
        </div>
      </div>
      <div className="flex w-full gap-4 max-lg:flex-col">
        <div className="!grid !grid-cols-6 gap-4 w-full max-lg:!grid-cols-3 max-lg:gap-10 max-sm:!grid-cols-2">
          <div className="col-span-2">
            <CardFull
              src={
                (products[0] &&
                  data?.find((img) => img.productId === products[0].id)
                    ?.imageUrl) ||
                "/no-image.jpg"
              }
              text={(products[0] && (products[0].price / 100).toString()) || ""}
              id={products[0] && products[0].id}
            />
          </div>
          <div className="flex flex-col gap-4">
            <CardHalf
              src={
                (products[1] &&
                  data?.find((img) => img.productId === products[1].id)
                    ?.imageUrl) ||
                "/no-image.jpg"
              }
              text={(products[1] && (products[1].price / 100).toString()) || ""}
              id={products[1] && products[1].id}
            />
            <CardHalf
              src={
                (products[2] &&
                  data?.find((img) => img.productId === products[2].id)
                    ?.imageUrl) ||
                "/no-image.jpg"
              }
              text={(products[2] && (products[2].price / 100).toString()) || ""}
              id={products[2] && products[2].id}
            />
          </div>
          <div className="flex flex-col gap-4">
            <CardHalf
              src={
                (products[3] &&
                  data?.find((img) => img.productId === products[3].id)
                    ?.imageUrl) ||
                "/no-image.jpg"
              }
              text={(products[3] && (products[3].price / 100).toString()) || ""}
              id={products[3] && products[3].id}
            />
            <CardHalf
              src={
                (products[4] &&
                  data?.find((img) => img.productId === products[4].id)
                    ?.imageUrl) ||
                "/no-image.jpg"
              }
              text={(products[4] && (products[4].price / 100).toString()) || ""}
              id={products[4] && products[4].id}
            />
          </div>
          <div className="col-span-2">
            <CardFull
              src={
                (products[5] &&
                  data?.find((img) => img.productId === products[5].id)
                    ?.imageUrl) ||
                "/no-image.jpg"
              }
              text={(products[5] && (products[5].price / 100).toString()) || ""}
              id={products[5] && products[5].id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
