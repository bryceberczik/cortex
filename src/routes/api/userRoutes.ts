import { Router } from "express";
import { getUserById, deleteUser } from "../../controllers/api/userController";

const router = Router();

router.get("/:id", getUserById);

router.delete("/", deleteUser);

export { router as userRouter };
