import type { Prisma, TransactionType } from "@prisma/client";

import { getDbClient } from "./dbClient.js";

export class TransactionRepository {
  static async create(
    walletId: string,
    amount: number,
    type: TransactionType,
    tx?: Prisma.TransactionClient
  ) {
    return getDbClient(tx).transaction.create({
      data: {
        walletId,
        amount,
        type,
      },
    });
  }
}
