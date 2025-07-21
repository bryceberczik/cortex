import { Router } from "express";
import { userRouter } from "./userRoutes";
import { postRouter } from "./postRoutes";
import { commentRouter } from "./commentRoutes";
import authCheck from "../../middlewares/authCheck";

const router = Router();

router.use("/users", authCheck, userRouter);
router.use("/posts", postRouter);
router.use("/comments", authCheck, commentRouter);

export default router;
