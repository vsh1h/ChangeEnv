export type OrderStatus = "CREATED" | "COMPLETED" | "CANCELLED";

export interface MarketplaceOrderData {
  id?: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  state: OrderStatus;
}

export interface OrderState {
  // State pattern transition hook for marketplace order lifecycle.
  handle(order: MarketplaceOrderData): MarketplaceOrderData;
}
