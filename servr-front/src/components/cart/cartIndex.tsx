"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import ProductInfo from "./productInfo";
import { Trash } from "lucide-react";
import useCart from "@/contexts/useCart";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import useLogged from "@/contexts/useLogged";
import { checkoutPost, checkoutReq } from "@/api/checkout";
import { useRouter } from "next/navigation";

const CartIndex = () => {
  const { products, changeProductQuantity, deleteProduct } = useCart();
  const { logged, client, storeId } = useLogged();
  console.log(products);

  const route = useRouter();

  const goToPayment = async () => {
    if (!logged) {
      toast({
        title: "Você precisa possuir uma conta para prosseguir",
        variant: "destructive",
      });

      route.push("/clientLogin");

      return;
    }

    const checkout: checkoutReq = {
      customerEmail: client.email,
      items: products.map((product) => ({
        name: `${product.product.title} - ${product.productColor} - ${product.productSize}`,
        quantity: product.quantity,
        unitAmount: product.product.price,
      })),
      storeId: storeId,
    };

    const url = await checkoutPost(checkout);

    route.push(url);
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="">
        <Table height="max-h-[calc(100vh-20rem)]">
          <TableHeader className="bg-primary/20">
            <TableRow>
              <TableHead className="text-primary font-semibold">
                Produtos
              </TableHead>
              <TableHead className="text-primary font-semibold">
                Valor unitário
              </TableHead>
              <TableHead className="text-primary font-semibold">
                Quantidade
              </TableHead>
              <TableHead className="text-primary font-semibold">
                Subtotal
              </TableHead>
              <TableHead className="text-primary font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                key={
                  !product.cartItemId
                    ? `${product.product.id}-${product.productColor}-${product.productSize}`
                    : product.cartItemId
                }
              >
                <TableCell>
                  <ProductInfo
                    product={product.product}
                    color={product.productColor}
                    size={product.productSize}
                  />
                </TableCell>
                <TableCell className="font-semibold ">
                  R$ {(product.product.price / 100).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Input
                    className="bg-spLightWhite rounded-lg p-2 text-center w-fit max-md:max-w-36"
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      changeProductQuantity(
                        product.product.id,
                        +e.target.value,
                        product.productColor!,
                        product.productSize!
                      )
                    }
                  />
                </TableCell>
                <TableCell className="font-semibold">
                  R${" "}
                  {((product.product.price * product.quantity) / 100).toFixed(
                    2
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 p-3"
                    onClick={() =>
                      deleteProduct(
                        product.product.id,
                        product.productSize || product.product.size[0],
                        product.productColor || product.product.color[0]
                      )
                    }
                  >
                    <Trash size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="bg-primary/20 p-3">
          <p className="text-primary text-end font-semibold">
            TOTAL:
            {(
              products.reduce(
                (acc, product) =>
                  acc + product.product.price * product.quantity,
                0
              ) / 100
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
      <Button onClick={goToPayment} className="self-end">
        Prosseguir para o pagamento
      </Button>
    </div>
  );
};

export default CartIndex;
