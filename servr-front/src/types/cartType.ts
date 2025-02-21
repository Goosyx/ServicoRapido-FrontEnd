import { cartItemRes } from "./cartItemType";
import { ClientRes } from "./clientType";

export type cartRes = {
  id: string;

  clientId: string;
  client?: ClientRes;

  cartItems?: cartItemRes[];

  createdAt?: Date;
  updatedAt?: Date;
};
