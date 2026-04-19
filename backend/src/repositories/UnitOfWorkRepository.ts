import type { Prisma } from "@prisma/client";

import { prisma } from "../utils/prisma.js";

export class UnitOfWorkRepository {
  static async runInTransaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>
  ) {
    return prisma.$transaction((tx) => callback(tx));
  }
}
