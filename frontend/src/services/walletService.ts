import { http } from "./http";
import type { ApiSuccess, Transaction, Wallet } from "@/types/api";

export const walletService = {
  async getWallet() {
    const response = await http.get<ApiSuccess<Wallet>>("/wallet");
    return response.data.data;
  },

  async getTransactions() {
    const response = await http.get<ApiSuccess<Transaction[]>>("/wallet/transactions");
    return response.data.data;
  },
};
