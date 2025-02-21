"use client";

import { getProducts } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import AdCard from "./adCard";
import useFilter from "@/utils/useFilter";

const AdList = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { text } = useFilter();

  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-4 px-80">
      <Button
        onClick={() => router.push("/productRegister/create")}
        className="flex w-full gap-2 border-2 border-slate-200 p-4 items-center"
        variant={"ghost"}
      >
        Adicionar Produto <Plus />
      </Button>
      <div className="flex gap-4 flex-wrap">
        {data
          ?.filter((product) => product.title.includes(text))
          .map((product) => (
            <AdCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AdList;
