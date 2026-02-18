# Class Diagram – ChangeEnv

## Overview

This class diagram represents the core domain model of the ChangeEnv – Green Credit Economy Platform.

It demonstrates:

- Inheritance (User hierarchy)
- Composition (Wallet & Transactions)
- Strategy Pattern (Carbon Calculation)
- State Pattern (Marketplace Order Lifecycle)
- Core entity relationships

---

```mermaid
classDiagram
direction TB

%% ---------------------------------------------------------
%% 1. USER HIERARCHY (Top Center)
%% ---------------------------------------------------------
class User {
  +UUID id
  +String name
  +String email
  +String password
  +Role role
  +login()
  +logout()
}

class Admin {
  +reviewFlaggedAction()
  +approveAction()
  +rejectAction()
  +manageUsers()
}

class Organization {
  +createChallenge()
  +manageChallenge()
}

class Business {
  +purchaseCredits()
  +viewCertificates()
}

%% Inheritance stems from a single point to reduce lines
User <|-- Admin
User <|-- Organization
User <|-- Business

%% ---------------------------------------------------------
%% 2. WALLET SYSTEM (Direct Vertical Flow)
%% ---------------------------------------------------------
class Wallet {
  +float balance
  +credit(amount)
  +debit(amount)
  +getTransactionHistory()
}

class Transaction {
  +UUID transactionId
  +float amount
  +String type
  +DateTime timestamp
}

User "1" --> "1" Wallet : has
Wallet "1" --> "*" Transaction : logs

%% ---------------------------------------------------------
%% 3. MARKETPLACE ISLAND (Left Side)
%% ---------------------------------------------------------
class MarketplaceOrder {
  +UUID orderId
  +float amount
  +OrderState state
  +execute()
  +cancel()
  +setState(state)
}

class OrderState {
  <<interface>>
  +handle(order: MarketplaceOrder)
}

OrderState <|.. CreatedState
OrderState <|.. CompletedState
OrderState <|.. CancelledState

MarketplaceOrder --> OrderState
%% Buyer and Seller links grouped to the left
Business "1" -- "*" MarketplaceOrder : buyer
MarketplaceOrder "*" -- "1" User : seller

%% ---------------------------------------------------------
%% 4. ECO-ACTION & GOVERNANCE (Right Side)
%% ---------------------------------------------------------
class EcoAction {
  +UUID actionId
  +String type
  +float quantity
  +CarbonStrategy strategy
  +calculateImpact()
}

class CarbonStrategy {
  <<interface>>
  +calculateImpact(quantity: float)
}

CarbonStrategy <|.. TransportStrategy
CarbonStrategy <|.. EnergyStrategy
CarbonStrategy <|.. TreePlantStrategy

EcoAction --> CarbonStrategy
User "1" --> "*" EcoAction : logs

class FraudReport {
  +UUID reportId
  +String status
  +review()
}

EcoAction "1" -- "1" FraudReport : generates
Admin "1" -- "*" FraudReport : reviews

%% ---------------------------------------------------------
%% 5. CHALLENGE SYSTEM (Bottom)
%% ---------------------------------------------------------
class Challenge {
  +UUID challengeId
  +String title
  +float targetAmount
  +String status
  +addParticipant()
  +calculateProgress()
}

Organization "1" -- "*" Challenge : sponsors
User "*" -- "*" Challenge : participates