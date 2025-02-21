import { ClientRes } from "./clientType";
import { UserRes } from "./userType";

export type authres = {
  user: UserRes;
  token: string;
  address?: any;
};

export type authClientRes = {
  client: ClientRes;
  token: string;
};

export type authreq = {
  email: string;
  password: string;
};
