import IndexInfoPage from "@/components/infoPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { info: string[] };
}): Promise<Metadata> {
  return {
    title: `Serviço Rápido - ${params.info[0]}`,
    description: `Tudo que você quer - ${params.info[0]}`,
  };
}

const ProductRegister = ({ params }: { params: { info: string[] } }) => {
  return <IndexInfoPage productId={params.info[1]} />;
};

export default ProductRegister;
