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

%% =========================
%% USER CORE (CENTER)
%% =========================

class User {
  +UUID id
  +String name
  +String email
  +String password
  +Role role
  +login()
  +logout()
}

class Organization {
  +createChallenge()
  +manageChallenge()
}

class Business {
  +purchaseCredits()
  +viewCertificates()
}

class Admin {
  +reviewFlaggedAction()
  +approveAction()
  +rejectAction()
  +manageUsers()
}

User <|-- Organization
User <|-- Business
User <|-- Admin


%% =========================
%% WALLET (DIRECTLY BELOW USER)
%% =========================

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

User --> Wallet
Wallet --> Transaction


%% =========================
%% MARKETPLACE (LEFT SIDE)
%% =========================

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

class CreatedState {
  +handle(order)
  +validateOrder()
}

class CompletedState {
  +handle(order)
  +generateCertificate()
}

class CancelledState {
  +handle(order)
  +refundCredits()
}

OrderState <|.. CreatedState
OrderState <|.. CompletedState
OrderState <|.. CancelledState

MarketplaceOrder --> OrderState
MarketplaceOrder --> User : seller
MarketplaceOrder --> Business : buyer


%% =========================
%% ECO ACTION (RIGHT SIDE)
%% =========================

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

class TransportStrategy {
  +calculateImpact(quantity)
}

class EnergyStrategy {
  +calculateImpact(quantity)
}

class TreePlantStrategy {
  +calculateImpact(quantity)
}

CarbonStrategy <|.. TransportStrategy
CarbonStrategy <|.. EnergyStrategy
CarbonStrategy <|.. TreePlantStrategy

EcoAction --> CarbonStrategy
User --> EcoAction


%% =========================
%% GOVERNANCE (BOTTOM RIGHT)
%% =========================

class Challenge {
  +UUID challengeId
  +String title
  +float targetAmount
  +String status
  +addParticipant()
  +calculateProgress()
}

class FraudReport {
  +UUID reportId
  +String status
  +review()
}

Organization --> Challenge
User --> Challenge
EcoAction --> FraudReport
Admin --> FraudReport
