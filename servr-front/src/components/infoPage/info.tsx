/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ProductRes } from "@/types/productType";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import useCart from "@/contexts/useCart";
import { toast } from "../ui/use-toast";

type InfoProps = {
  product: ProductRes;
};

const Info = ({ product }: InfoProps) => {
  const router = useRouter();

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  function setDefaultValues() {
    if (product?.size.length > 0) {
      setSize(product.size[0]);
    } else {
      setSize("Sem tamanho");
    }
    if (product?.color.length > 0) {
      setColor(product.color[0]);
    } else {
      setColor("Sem cor");
    }
  }

  function gotoProducts() {
    router.push(`/store/${product?.userId}`);
  }

  useEffect(() => {
    setDefaultValues();
  }, [product?.size, product?.color]);

  const { addProduct, products } = useCart();
  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex py-px px-2 rounded bg-primary items-center justify-center text-white w-fit">
          <p>{product?.category}</p>
        </div>
        <div className="flex flex-col gap-2 border-b border-slate-300 pb-4">
          <h1 className="font-bold text-2xl">{product?.title}</h1>
          <h3 className="font-semibold text-xl">
            R$ {(product?.price / 100).toFixed(2)}
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-px">
            <h2 className="font-semibold">Cores</h2>
            <Select
              defaultValue={color}
              value={color}
              onValueChange={(e) => setColor(e)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                {product?.color.length <= 0 && (
                  <SelectItem value="Sem cor">Sem cor</SelectItem>
                )}
                {product?.color.map((el, i) => {
                  return (
                    <SelectItem key={i} value={el}>
                      {el}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-px">
            <h2 className="font-semibold">Tamanhos</h2>
            <Select
              defaultValue={size}
              value={size}
              onValueChange={(e) => setSize(e)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                {product?.size.length <= 0 && (
                  <SelectItem value="Sem tamanho">Sem tamanho</SelectItem>
                )}
                {product?.size.map((el, i) => {
                  return (
                    <SelectItem key={i} value={el}>
                      {el}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-px">
            <h2 className="font-semibold">Peso</h2>
            {product?.weight > 0 ? product?.weight : 'Não informado'} {product?.weight > 0 ? product?.unit : ''}
          </div>

          <div className="flex flex-col gap-px">
            <h2 className="font-semibold">Materiais</h2>
            <ul>
              {product?.materials?.map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-4">
        <div className="w-full rounded flex flex-col gap-4 bg-white p-4">
          <div className="flex justify-between items-center">
            {product?.quantity > 0 && product?.status === true ? (
              <h1 className="font-semibold">Estoque disponível</h1>
            ) : (
              <h1 className="font-semibold">Estoque indisponível</h1>
            )}
            <Button
              variant={"ghost"}
              onClick={() => {
                addProduct(product, color, size);
              }}
              className={`
              ${
                product?.quantity > 0 && product?.status === true
                  ? ""
                  : "opacity-50 cursor-not-allowed pointer-events-none"
              }
              `}
            >
              <ShoppingCart size={24} />
            </Button>
          </div>
          <div className="w-full h-px bg-slate-100" />
          {/* <p>Funcionalidades de frete ainda não desenvolvidas</p> */}
          <div className="w-full h-px bg-slate-100" />
          <Button
            onClick={() => {
              addProduct(product, color, size);
            }}
          >
            Comprar
          </Button>
          <Button
            className="bg-primary/35 hover:bg-primary/20 text-primary"
            onClick={gotoProducts}
          >
            Ver mais dessa loja
          </Button>
        </div>

        <div className="w-full rounded flex flex-col gap-4 bg-white p-4">
          <h1>Meios de pagamento</h1>
          <p>Visa, Mastercard, American Express</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
