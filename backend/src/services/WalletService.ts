import { TransactionType } from "@prisma/client";

import { TransactionRepository } from "../repositories/TransactionRepository.js";
import { UnitOfWorkRepository } from "../repositories/UnitOfWorkRepository.js";
import { WalletRepository } from "../repositories/WalletRepository.js";
import { AppError } from "../utils/AppError.js";

export class WalletService {
  static async getWallet(userId: string) {
    if (!userId) {
      throw new AppError("User id is required", 400);
    }

    return WalletRepository.getOrCreateByUserId(userId);
  }

  static async credit(userId: string, amount: number) {
    if (!userId) {
      throw new AppError("User id is required", 400);
    }

    if (amount <= 0) {
      throw new AppError("Invalid amount", 400);
    }

    return UnitOfWorkRepository.runInTransaction(async (tx) => {
      const wallet = await WalletRepository.getOrCreateByUserId(userId, tx);

      const updatedWallet = await WalletRepository.incrementBalance(wallet.id, amount, tx);

      await TransactionRepository.create(wallet.id, amount, TransactionType.EARN, tx);

      return updatedWallet;
    });
  }

  static async debit(userId: string, amount: number) {
    if (!userId) {
      throw new AppError("User id is required", 400);
    }

    if (amount <= 0) {
      throw new AppError("Invalid amount", 400);
    }

    return UnitOfWorkRepository.runInTransaction(async (tx) => {
      const wallet = await WalletRepository.getOrCreateByUserId(userId, tx);

      const result = await WalletRepository.decrementBalanceIfSufficient(wallet.id, amount, tx);

      if (result.count === 0) {
        throw new AppError("Insufficient balance", 400);
      }

      const updatedWallet = await WalletRepository.getOrCreateByUserId(userId, tx);

      await TransactionRepository.create(wallet.id, amount, TransactionType.SPEND, tx);

      return updatedWallet;
    });
  }
}