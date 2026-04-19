import { getDbClient } from "./dbClient.js";

export class FraudRepository {
  static async create(ecoActionId: string, reviewedBy: string, status: string, reason: string) {
    return getDbClient().fraudReport.create({
      data: {
        ecoActionId,
        reviewedBy,
        status,
        reason,
      },
    });
  }

  static async findById(id: string) {
    return getDbClient().fraudReport.findUnique({
      where: { id },
    });
  }

  static async review(
    id: string,
    reviewedBy: string,
    status: string,
    reason: string,
    reviewedAt: Date
  ) {
    return getDbClient().fraudReport.update({
      where: { id },
      data: {
        reviewedBy,
        status,
        reason,
        reviewedAt,
      },
    });
  }

  static async countFlagged() {
    return getDbClient().fraudReport.count({
      where: {
        status: "FLAGGED",
      },
    });
  }
}
