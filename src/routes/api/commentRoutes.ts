import { Router } from "express";
import {
  getComments,
  getCommentsByPost,
  getCommentById,
  createComment,
  editComment,
  deleteComment,
} from "../../controllers/api/commentController";

const router = Router();

router.get("/", getComments);

router.get("/post/:id", getCommentsByPost);

router.get("/:id", getCommentById);

router.post("/", createComment);

router.put("/", editComment);

router.delete("/:id", deleteComment);

export { router as commentRouter };
