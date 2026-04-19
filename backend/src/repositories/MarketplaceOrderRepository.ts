import type { Prisma } from "@prisma/client";

import { getDbClient } from "./dbClient.js";

export class MarketplaceOrderRepository {
  static async create(
    sellerId: string,
    buyerId: string,
    amount: number,
    state: string,
    tx?: Prisma.TransactionClient
  ) {
    return getDbClient(tx).marketplaceOrder.create({
      data: {
        sellerId,
        buyerId,
        amount,
        state,
      },
    });
  }

  static async findById(id: string) {
    return getDbClient().marketplaceOrder.findUnique({
      where: { id },
    });
  }

  static async updateState(id: string, state: string, tx?: Prisma.TransactionClient) {
    return getDbClient(tx).marketplaceOrder.update({
      where: { id },
      data: { state },
    });
  }
}
