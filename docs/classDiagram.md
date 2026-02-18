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

%% USER CORE (Top Center)
class User {
  +UUID id
  +String name
  +String email
  +Role role
  +login()
}

class Admin {
  +reviewFlaggedAction()
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

User <|-- Admin
User <|-- Organization
User <|-- Business

%% MARKETPLACE (Left Wing)
class MarketplaceOrder {
  +UUID orderId
  +float amount
  +execute()
}

class OrderState {
  <<interface>>
  +handle(order)
}

MarketplaceOrder --> OrderState
OrderState <|.. CreatedState
OrderState <|.. CompletedState
Business "1" -- "*" MarketplaceOrder : buyer
MarketplaceOrder "*" -- "1" User : seller

%% WALLET & TRANSACTIONS (Center Spine)
class Wallet {
  +float balance
  +credit(amount)
}

class Transaction {
  +UUID transactionId
  +float amount
}

User "1" --> "1" Wallet
Wallet "1" --> "*" Transaction

%% ECO ACTIONS & GOVERNANCE (Right Wing)
class EcoAction {
  +UUID actionId
  +calculateImpact()
}

class CarbonStrategy {
  <<interface>>
  +calculateImpact(quantity)
}

EcoAction --> CarbonStrategy
CarbonStrategy <|.. TransportStrategy
CarbonStrategy <|.. EnergyStrategy
User "1" --> "*" EcoAction : logs

class FraudReport {
  +UUID reportId
  +String status
}

EcoAction "1" -- "1" FraudReport
Admin "1" -- "*" FraudReport : reviews