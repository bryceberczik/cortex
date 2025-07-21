import { Router } from "express";
import { publishPost } from "../../controllers/admin/blogController";

const router = Router();

router.post("/publish", publishPost);

export { router as blogRouter };
