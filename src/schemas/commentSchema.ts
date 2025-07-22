import { z } from "zod";
import idSchema from "./idSchema";

const contentSchema = z.string().nonempty().max(500);

export const createCommentSchema = z.object({
  postId: idSchema,
  content: contentSchema,
});

export const editCommentSchema = z.object({
  commentId: idSchema,
  content: contentSchema,
});
