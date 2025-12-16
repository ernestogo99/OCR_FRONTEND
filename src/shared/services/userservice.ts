import type { Iuser, IuserRequest } from "../interfaces";
import { api } from "./axiosconfig/config";

const createUser = async (request: IuserRequest): Promise<Iuser | Error> => {
  try {
    const { data } = await api.post("/users", request);
    if (data) {
      return data;
    }
    throw new Error("Erro durante a criação de usuário");
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro durante a criação de usuário.";
    return new Error(message);
  }
};

export const userService = {
  createUser,
};
