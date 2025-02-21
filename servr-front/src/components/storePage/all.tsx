/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/components/header";
import useFilter from "@/utils/useFilter";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserId, verifyComplete } from "../../api/auth";
import { getStores } from "../../api/store";
import StoreAvailables from "../mainPage/storeAvailables";

export default function IndexStoreHome() {
  const router = useRouter();

  const resStore = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  useEffect(() => {
    if (getUserId() !== null) router.push("/dashboard");
  }, [router]);

  const { text } = useFilter();

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 w-full">
      <Header />

      {text ? (
        <div />
      ) : (
        // <AdList />
        <>
          <div className="flex flex-col gap-10 items-center justify-between w-full max-w-7xl max-lg:justify-center p-4 max-lg:gap-16">
            <StoreAvailables stores={resStore.data || []} all />
          </div>
        </>
      )}
    </main>
  );
}
