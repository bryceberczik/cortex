import { Router } from "express";
import { userRouter } from "./userRoutes";
import { postRouter } from "./postRoutes";
import authCheck from "../../middlewares/authCheck";

const router = Router();

router.use("/posts", postRouter);
router.use("/users", authCheck, userRouter);

export default router;
