import { Router } from "express";

import { approveAction, createAction } from "../controllers/ecoController.js";

const router = Router();

router.post("/", createAction);
router.post("/approve/:id", approveAction);

export default router;