import { Router } from "express";
import { getPosts, publishPost } from "../../controllers/postController";

const router = Router();

router.get("/", getPosts);

router.post("/", publishPost);

export { router as postRouter };