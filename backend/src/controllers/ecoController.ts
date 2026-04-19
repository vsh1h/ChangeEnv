import type { Request, Response } from "express";

import { parseCreateEcoActionDto, parseIdParamDto } from "../dto/validators.js";
import { EcoService } from "../services/EcoService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const createAction = asyncHandler(async (req: Request, res: Response) => {
  const { userId, type, quantity } = parseCreateEcoActionDto(req.body);

  const action = await EcoService.createAction(userId, type, quantity);
  sendSuccess(res, action, 201);
});

export const approveAction = asyncHandler(async (req: Request, res: Response) => {
  const actionId = parseIdParamDto(req.params.id, "Action id");

  const credits = await EcoService.approveAction(actionId);
  sendSuccess(res, { credits });
});