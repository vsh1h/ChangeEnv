import type { MarketplaceOrderData, OrderState, OrderStatus } from "./OrderState.js";

export class CompletedState implements OrderState {
  handle(order: MarketplaceOrderData) {
    return { ...order, state: "COMPLETED" as OrderStatus };
  }
}
