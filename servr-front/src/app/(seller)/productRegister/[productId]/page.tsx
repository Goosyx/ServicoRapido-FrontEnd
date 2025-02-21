"use client";

import { getProduct } from "@/api/product";
import ProductRegisterForm from "@/components/productRegister/productRegisterForm";
import SimpleHeader from "@/components/simpleHeader";
import { ProductRes } from "@/types/productType";
import { useQuery } from "@tanstack/react-query";

const ProductRegister = ({ params }: { params: { productId: string } }) => {
  const { data, isPending } = useQuery({
    queryKey: ["products", params.productId],
    queryFn: () => {
      if (params.productId === "create") return null;
      return getProduct(params.productId);
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className=" border-b-2">
        <SimpleHeader
          title={
            params.productId === "create"
              ? "Cadastrar produto"
              : "Editar produto"
          }
        />
      </div>
      <div className="items-center justify-center flex h-[calc(100vh-7.25rem)] w-full p-8 px-[20%] bg-slate-50">
        {isPending && <div>Loading...</div>}
        {!isPending && (
          <ProductRegisterForm
            product={
              params.productId === "create"
                ? undefined
                : ({
                    ...data,
                    price: data?.price! / 100,
                  } as ProductRes)
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProductRegister;
