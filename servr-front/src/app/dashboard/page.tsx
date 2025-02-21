import { Metadata } from "next";
import Header from "../../components/header";
import DashboardPage from "../../components/dashboardPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Serviço Rápido - Dashboard",
  description: "Tudo que você quer",
};

export default function Dashboard() {
  const cookieStore = cookies();

  if (!cookieStore.has("@servrpd:token")) {
    redirect("/");
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <div className=" border-b-2">
        <Header />
      </div>
      <DashboardPage />
    </div>
  );
}
