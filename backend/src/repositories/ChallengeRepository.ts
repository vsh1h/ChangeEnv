import { getDbClient } from "./dbClient.js";

export class ChallengeRepository {
  static async create(organizationId: string, title: string, targetAmount: number) {
    return getDbClient().challenge.create({
      data: {
        organizationId,
        title,
        targetAmount,
        status: "ACTIVE",
      },
    });
  }

  static async findById(id: string) {
    return getDbClient().challenge.findUnique({
      where: { id },
    });
  }

  static async updateStatus(id: string, status: string) {
    return getDbClient().challenge.update({
      where: { id },
      data: { status },
    });
  }
}
