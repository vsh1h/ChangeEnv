import { getDbClient } from "./dbClient.js";

export class AnalyticsRepository {
  static async totalCredits() {
    const result = await getDbClient().transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "EARN",
      },
    });

    return result._sum.amount ?? 0;
  }
}
