"use client";

import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../api/store";
import { StoreHeader } from "./storeHeader";
import StoreProductList from "./storeProductList";

type StorePageType = {
  id: string;
}

const StorePage = ({ id }: StorePageType) => {
  const { data } = useQuery({
    queryKey: ["one_store", id],
    queryFn: () => {
      return getStore(id);
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <StoreHeader name={data?.name}/>
      <StoreProductList id={id}/>
    </div>
  );
};

export default StorePage;
