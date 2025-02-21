"use client";

import { getImageByProduct, getProduct } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import Header from "../header";
import ImgCarousel from "./imgCarousel";
import Info from "./info";
import { SmallProductHeader } from "./smallHeader";
import { SmallProductInfo } from "./smallInfo";

type IndexInfoPageProps = {
  productId: string;
};

export default function IndexInfoPage({ productId }: IndexInfoPageProps) {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      const res = getProduct(productId);
      return res;
    },
  });

  const imgQuery = useQuery({
    queryKey: ["productImage", productId],
    queryFn: () => {
      return getImageByProduct(productId);
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <div className=" border-b-2">
        <Header />
      </div>
      <div className="items-center justify-center flex flex-col md:flex-row mt-12 mb-12 w-full">
        <div className="hidden md:flex gap-4 w-full max-w-7xl max-lg:justify-center p-4">
          <ImgCarousel images={imgQuery.data || []} />
          <Info product={productQuery.data!} />
        </div>

        <div className="flex md:hidden flex-col gap-4 w-full max-w-7xl max-lg:justify-center p-4">
          <SmallProductHeader product={productQuery.data!} />
          <ImgCarousel images={imgQuery.data || []} />
          <SmallProductInfo product={productQuery.data!} />
        </div>
      </div>
      <div className="items-center justify-center flex flex-col md:flex-row w-full">
        <div className="flex gap-4 w-full max-w-7xl max-lg:justify-center p-4">
          <div className="w-full p-4 bg-white rounded flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Descrição</h1>
            <p className="text-slate-500">{productQuery.data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
