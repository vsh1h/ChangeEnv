export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface EcoAction {
  id: string;
  userId: string;
  type: string;
  quantity: number;
  carbonImpact: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: "EARN" | "SPEND" | "SELL";
  timestamp: string;
}

export interface MarketplaceOrder {
  id: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  state: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalCredits: number;
  totalActions: number;
  flaggedCount: number;
}
