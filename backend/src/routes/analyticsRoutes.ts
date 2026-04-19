import { Router } from "express";

import { getSummary } from "../controllers/analyticsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/summary", authMiddleware, roleMiddleware(["ADMIN"]), getSummary);

export default router;
