import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError.js";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    const normalizedUserRole = req.user.role.toUpperCase();
    const normalizedAllowedRoles = allowedRoles.map((role) => role.toUpperCase());

    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
      return next(new AppError("Forbidden", 403));
    }

    return next();
  };
};
