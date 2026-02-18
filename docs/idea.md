# ChangeEnv – Green Credit Economy Platform

## 1. Project Overview

ChangeEnv is a full-stack Green Credit Economy platform designed to incentivize sustainable behavior through a structured and verifiable carbon credit system.

The platform allows users to log eco-friendly actions, calculates their carbon impact using defined strategies, rewards them with Green Credits, and enables a controlled marketplace where businesses can purchase these credits to offset emissions.

Unlike simple sustainability tracking apps, ChangeEnv introduces an economic layer with wallet management, transaction logging, challenge sponsorship, fraud moderation, and lifecycle-based workflows.

The system is backend-focused and built using strong software engineering principles including OOP, clean architecture, service-repository separation, and appropriate design patterns.

---

## 2. Problem Statement

Many sustainability platforms focus only on awareness and tracking. However:

- There is no structured incentive mechanism for individuals.
- Carbon offset systems are mostly enterprise-focused.
- Individuals cannot meaningfully participate in carbon credit ecosystems.
- There is a lack of transparent and structured modeling of eco-actions into measurable economic value.

ChangeEnv addresses this gap by introducing a controlled Green Credit Economy for individuals, organizations, and businesses.

---

## 3. Objectives

- Enable users to log verifiable eco-friendly actions.
- Calculate carbon reduction using structured calculation strategies.
- Reward users with Green Credits.
- Maintain a secure wallet and transaction ledger system.
- Provide a marketplace where businesses can purchase green credits.
- Introduce challenge-based sustainability campaigns.
- Implement fraud detection and admin moderation workflows.
- Follow clean backend architecture and system design principles.

---

## 4. Key Features

### 4.1 Role-Based Access Control (RBAC)

The system supports four roles:

- **User** – Logs eco actions, earns and sells credits.
- **Organization** – Creates sustainability challenges.
- **Business** – Purchases green credits.
- **Admin** – Moderates actions and monitors analytics.

---

### 4.2 Eco Action Logging

Users can log different categories of eco actions such as:

- Transport (cycling, public transport)
- Energy saving
- Tree planting
- Waste reduction

Each action:
- Is processed by a Carbon Calculation Engine.
- Generates a carbon reduction record.
- Issues Green Credits (after validation).
- May be flagged if suspicious.

---

### 4.3 Carbon Calculation Engine

The system uses a Strategy-based calculation model where different action types follow different impact formulas.

Example:
- Transport → Based on distance saved
- Energy → Based on units saved
- Tree planting → Based on estimated absorption

This ensures modular, extensible, and maintainable calculation logic.

---

### 4.4 Green Credit Wallet System

Each user has a digital wallet containing:

- Current credit balance
- Transaction history
- Credit expiry tracking

Transaction types include:
- Earn
- Sell
- Redeem
- Expire

All wallet operations are handled atomically to maintain system consistency.

---

### 4.5 Green Credit Marketplace

Businesses can:

- Purchase Green Credits from users.
- Generate carbon offset certificates.
- Track purchased offset volume.

Marketplace orders follow a structured lifecycle:

Created → Matched → Completed → Cancelled

Credit transfer and order completion are handled through secure transactional logic.

---

### 4.6 Sustainability Challenges

Organizations can:

- Create challenges.
- Define eligibility and reward criteria.
- Track participation.
- Monitor completion statistics.

Challenge lifecycle:

Created → Active → Completed → Expired

---

### 4.7 Fraud Detection & Moderation

The system includes:

- Automatic flagging of abnormal eco action entries.
- Admin review workflow.
- Approval or rejection handling.
- Prevention of illegitimate credit issuance.

Fraud review lifecycle:

Flagged → UnderReview → Approved → Rejected

---

### 4.8 Admin Analytics Dashboard

Admin users can view:

- Total carbon saved
- Total credits issued
- Marketplace volume
- Top contributors
- Flagged activity reports

---

## 5. System Architecture Approach

The backend will follow a layered architecture:

- Controllers (API layer)
- Services (Business logic)
- Repositories (Data access layer)
- Domain models (Core entities)

The project will implement:

- Strategy Pattern (Carbon calculation logic)
- State Pattern (Order & Challenge lifecycle)
- Repository Pattern (Data abstraction)
- Service Layer Pattern (Business logic separation)

OOP principles such as encapsulation, abstraction, inheritance, and polymorphism will be demonstrated throughout the system.

---

## 6. Scope Definition

### 6.1 Current Scope

The current version will implement:

- Eco action logging and validation.
- Carbon impact calculation.
- Green Credit wallet and transaction system.
- Marketplace order flow.
- Sustainability challenges.
- Fraud detection workflow.
- Basic analytics dashboard.

### 6.2 Out of Scope (Initial Version)

The following features are intentionally excluded to maintain controlled scope:

- Real payment gateway integration.
- Blockchain-based carbon tokenization.
- Integration with external carbon certification APIs.
- Geo-location-based action verification.

### 6.3 Future Enhancements

The platform can be extended to include:

- Secure payment integration.
- Blockchain-based credit transparency.
- Certified carbon registry integration.
- Real-time geo-verification.
- AI-driven sustainability recommendations.
- Enterprise ESG reporting tools.

---