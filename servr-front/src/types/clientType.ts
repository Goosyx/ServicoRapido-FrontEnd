export type ClientReq = {
  name: string;
  email: string;
  password: string;
  confirmEmail?: string;
  confirmPassword?: string;
};

export type ClientRes = {
  id: string;
  name: string;
  email: string;

  createdAt: string;
  updatedAt: string;
};

export type UpdateClientReq = {
  name: string;
  email: string;
};
