import { ClientRes } from "@/types/clientType";
import { UserRes } from "@/types/userType";
import { clearCookie } from "@/utils/cookies";
import { create } from "zustand";
import useCart from "./useCart";

type Logged = {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  isClient: boolean;
  setIsClient: (isClient: boolean) => void;
  client: ClientRes;
  setClient: (client: ClientRes) => void;
  logout: () => Promise<void>;
  user: UserRes;
  setUser: (user: UserRes) => void;
  storeId: string;
  setStoreId: (storeId: string) => void;
};

const useLogged = create<Logged>()((set) => ({
  logged: false,
  setLogged: (logged) => set({ logged }),
  isClient: false,
  setIsClient: (isClient) => set({ isClient }),
  client: {} as ClientRes,
  setClient: (client) => set({ client }),
  logout: async () => {
    if (typeof window !== "undefined") {
      await clearCookie("@servrpd:token");
      await clearCookie("@servrpd:clientToken");
      localStorage.removeItem("@servrpd:user");
      localStorage.removeItem("@servrpd:address");
      useCart.setState({ products: [], cartId: "" });
      useCart.getState().clearStorage();
    }
    set({
      logged: false,
      isClient: false,
      client: {} as ClientRes,
      user: {} as UserRes,
    });
  },
  user: {} as UserRes,
  setUser: (user) => set({ user }),
  storeId: "",
  setStoreId: (storeId) => set({ storeId }),
}));

export default useLogged;
