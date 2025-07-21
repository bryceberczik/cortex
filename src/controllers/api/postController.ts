import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import idSchema from "../../schemas/idSchema";

const prisma = new PrismaClient();

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  try {
    const post = await prisma.post.findUnique({ where: { id: parsedId.data } });

    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
