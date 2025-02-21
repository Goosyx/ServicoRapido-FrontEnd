import IndexHome from "@/components/mainPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviço rápido - Pagina Inicial",
  description: "PRoupas!!!",
};

export default function Home() {
  return <IndexHome />;
}
