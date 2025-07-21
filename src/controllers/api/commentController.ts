import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import idSchema from "../../schemas/idSchema";
import {
  createCommentSchema,
  editCommentSchema,
} from "../../schemas/commentSchema";

// TODO: batchGetComments

// TODO: toggleLikeComment

const prisma = new PrismaClient();

export const getComments = async (_req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching all comments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parsedId.data },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments by post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parsedId.data },
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  if (!req.id) {
    res.status(400).json({ message: "Missing authentication values." });
    return;
  }

  const parsedReq = createCommentSchema.safeParse(req.body);
  if (!parsedReq.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedReq;

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: req.id,
        ...data,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editComment = async (req: Request, res: Response) => {
  if (!req.id) {
    res.status(400).json({ message: "Missing authentication values." });
    return;
  }

  const parsedReq = editCommentSchema.safeParse(req.body);
  if (!parsedReq.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedReq;

  try {
    const comment = await prisma.comment.update({
      where: {
        id_authorId: {
          id: data.commentId,
          authorId: req.id,
        },
      },
      data: { content: data.content },
    });

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  if (!req.id) {
    res.status(400).json({ message: "Missing authentication values." });
    return;
  }

  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    await prisma.comment.delete({
      where: {
        id_authorId: {
          id: parsedId.data,
          authorId: req.id,
        },
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
