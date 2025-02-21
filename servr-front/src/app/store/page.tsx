import Header from "@/components/header";
import { Metadata } from "next";
import { cookies } from "next/headers";
import IndexStoreHome from "../../components/storePage/all";

export const metadata: Metadata = {
  title: "Serviço Rápido - Loja",
  description: "Tudo que você quer",
};

const StoreProducts = ({ params }: { params: { id: string[] } }) => {
  const cookieStore = cookies();

  return <IndexStoreHome />;
};

export default StoreProducts;
