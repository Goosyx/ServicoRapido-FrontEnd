import { api } from "./api";
import { getClientId } from "./auth";
import { ClientReq, UpdateClientReq } from "@/types/clientType";

export const createClient = async (client: ClientReq) => {
  const response = await api.post("/client", client);
  return response.data;
};

export const getClient = async () => {
  const response = await api.get(`/client/${getClientId()}`);
  return response.data;
};

export const updateMe = async (user: UpdateClientReq) => {
  const response = await api.put(`/user/${getClientId()}`, user);
  return response.data;
};
