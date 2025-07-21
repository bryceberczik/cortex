import { Router } from "express";
import {
  getPosts,
  getPostById,
  togglePostLike,
} from "../../controllers/api/postController";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPostById);

router.put("/:id", togglePostLike);

export { router as postRouter };
