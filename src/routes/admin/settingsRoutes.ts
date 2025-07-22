import { Router } from "express";
import {
  removeUser,
  removeComment,
  clearPostComments,
} from "../../controllers/admin/settingsController";

const router = Router();

router.delete("/user/:id", removeUser);

router.delete("/comment/:id", removeComment);

router.delete("clear-post/:id", clearPostComments);

export { router as settingsRouter };
