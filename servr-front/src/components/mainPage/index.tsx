"use client";

import { getProducts } from "@/api/product";
import Header from "@/components/header";
import MainCarousel from "@/components/mainPage/mainCarousel";
import Section2 from "@/components/mainPage/section2";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CallInfo } from "./callInfo";
import StoreAvailables from "./storeAvailables";
import { useRouter } from "next/navigation";
import { getUserId, verifyComplete } from "../../api/auth";
import { getStores } from "../../api/store";
import { Footer } from "../footer";

export default function IndexHome() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const resStore = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  useEffect(() => {
    router.push(verifyComplete("/"));
    if (getUserId() !== null) router.push("/dashboard");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 w-full">
      <Header />

      {/* <div className="flex items-center justify-between w-full max-w-7xl max-lg:justify-center p-4">
        <MainCarousel />
      </div> */}
      <div className="flex flex-col gap-10 items-center justify-between w-full max-w-7xl max-lg:justify-center p-4 max-lg:gap-16">
        {/* <CallInfo /> */}
        <Section2
          title={"Produtos mais recentes"}
          products={
            data
              ?.sort(
                (a, b) =>
                  new Date(b.updatedAt!).getTime() -
                  new Date(a.updatedAt!).getTime()
              )
              .filter((el) => el.status === true) || []
          }
          recents
        />
        <StoreAvailables stores={resStore.data || []} />
        {resStore?.data?.map((store) => (
          <Section2
            key={store.id}
            products={
              data?.filter(
                (product) =>
                  product.userId === store.user?.id && product.status === true
              ) || []
            }
            title={`Artigos da loja ${store.name}`}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}
