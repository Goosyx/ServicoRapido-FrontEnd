import { ProductRes } from "./productType";

export type cartItemRes = {
  id: string;
  quantity: number;

  cartId: string;

  productId: string;
  product?: ProductRes;

  productColor?: string;
  productSize?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type cartItemReq = {
  quantity: number;
  productColor?: string;
  productSize?: string;
  productId: string;
  cartId: string;
};
