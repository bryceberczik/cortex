import { Router } from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
} from "../../controllers/api/userController";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.delete("/", deleteUser);

export { router as userRouter };
