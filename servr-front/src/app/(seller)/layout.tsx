import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  if (!cookieStore.has("@servrpd:token")) {
    redirect("/");
  }

  return <section>{children}</section>;
}
