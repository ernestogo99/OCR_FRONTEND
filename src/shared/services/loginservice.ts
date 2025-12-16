import type { IuserRequest } from "../interfaces";
import type { IloginResponse } from "../interfaces/login";
import { api } from "./axiosconfig/config";

const login = async (
  request: IuserRequest
): Promise<IloginResponse | Error> => {
  try {
    const { data } = await api.post("/auth", request);
    if (data) {
      return data;
    }
    throw new Error("Erro durante o login");
  } catch (error: any) {
    const message = error.response?.data?.message || "Erro durante o login.";
    return new Error(message);
  }
};

export const loginService = {
  login,
};
