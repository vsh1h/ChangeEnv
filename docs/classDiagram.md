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

%% =====================================================
%% USER CORE (TOP CENTER)
%% =====================================================

class User {
  +UUID id
  +String name
  +String email
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

User <|-- Admin
User <|-- Organization
User <|-- Business


%% =====================================================
%% WALLET & TRANSACTIONS (CENTER SPINE)
%% =====================================================

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

User "1" --> "1" Wallet
Wallet "1" --> "*" Transaction


%% =====================================================
%% MARKETPLACE MODULE (LEFT WING – STATE PATTERN)
%% =====================================================

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
  +handle(order)
}

class CreatedState {
  +handle(order)
}

class CompletedState {
  +handle(order)
}

class CancelledState {
  +handle(order)
}

MarketplaceOrder --> OrderState
OrderState <|.. CreatedState
OrderState <|.. CompletedState
OrderState <|.. CancelledState

Business "1" -- "*" MarketplaceOrder : buyer
MarketplaceOrder "*" -- "1" User : seller


%% =====================================================
%% ECO ACTION MODULE (RIGHT WING – STRATEGY PATTERN)
%% =====================================================

class EcoAction {
  +UUID actionId
  +String type
  +float quantity
  +CarbonStrategy strategy
  +calculateImpact()
}

class CarbonStrategy {
  <<interface>>
  +calculateImpact(quantity)
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

EcoAction --> CarbonStrategy
CarbonStrategy <|.. TransportStrategy
CarbonStrategy <|.. EnergyStrategy
CarbonStrategy <|.. TreePlantStrategy

User "1" --> "*" EcoAction : logs


%% =====================================================
%% GOVERNANCE (BOTTOM RIGHT)
%% =====================================================

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

Organization "1" --> "*" Challenge : creates
User "1" --> "*" Challenge : participates

EcoAction "1" --> "0..1" FraudReport : may_generate
Admin "1" --> "*" FraudReport : reviews
