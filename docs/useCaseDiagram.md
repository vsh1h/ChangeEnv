# Use Case Diagram – ChangeEnv

## Overview

This use case diagram illustrates the interactions between system actors and the ChangeEnv – Green Credit Economy Platform.

The platform supports four primary actors:

- User  
- Organization  
- Business  
- Admin  

---

```mermaid
flowchart LR

%% Actors
User((User))
Organization((Organization))
Business((Business))
Admin((Admin))

%% System Boundary
subgraph ChangeEnv_System

%% User Use Cases
subgraph User_Functions
UC1([Register / Login])
UC2([Log Eco Action])
UC3([View Carbon Impact])
UC4([Manage Wallet])
UC5([Sell Green Credits])
UC6([Redeem Credits])
UC7([Participate in Challenge])
UC8([View Transaction History])
end

%% Organization Use Cases
subgraph Organization_Functions
OC1([Create Challenge])
OC2([Manage Challenge])
OC3([View Challenge Analytics])
end

%% Business Use Cases
subgraph Business_Functions
BC1([Purchase Green Credits])
BC2([Generate Offset Certificate])
BC3([View Purchase History])
end

%% Admin Use Cases
subgraph Admin_Functions
AC1([Review Flagged Actions])
AC2([Approve / Reject Action])
AC3([Manage Users])
AC4([Monitor Platform Analytics])
end

end

%% Connections
User --> UC1
User --> UC2
User --> UC3
User --> UC4
User --> UC5
User --> UC6
User --> UC7
User --> UC8

Organization --> OC1
Organization --> OC2
Organization --> OC3

Business --> BC1
Business --> BC2
Business --> BC3

Admin --> AC1
Admin --> AC2
Admin --> AC3
Admin --> AC4
