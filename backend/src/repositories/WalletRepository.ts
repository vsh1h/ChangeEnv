import type { Prisma } from "@prisma/client";

import { getDbClient } from "./dbClient.js";

export class WalletRepository {
  static async getOrCreateByUserId(userId: string, tx?: Prisma.TransactionClient) {
    return getDbClient(tx).wallet.upsert({
      where: { userId },
      update: {},
      create: { userId, balance: 0 },
    });
  }

  static async incrementBalance(
    walletId: string,
    amount: number,
    tx?: Prisma.TransactionClient
  ) {
    return getDbClient(tx).wallet.update({
      where: { id: walletId },
      data: { balance: { increment: amount } },
    });
  }

  static async decrementBalanceIfSufficient(
    walletId: string,
    amount: number,
    tx?: Prisma.TransactionClient
  ) {
    return getDbClient(tx).wallet.updateMany({
      where: {
        id: walletId,
        balance: { gte: amount },
      },
      data: {
        balance: { decrement: amount },
      },
    });
  }
}
