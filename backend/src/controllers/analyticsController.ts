import type { Request, Response } from "express";

import { AnalyticsService } from "../services/AnalyticsService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const getSummary = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await AnalyticsService.getSummary();
  sendSuccess(res, summary);
});
