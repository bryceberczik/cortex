import { Router } from "express";
import {
  getUsers,
  getUserById,
  getMyProfile,
  deleteUser,
} from "../../controllers/userController";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/me", getMyProfile);

router.delete("/", deleteUser);

export { router as userRouter };
