"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { clearCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import useLogged from "@/contexts/useLogged";

const HeaderDrawer = () => {
  const router = useRouter();

  const { logged, isClient, logout } = useLogged();

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Menu size={32} />
      </DrawerTrigger>
      <DrawerContent className="h-full w-fit right-0 inset-y-0 mt-0 left-auto rounded-tl-md rounded-bl-md rounded-tr-none">
        <DrawerHeader>
          <DrawerDescription asChild>
            {logged && !isClient ? (
              <div className="flex flex-col items-center">
                <Button
                  className="text-lg"
                  variant={"link"}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  className="text-lg"
                  variant={"link"}
                  onClick={() => {
                    router.push("/products");
                  }}
                >
                  Produtos
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Button
                  className="text-lg"
                  variant={"link"}
                  onClick={() => {
                    router.push("/clientLogin");
                  }}
                >
                  Sou cliente
                </Button>
                <Button
                  className="text-lg"
                  variant={"link"}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Entrar
                </Button>
                <Button
                  className="text-lg"
                  variant={"link"}
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Quero vender
                </Button>
              </div>
            )}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            {logged ? (
              <Button
                onClick={() => logout().then(() => router.push("/"))}
                className="rounded-full p-6 px-12"
              >
                Sair
              </Button>
            ) : null}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderDrawer;
