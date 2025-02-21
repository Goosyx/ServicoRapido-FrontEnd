"use client";

import { getCartByClientId } from "@/api/cart";
import { Toaster } from "@/components/ui/toaster";
import useCart from "@/contexts/useCart";
import useLogged from "@/contexts/useLogged";
import { ProductRes } from "@/types/productType";
import { isClientLogged, isLogged } from "@/utils/cookies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { setClient, setIsClient, setLogged, setUser, logged } = useLogged();

  const { setProducts, clearStorage, setCartId } = useCart();

  const getToken = async () => {
    const token = await isLogged();
    return token;
  };

  const getClientToken = async () => {
    const token = await isClientLogged();
    return token;
  };

  const cartMutation = useMutation({
    mutationFn: getCartByClientId,
    onSuccess: (data) => {
      setProducts(
        data.cartItems
          ? data.cartItems.map((item) => ({
              product: item.product || ({} as ProductRes),
              quantity: item.quantity,
              cartItemId: item.id,
              productColor: item.productColor,
              productSize: item.productSize,
            }))
          : []
      );
      setCartId(data.id);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    async function checkLogged() {
      if (typeof window !== "undefined") {
        const client = localStorage.getItem("@servrpd:client");
        const user = localStorage.getItem("@servrpd:user");
        const token = await getToken();
        const clientToken = await getClientToken();

        if (client) {
          setClient(JSON.parse(client));
        }

        if (user) {
          setUser(JSON.parse(user));
        }

        if (token) {
          setLogged(true);
          setIsClient(false);
        }

        if (clientToken) {
          setIsClient(true);
          setLogged(true);
        }

        if (logged && clientToken && client) {
          cartMutation.mutate(JSON.parse(client).id);
          clearStorage();
        } else {
          const products = localStorage.getItem("cart");

          if (products) {
            setProducts(JSON.parse(products));
          }
        }
      }
    }

    checkLogged();
  }, [logged]);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
