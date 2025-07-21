import { Router } from "express";
import { blogRouter } from "./blogRoutes";
import { settingsRouter } from "./settingsRoutes";

const router = Router();

router.use("/blog", blogRouter);
router.use("/settings", settingsRouter);

export default router;
