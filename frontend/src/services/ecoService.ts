import { http } from "./http";
import type { ApiSuccess, EcoAction } from "@/types/api";

export const ecoService = {
  async createAction(userId: string, type: string, quantity: number) {
    const response = await http.post<ApiSuccess<EcoAction>>("/eco-actions", {
      userId,
      type,
      quantity,
    });

    return response.data.data;
  },

  async approveAction(id: string) {
    const response = await http.post<ApiSuccess<{ credits: number }>>(
      `/eco-actions/approve/${id}`
    );

    return response.data.data;
  },

  async listActions() {
    const response = await http.get<ApiSuccess<EcoAction[]>>("/eco-actions");
    return response.data.data;
  },
};
