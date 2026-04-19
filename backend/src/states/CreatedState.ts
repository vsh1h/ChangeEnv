import type { MarketplaceOrderData, OrderState, OrderStatus } from "./OrderState.js";

export class CreatedState implements OrderState {
  handle(order: MarketplaceOrderData) {
    return { ...order, state: "CREATED" as OrderStatus };
  }
}
