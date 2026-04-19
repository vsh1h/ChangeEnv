import { http } from "./http";
import type { ApiSuccess, LoginResponse } from "@/types/api";

export const authService = {
  async login(email: string, password: string) {
    const response = await http.post<ApiSuccess<LoginResponse>>("/auth/login", {
      email,
      password,
    });

    return response.data.data;
  },

  async signup(name: string, email: string, password: string) {
    const response = await http.post<ApiSuccess<{ message: string }>>(
      "/auth/signup",
      {
        name,
        email,
        password,
      }
    );

    return response.data.data;
  },
};
