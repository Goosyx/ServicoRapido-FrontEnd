import { UpdateUserReq, UserReq } from "@/types/userType";
import { api } from "./api";
import { getUserId } from "./auth";

export const createUser = async (user: UserReq) => {
  const response = await api.post("/user", user);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get(`/user/${getUserId()}`);
  return response.data;
};

export const updateMe = async (user: UpdateUserReq) => {
  const response = await api.put(`/user/${getUserId()}`, user);
  return response.data;
};
