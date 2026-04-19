import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    logger.warn("Handled application error", {
      message: error.message,
      statusCode: error.statusCode,
      path: _req.originalUrl,
      method: _req.method,
    });

    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }

  logger.error("Unhandled error", {
    message: error.message,
    stack: error.stack,
    path: _req.originalUrl,
    method: _req.method,
  });

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};
