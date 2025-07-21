import { Router } from "express";
import {
  getComments,
  getCommentsByPost,
  getCommentById,
  toggleCommentLike,
  createComment,
  editComment,
  deleteComment,
} from "../../controllers/api/commentController";

const router = Router();

router.get("/", getComments);

router.get("/post/:id", getCommentsByPost);

router.get("/:id", getCommentById);

router.put("/:id", toggleCommentLike);

router.post("/", createComment);

router.put("/", editComment);

router.delete("/:id", deleteComment);

export { router as commentRouter };
