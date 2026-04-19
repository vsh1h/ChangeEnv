import type { Prisma, PrismaClient } from "@prisma/client";

import { prisma } from "../utils/prisma.js";

export type DbClient = PrismaClient | Prisma.TransactionClient;

export const getDbClient = (tx?: Prisma.TransactionClient): DbClient => {
  return tx ?? prisma;
};
