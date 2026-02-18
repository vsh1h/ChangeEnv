# Sequence Diagram – Marketplace Transaction Flow

## Overview

This sequence diagram represents the end-to-end flow of a Green Credit marketplace transaction between a User (Seller) and a Business (Buyer).

The flow demonstrates:

- Order creation
- Wallet validation
- Credit transfer
- Transaction logging
- Certificate generation
- Order lifecycle transition

---

```mermaid
sequenceDiagram
    actor User
    actor Business
    participant MarketplaceController
    participant MarketplaceService
    participant WalletService
    participant OrderRepository
    participant WalletRepository
    participant CertificateService

    %% Step 1: User lists credits for sale
    User ->> MarketplaceController: Create Sell Order
    MarketplaceController ->> MarketplaceService: createOrder(userId, creditAmount)
    MarketplaceService ->> WalletService: validateBalance(userId, creditAmount)
    WalletService -->> MarketplaceService: Balance Valid
    MarketplaceService ->> OrderRepository: Save Order (State: Created)
    OrderRepository -->> MarketplaceService: Order Saved
    MarketplaceService -->> MarketplaceController: Order Created

    %% Step 2: Business purchases credits
    Business ->> MarketplaceController: Purchase Credits (orderId)
    MarketplaceController ->> MarketplaceService: executeOrder(orderId)

    %% Step 3: Atomic Transaction Begins
    MarketplaceService ->> WalletService: debitCredits(userId, amount)
    MarketplaceService ->> WalletService: creditCredits(businessId, amount)

    MarketplaceService ->> WalletRepository: Update Wallets
    MarketplaceService ->> OrderRepository: Update Order (State: Completed)

    %% Step 4: Generate Offset Certificate
    MarketplaceService ->> CertificateService: generateCertificate(orderId)
    CertificateService -->> MarketplaceService: Certificate Generated

    %% Step 5: Transaction Confirmation
    MarketplaceService -->> MarketplaceController: Transaction Successful
    MarketplaceController -->> Business: Purchase Confirmation
    MarketplaceController -->> User: Credits Sold Successfully
