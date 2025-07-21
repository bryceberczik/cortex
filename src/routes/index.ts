import { Router, Request, Response } from "express";
import adminRoutes from "./admin/index";
import apiRoutes from "./api/index";
import authRoutes from "./authRoutes";
import authCheck from "../middlewares/authCheck";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.use("/admin", adminCheck, adminRoutes);
router.use("/api", authCheck, apiRoutes);
router.use("/auth", authRoutes);
router.use("/health", (_req: Request, res: Response) => res.sendStatus(200));

export default router;
