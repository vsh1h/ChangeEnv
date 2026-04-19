import { AppError } from "../utils/AppError.js";

const requireNonEmptyString = (value: unknown, fieldName: string) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError(`${fieldName} is required`, 400);
  }

  return value.trim();
};

const requirePositiveNumber = (value: unknown, fieldName: string) => {
  if (typeof value !== "number" || Number.isNaN(value) || value <= 0) {
    throw new AppError(`${fieldName} must be a positive number`, 400);
  }

  return value;
};

export const parseLoginDto = (body: unknown) => {
  const input = (body ?? {}) as Record<string, unknown>;

  return {
    email: requireNonEmptyString(input.email, "Email"),
    password: requireNonEmptyString(input.password, "Password"),
  };
};

export const parseCreateEcoActionDto = (body: unknown) => {
  const input = (body ?? {}) as Record<string, unknown>;

  return {
    userId: requireNonEmptyString(input.userId, "User id"),
    type: requireNonEmptyString(input.type, "Type"),
    quantity: requirePositiveNumber(input.quantity, "Quantity"),
  };
};

export const parseIdParamDto = (value: unknown, fieldName = "Id") => {
  return requireNonEmptyString(value, fieldName);
};

export const parseFlagFraudDto = (body: unknown) => {
  const input = (body ?? {}) as Record<string, unknown>;

  return {
    ecoActionId: requireNonEmptyString(input.ecoActionId, "Eco action id"),
    reason: requireNonEmptyString(input.reason, "Reason"),
  };
};

export const parseReviewFraudDto = (body: unknown) => {
  const input = (body ?? {}) as Record<string, unknown>;
  const decision = requireNonEmptyString(input.decision, "Decision").toUpperCase();

  if (decision !== "APPROVED" && decision !== "REJECTED") {
    throw new AppError("Decision must be APPROVED or REJECTED", 400);
  }

  const reason = input.reason;

  return {
    decision,
    reason: typeof reason === "string" ? reason.trim() : undefined,
  } as {
    decision: "APPROVED" | "REJECTED";
    reason?: string;
  };
};
