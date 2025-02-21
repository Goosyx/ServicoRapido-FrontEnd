import { UserRes } from "./userType";

export type StoreReq = {
  name: string;
};

export type StoreRes = {
  id: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  user?: UserRes;
};
