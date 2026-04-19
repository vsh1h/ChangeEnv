import cors from "cors";
import express from "express";

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { requestLogger } from "./middleware/requestLogger.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import ecoRoutes from "./routes/ecoRoutes.js";
import fraudRoutes from "./routes/fraudRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

app.use("/auth", authRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/eco-actions", ecoRoutes);
app.use("/fraud", fraudRoutes);

app.use(errorMiddleware);

export default app;
