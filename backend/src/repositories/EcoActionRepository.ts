import { EcoActionStatus } from "@prisma/client";

import { getDbClient } from "./dbClient.js";

export class EcoActionRepository {
  static async create(userId: string, type: string, quantity: number) {
    return getDbClient().ecoAction.create({
      data: {
        userId,
        type,
        quantity,
      },
    });
  }

  static async findById(id: string) {
    return getDbClient().ecoAction.findUnique({
      where: { id },
    });
  }

  static async approveIfPending(id: string, carbonImpact: number) {
    return getDbClient().ecoAction.updateMany({
      where: {
        id,
        status: EcoActionStatus.PENDING,
      },
      data: {
        status: EcoActionStatus.APPROVED,
        carbonImpact,
      },
    });
  }

  static async reject(id: string) {
    return getDbClient().ecoAction.update({
      where: { id },
      data: { status: EcoActionStatus.REJECTED },
    });
  }

  static async countAll() {
    return getDbClient().ecoAction.count();
  }
}
