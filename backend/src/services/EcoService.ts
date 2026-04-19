import { EcoActionRepository } from "../repositories/EcoActionRepository.js";
import { getStrategy } from "../strategies/factory.js";
import { AppError } from "../utils/AppError.js";
import { WalletService } from "./WalletService.js";

export class EcoService {
  static async createAction(userId: string, type: string, quantity: number) {
    if (!userId || !type || quantity <= 0) {
      throw new AppError("Invalid eco action input", 400);
    }

    return EcoActionRepository.create(userId, type, quantity);
  }

  static async approveAction(actionId: string) {
    if (!actionId) {
      throw new AppError("Action id is required", 400);
    }

    const action = await EcoActionRepository.findById(actionId);

    if (!action || action.status !== "PENDING") {
      throw new AppError("Invalid action", 400);
    }

    // Strategy pattern: choose domain-specific carbon calculation at runtime.
    let credits: number;

    try {
      const strategy = getStrategy(action.type);
      credits = strategy.calculate(action.quantity);
    } catch {
      throw new AppError("Unsupported eco action type", 400);
    }

    const updateResult = await EcoActionRepository.approveIfPending(actionId, credits);

    if (updateResult.count === 0) {
      throw new AppError("Action already processed", 409);
    }

    await WalletService.credit(action.userId, credits);

    return credits;
  }
}