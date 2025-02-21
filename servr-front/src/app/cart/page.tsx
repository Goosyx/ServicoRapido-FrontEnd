import { Metadata } from "next";
import { cookies } from "next/headers";
import Header from "../../components/header";
import CartIndex from "@/components/cart/cartIndex";

export const metadata: Metadata = {
  title: "Serviço Rápido - Carrinho",
  description: "Tudo que você quer",
};

const RecentsProducts = () => {
  const cookieStore = cookies();

  return (
    <div className="w-full min-h-screen flex flex-col bg-white gap-8">
      <div className=" border-b-2">
        <Header />
      </div>
      <div className="max-w-7xl self-center w-full ">
        <CartIndex />
      </div>
    </div>
  );
};

export default RecentsProducts;
