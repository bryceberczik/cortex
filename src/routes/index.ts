import { Router, Request, Response } from "express";
import adminRoutes from "./admin/index";
import apiRoutes from "./api/index";
import authRoutes from "./authRoutes";

const router = Router();

// TODO: Add admin route security.

router.use("/admin", adminRoutes);
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.use("/health", (_req: Request, res: Response) => res.sendStatus(200));

export default router;
