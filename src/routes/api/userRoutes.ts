import { Router } from "express";
import {
  getUserById,
  toggleEmailNewsletter,
  changeUsername,
  deleteUser,
} from "../../controllers/api/userController";

const router = Router();

router.get("/:id", getUserById);

router.put("/email-news", toggleEmailNewsletter);

router.put("/username", changeUsername);

router.delete("/", deleteUser);

export { router as userRouter };
