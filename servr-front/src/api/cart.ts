import { cartRes } from "@/types/cartType";
import { api } from "./api";

export const getCartByClientId = async (clientId: string): Promise<cartRes> => {
  const response = await api.get(`/cart/client/${clientId}`);
  return response.data;
};
