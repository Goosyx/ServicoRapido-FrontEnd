import { StoreReq, StoreRes } from "../types/storeType";
import { api } from "./api"
import { getUserId } from "./auth"

export const getMyStore = async () => {
  const response = await api.get(`store/user/${getUserId()}`);
  return response.data;
}

export const updateMyStore = async (store: StoreReq) => {
  const response = await api.put(`store/user/${getUserId()}`, store);
  return response.data;
}

export const getStores = async (): Promise<StoreRes[]> => {
  const response = await api.get(`store`);
  return response.data;
}

export const getStore = async (id: string) => {
  const response = await api.get(`store/user/${id}`);
  return response.data;
}