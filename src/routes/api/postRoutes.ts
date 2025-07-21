import { Router } from "express";
import { getPosts, getPostById } from "../../controllers/api/postController";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPostById);

export { router as postRouter };
