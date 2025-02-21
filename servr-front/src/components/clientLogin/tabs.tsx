"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginClientForm from "@/components/clientLogin/LoginClientForm";
import RegisterClientForm from "@/components/clientLogin/RegisterClientForm";
import useLogged from "@/contexts/useLogged";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ClientLoginTab = () => {
  const router = useRouter();

  const { logged } = useLogged();

  useEffect(() => {
    if (logged) {
      router.push("/");
    }
  }, [logged]);

  return (
    <Tabs defaultValue="login" className="bg-spLightWhite rounded-lg p-4">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="login">
          Entrar
        </TabsTrigger>
        <TabsTrigger className="w-full" value="register">
          Cadastro
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" asChild>
        <LoginClientForm />
      </TabsContent>
      <TabsContent value="register" asChild>
        <RegisterClientForm />
      </TabsContent>
    </Tabs>
  );
};

export default ClientLoginTab;
