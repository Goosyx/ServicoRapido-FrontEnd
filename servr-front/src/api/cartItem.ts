import { cartItemReq } from "@/types/cartItemType";
import { api } from "./api";

export const createCartItem = async (cartItem: cartItemReq) => {
  const response = await api.post("/cartItem", cartItem);
  return response.data;
};

export const deleteCartItem = async (cartItemId: string) => {
  await api.delete(`/cartItem/${cartItemId}`);
};

export const updateCartItem = async ({
  cartItemId,
  cartItem,
}: {
  cartItemId: string;
  cartItem: cartItemReq;
}) => {
  const response = await api.put(`/cartItem/${cartItemId}`, cartItem);
  return response.data;
};
