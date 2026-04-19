import { http } from "./http";
import type { AnalyticsSummary, ApiSuccess } from "@/types/api";

export const analyticsService = {
  async getSummary() {
    const response = await http.get<ApiSuccess<AnalyticsSummary>>("/analytics/summary");
    return response.data.data;
  },
};
