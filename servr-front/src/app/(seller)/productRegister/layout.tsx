import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviço Rápido - Cadastro de Produtos",
  description: "Tudo que você quer",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
