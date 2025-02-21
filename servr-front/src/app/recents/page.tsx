import { Metadata } from "next";
import { cookies } from "next/headers";
import IndexStoreHome from "../../components/storePage/all";
import Header from "../../components/header";
import RecentsPage from "../../components/storePage/recents";

export const metadata: Metadata = {
  title: "Serviço Rápido - Produtos recentes",
  description: "Tudo que você quer",
};

const RecentsProducts = () => {
  const cookieStore = cookies();

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <div className=" border-b-2">
        <Header />
      </div>
      <div className="items-center justify-center flex flex-col md:flex-row mt-12 mb-12 w-full">
        <div className="flex items-center justify-between w-full max-w-7xl max-lg:justify-center p-4">
          <RecentsPage />
        </div>
      </div>
    </div>
  );
};

export default RecentsProducts;
