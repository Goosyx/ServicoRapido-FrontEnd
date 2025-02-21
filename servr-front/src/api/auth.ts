import { authClientRes, authreq, authres } from "@/types/auth";
import { api } from "./api";

export const authUser = async (user: authreq): Promise<authres> => {
  const response = await api.post("/auth", user);
  return response.data;
};

export const authClient = async (client: authreq): Promise<authClientRes> => {
  const response = await api.post("/auth/client", client);
  return response.data;
};

export const verifyComplete = (atualRoute: string, goToAtual?: boolean) => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("@servrpd:user") &&
      (!localStorage.getItem("@servrpd:address") ||
        localStorage.getItem("@servrpd:address") === "[]")
    ) {
      return "/continue";
    } else if (!localStorage.getItem("@servrpd:user")) {
      return goToAtual ? atualRoute : "/";
    }
  }
  return atualRoute;
};

export const getUserId = () => {
  const user = localStorage.getItem("@servrpd:user");
  return user ? JSON.parse(user).id : null;
};

export const getClientId = () => {
  const client = localStorage.getItem("@servrpd:client");
  return client ? JSON.parse(client).id : null;
};
