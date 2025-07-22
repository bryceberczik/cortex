import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import idSchema from "../../schemas/idSchema";

const prisma = new PrismaClient();

export const removeUser = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    await prisma.user.delete({ where: { id: parsedId.data } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeComment = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    await prisma.comment.delete({ where: { id: parsedId.data } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error removing comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearPostComments = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    await prisma.comment.deleteMany({ where: { postId: parsedId.data } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error clearing post's comments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
