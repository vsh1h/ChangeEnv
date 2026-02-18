# Class Diagram – ChangeEnv

## Overview

This class diagram represents the core domain model of the ChangeEnv – Green Credit Economy Platform.

It demonstrates:

- Entity relationships
- OOP principles
- Strategy Pattern (Carbon Calculation)
- State Pattern (Marketplace Order Lifecycle)

---

```mermaid
classDiagram

%% =========================
%% Core User Hierarchy
%% =========================

class User {
  +id: UUID
  +name: String
  +email: String
  +password: String
  +role: Role
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
%% Wallet System
%% =========================

class Wallet {
  +balance: float
  +debit(amount)
  +credit(amount)
}

class Transaction {
  +transactionId: UUID
  +amount: float
  +type: String
  +timestamp: DateTime
}

User "1" --> "1" Wallet
Wallet "1" --> "*" Transaction

%% =========================
%% Marketplace Module
%% =========================

class MarketplaceOrder {
  +orderId: UUID
  +amount: float
  +state: OrderState
  +execute()
  +cancel()
}

class OrderState {
  <<interface>>
  +handle()
}

class CreatedState
class CompletedState
class CancelledState

OrderState <|.. CreatedS
