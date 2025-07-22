import { Router } from "express";
import { userRouter } from "./userRoutes";
import { postRouter } from "./postRoutes";
import { commentRouter } from "./commentRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export default router;
