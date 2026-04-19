import type { Request, Response } from "express";

import { parseLoginDto } from "../dto/validators.js";
import { AuthService } from "../services/AuthService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = parseLoginDto(req.body);

  const result = await AuthService.login(email, password);
  sendSuccess(res, result);
});
