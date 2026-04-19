import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/AppError.js";
import { getJwtSecret } from "../utils/env.js";

const JWT_SECRET = getJwtSecret();

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      sub?: string;
      role?: string;
      email?: string;
    };

    if (!payload.sub || !payload.role || !payload.email) {
      return next(new AppError("Unauthorized", 401));
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
    };

    return next();
  } catch {
    return next(new AppError("Unauthorized", 401));
  }
};
