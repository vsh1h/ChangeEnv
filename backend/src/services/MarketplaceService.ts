import { TransactionType } from "@prisma/client";

import { MarketplaceOrderRepository } from "../repositories/MarketplaceOrderRepository.js";
import { TransactionRepository } from "../repositories/TransactionRepository.js";
import { UnitOfWorkRepository } from "../repositories/UnitOfWorkRepository.js";
import { WalletRepository } from "../repositories/WalletRepository.js";
import { AppError } from "../utils/AppError.js";
import { CancelledState } from "../states/CancelledState.js";
import { CompletedState } from "../states/CompletedState.js";
import { CreatedState } from "../states/CreatedState.js";

export class MarketplaceService {
  private static generateCertificate(orderId: string) {
    return `CERT-${orderId}`;
  }

  static async createOrder(sellerId: string, buyerId: string, amount: number) {
    if (!sellerId || !buyerId) {
      throw new AppError("Seller and buyer are required", 400);
    }

    if (amount <= 0) {
      throw new AppError("Invalid amount", 400);
    }

    const sellerWallet = await WalletRepository.getOrCreateByUserId(sellerId);

    if (sellerWallet.balance < amount) {
      throw new AppError("Insufficient balance", 400);
    }

    // State pattern: order starts in CreatedState before persistence.
    const orderData = new CreatedState().handle({
      sellerId,
      buyerId,
      amount,
      state: "CREATED",
    });

    return MarketplaceOrderRepository.create(
      orderData.sellerId,
      orderData.buyerId,
      orderData.amount,
      orderData.state
    );
  }

  static async executeOrder(orderId: string) {
    if (!orderId) {
      throw new AppError("Order id is required", 400);
    }

    const order = await MarketplaceOrderRepository.findById(orderId);

    if (!order || order.state !== "CREATED") {
      throw new AppError("Invalid order", 400);
    }

    const updatedOrder = await UnitOfWorkRepository.runInTransaction(async (tx) => {
      const sellerWallet = await WalletRepository.getOrCreateByUserId(order.sellerId, tx);
      const buyerWallet = await WalletRepository.getOrCreateByUserId(order.buyerId, tx);

      const debitResult = await WalletRepository.decrementBalanceIfSufficient(
        sellerWallet.id,
        order.amount,
        tx
      );

      if (debitResult.count === 0) {
        throw new AppError("Insufficient balance", 400);
      }

      await WalletRepository.incrementBalance(buyerWallet.id, order.amount, tx);

      await TransactionRepository.create(sellerWallet.id, order.amount, TransactionType.SELL, tx);
      await TransactionRepository.create(buyerWallet.id, order.amount, TransactionType.EARN, tx);

      return MarketplaceOrderRepository.updateState(orderId, "COMPLETED", tx);
    });

    // State pattern transition: Created -> Completed.
    const completedOrder = new CompletedState().handle({
      id: updatedOrder.id,
      sellerId: updatedOrder.sellerId,
      buyerId: updatedOrder.buyerId,
      amount: updatedOrder.amount,
      state: "COMPLETED",
    });

    return {
      order: {
        ...updatedOrder,
        state: completedOrder.state,
      },
      certificateId: this.generateCertificate(updatedOrder.id),
    };
  }

  static async cancelOrder(orderId: string) {
    if (!orderId) {
      throw new AppError("Order id is required", 400);
    }

    const order = await MarketplaceOrderRepository.findById(orderId);

    if (!order || order.state !== "CREATED") {
      throw new AppError("Invalid order", 400);
    }

    // State pattern transition: Created -> Cancelled.
    const cancelledOrder = new CancelledState().handle({
      id: order.id,
      sellerId: order.sellerId,
      buyerId: order.buyerId,
      amount: order.amount,
      state: "CANCELLED",
    });

    return MarketplaceOrderRepository.updateState(orderId, cancelledOrder.state);
  }
}
