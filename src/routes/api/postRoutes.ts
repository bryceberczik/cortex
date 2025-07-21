import { Router } from "express";
import { getAllPosts, publishPost } from "../../controllers/postController";

const router = Router();

router.get("/", getAllPosts);

router.post("/", publishPost);

export { router as postRouter };