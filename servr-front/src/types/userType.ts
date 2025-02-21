export type UserReq = {
  name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  userType: string;
  confirmEmail?: string;
  confirmPassword?: string;
};

export type UserRes = {
  id: string;
  name: string;
  email: string;
  // password: string;
  cpf?: string;
  cnpj?: string;
  userType: string;

  createdAt: string;
  updatedAt: string;
};

export type UpdateUserReq = {
  name: string;
  email: string;
};
