import { EcoActionRepository } from "../repositories/EcoActionRepository.js";
import { FraudRepository } from "../repositories/FraudRepository.js";
import { AppError } from "../utils/AppError.js";

export type FraudDecision = "APPROVED" | "REJECTED";

export class FraudService {
  static async flagFraud(ecoActionId: string, reportedBy: string, reason: string) {
    if (!ecoActionId || !reportedBy || !reason) {
      throw new AppError("Invalid fraud report input", 400);
    }

    const ecoAction = await EcoActionRepository.findById(ecoActionId);

    if (!ecoAction) {
      throw new AppError("Eco action not found", 404);
    }

    return FraudRepository.create(ecoActionId, reportedBy, "FLAGGED", reason);
  }

  static async reviewFraudReport(
    reportId: string,
    adminId: string,
    decision: FraudDecision,
    reason?: string
  ) {
    if (!reportId || !adminId || !decision) {
      throw new AppError("Invalid review input", 400);
    }

    const report = await FraudRepository.findById(reportId);

    if (!report || report.status === "APPROVED" || report.status === "REJECTED") {
      throw new AppError("Invalid report", 400);
    }

    const updatedReport = await FraudRepository.review(
      reportId,
      adminId,
      decision,
      reason ?? report.reason,
      new Date()
    );

    if (decision === "REJECTED") {
      await EcoActionRepository.reject(report.ecoActionId);
    }

    return updatedReport;
  }
}
