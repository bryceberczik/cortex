import { Router } from "express";
import { userRouter } from "./userRoutes";
import authCheck from "../../middlewares/authCheck";

const router = Router();

router.use("/users", authCheck, userRouter);

export default router;
