import Header from "@/components/header";
import { Metadata } from "next";
import { cookies } from "next/headers";
import StorePage from "../../../components/storePage";

export const metadata: Metadata = {
  title: "Serviço Rápido - Loja",
  description: "Tudo que você quer",
};

const StoreProducts = ({ params }: { params: { id: string[] } }) => {
  const cookieStore = cookies();

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <div className=" border-b-2">
        <Header />
      </div>
      <div className="items-center justify-center flex flex-col md:flex-row mt-12 mb-12 w-full">
        <div className="flex items-center justify-between w-full max-w-7xl max-lg:justify-center p-4">
          <StorePage id={params.id[0]} />
        </div>
      </div>
    </div>
  );
};

export default StoreProducts;
