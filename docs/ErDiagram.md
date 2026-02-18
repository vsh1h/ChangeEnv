# ER Diagram – ChangeEnv

## Overview

This ER diagram represents the database schema for the ChangeEnv – Green Credit Economy Platform.

It models:

- Users and roles
- Wallet and transactions
- Marketplace orders
- Eco actions
- Challenges
- Fraud monitoring

---

```mermaid
erDiagram

USER {
    UUID id PK
    string name
    string email
    string password
    string role
}

WALLET {
    UUID id PK
    UUID user_id FK
    float balance
}

TRANSACTION {
    UUID id PK
    UUID wallet_id FK
    float amount
    string type
    datetime timestamp
}

MARKETPLACE_ORDER {
    UUID id PK
    UUID seller_id FK
    UUID buyer_id FK
    float amount
    string state
    datetime created_at
}

ECO_ACTION {
    UUID id PK
    UUID user_id FK
    string type
    float quantity
    float carbon_impact
    datetime created_at
}

CHALLENGE {
    UUID id PK
    UUID organization_id FK
    string title
    float target_amount
    string status
}

CHALLENGE_PARTICIPATION {
    UUID id PK
    UUID challenge_id FK
    UUID user_id FK
    float progress
}

FRAUD_REPORT {
    UUID id PK
    UUID eco_action_id FK
    UUID reviewed_by FK
    string status
    datetime reviewed_at
}

%% =========================
%% RELATIONSHIPS
%% =========================

USER ||--|| WALLET : owns
WALLET ||--o{ TRANSACTION : records

USER ||--o{ ECO_ACTION : logs
USER ||--o{ MARKETPLACE_ORDER : sells
USER ||--o{ MARKETPLACE_ORDER : buys

USER ||--o{ CHALLENGE : creates
USER ||--o{ CHALLENGE_PARTICIPATION : participates
CHALLENGE ||--o{ CHALLENGE_PARTICIPATION : includes

ECO_ACTION ||--o| FRAUD_REPORT : may_generate
USER ||--o{ FRAUD_REPORT : reviews
