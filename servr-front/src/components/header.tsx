"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useFilter from "@/utils/useFilter";
import { clearCookie } from "@/utils/cookies";
import HeaderDrawer from "./drawer";
import { MiniHeader } from "./miniHeader";
import Image from "next/image";
import { SearchInput } from "./searchInput";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product";
import { ShowResults } from "./showResults";
import { ShoppingCart } from "lucide-react";
import useCart from "@/contexts/useCart";
import useLogged from "@/contexts/useLogged";

const Header = () => {
  const router = useRouter();

  const { setText, text } = useFilter();

  const { logged, isClient, logout } = useLogged();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { products } = useCart();

  return (
    <div className="flex flex-col w-full items-center border border-b-[1px] border-b-secondary bg-white">
      <MiniHeader />

      <div className="flex items-center justify-between w-full max-w-7xl max-lg:justify-center p-4">
        <div className="flex items-center gap-4 w-full">
          <div className="flex max-lg:justify-between max-lg:w-full gap-4">
            <div className="flex max-md:flex-col max-md:items-center max-md:gap-4 gap-8 items-center">
              <h1 className="text-primary font-bold text-2xl">SERVIÇO RÁPIDO</h1>
              <div className="flex gap-2">
                <div className="relative">
                  <SearchInput
                    value={text}
                    setValue={(text) => setText(text)}
                  />
                  <ShowResults res={data} text={text} />
                </div>

                <Button
                  variant={"ghost"}
                  className="relative"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingCart size={24} />
                  <span
                    className={`absolute bg-red-500 text-white top-0 right-1 rounded-full p-[2px] text-xs ${
                      products.length > 0 ? "" : "hidden"
                    }`}
                  >
                    {products.length}
                  </span>
                </Button>
              </div>
            </div>
            <div className="flex items-center lg:hidden">
              <HeaderDrawer />
            </div>
          </div>
        </div>
        <div className="max-lg:hidden flex gap-2">
          {logged && !isClient ? (
            <div className="flex gap-2 ">
              <Button
                variant={"link"}
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Dashboard
              </Button>
              <Button
                variant={"link"}
                onClick={() => {
                  router.push("/products");
                }}
              >
                Produtos
              </Button>
            </div>
          ) : !logged ? (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  router.push("/clientLogin");
                }}
                className="rounded-md px-5"
                variant="ghost"
              >
                Sou cliente
              </Button>
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                className="rounded-md px-5"
                variant="ghost"
              >
                Entrar
              </Button>
              <Button
                onClick={() => {
                  router.push("/register");
                }}
                className="rounded-md px-5"
              >
                Quero vender
              </Button>
            </div>
          ) : null}
          {logged ? (
            <Button
              onClick={() => logout().then(() => router.push("/"))}
              className="rounded-md px-5"
            >
              Sair
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
