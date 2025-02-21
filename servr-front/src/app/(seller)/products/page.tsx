import Header from "@/components/header";
import ProductList from "@/components/products/productList";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Serviço Rápido - Produtos",
  description: "Tudo que você quer",
};

const ProductRegister = () => {
  const cookieStore = cookies();

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <div className=" border-b-2">
        <Header />
      </div>
      <div className="items-center justify-center flex flex-col md:flex-row mt-12 mb-12 w-full">
        <div className="flex items-center justify-between w-full max-w-7xl max-lg:justify-center p-4">
          <div className="flex gap-4 w-full flex-col md:flex-row">
            <div className="w-full bg-white border border-b-[1px] border-b-secondary shadow-md rounded-md p-4 flex flex-col gap-4">
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegister;
