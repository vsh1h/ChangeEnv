import { Router } from "express";

import { reviewFraud, flagFraud } from "../controllers/fraudController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/flag", authMiddleware, flagFraud);
router.patch("/review/:id", authMiddleware, roleMiddleware(["ADMIN"]), reviewFraud);

export default router;
