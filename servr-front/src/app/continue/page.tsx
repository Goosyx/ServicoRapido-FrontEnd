import SimpleHeader from "@/components/simpleHeader";
import { Metadata } from "next";
import ContinueForm from "../../components/loginPage/ContinueForm";

export const metadata: Metadata = {
  title: "Serviço Rápido - Endereço",
  description: "Tudo que você quer",
};

export default function Continue() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className=" border-b-2">
        <SimpleHeader />
      </div>
      <div className="items-center justify-center flex mt-12 mb-12 w-full">
        <div>
          <ContinueForm/>
        </div>
      </div>
    </div>
  );
}
