import type { Request, Response } from "express";

import { parseFlagFraudDto, parseIdParamDto, parseReviewFraudDto } from "../dto/validators.js";
import { FraudService } from "../services/FraudService.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const flagFraud = asyncHandler(async (req: Request, res: Response) => {
  const { ecoActionId, reason } = parseFlagFraudDto(req.body);

  if (!req.user) {
    throw new AppError("Invalid fraud input", 400);
  }

  const report = await FraudService.flagFraud(ecoActionId, req.user.id, reason);
  sendSuccess(res, report, 201);
});

export const reviewFraud = asyncHandler(async (req: Request, res: Response) => {
  const reportId = parseIdParamDto(req.params.id, "Report id");
  const { decision, reason } = parseReviewFraudDto(req.body);

  if (!req.user) {
    throw new AppError("Invalid review input", 400);
  }

  const report = await FraudService.reviewFraudReport(
    reportId,
    req.user.id,
    decision,
    reason
  );

  sendSuccess(res, report);
});
