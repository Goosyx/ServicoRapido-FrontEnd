import { api } from "./api";
import { AddressReq } from "@/types/addressType";

export const createAddress = async (address: AddressReq) => {
  const response = await api.post("/address", address);
  return response.data;
};
