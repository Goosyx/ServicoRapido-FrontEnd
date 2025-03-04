import ClientLoginTab from "@/components/clientLogin/tabs";
import SimpleHeader from "@/components/simpleHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviço Rápido - Autenticação de client",
  description: "Tudo que você quer",
};

export default function Login() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className=" border-b-2">
        <SimpleHeader />
      </div>
      <div className="items-center justify-center flex mt-12 w-full">
        <ClientLoginTab />
      </div>
    </div>
  );
}
