import type { MarketplaceOrderData, OrderState, OrderStatus } from "./OrderState.js";

export class CancelledState implements OrderState {
  handle(order: MarketplaceOrderData) {
    return { ...order, state: "CANCELLED" as OrderStatus };
  }
}
