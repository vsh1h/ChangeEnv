import { AnalyticsRepository } from "../repositories/AnalyticsRepository.js";
import { EcoActionRepository } from "../repositories/EcoActionRepository.js";
import { FraudRepository } from "../repositories/FraudRepository.js";

export class AnalyticsService {
  static async getSummary() {
    const [totalCredits, totalActions, flaggedCount] = await Promise.all([
      AnalyticsRepository.totalCredits(),
      EcoActionRepository.countAll(),
      FraudRepository.countFlagged(),
    ]);

    return {
      totalCredits,
      totalActions,
      flaggedCount,
    };
  }
}
