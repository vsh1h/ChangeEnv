import { http } from "./http";
import type { ApiSuccess, MarketplaceOrder } from "@/types/api";

export const marketplaceService = {
  async listOrders() {
    const response = await http.get<ApiSuccess<MarketplaceOrder[]>>("/marketplace/orders");
    return response.data.data;
  },

  async executeOrder(orderId: string) {
    const response = await http.post<ApiSuccess<{ order: MarketplaceOrder }>>(
      `/marketplace/orders/${orderId}/execute`
    );

    return response.data.data;
  },
};
