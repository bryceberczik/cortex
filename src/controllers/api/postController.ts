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

export const togglePostLike = async (req: Request, res: Response) => {
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
    const existingLike = await prisma.user.findUnique({
      where: { id: req.id },
      select: {
        likedPosts: {
          where: { id: parsedId.data },
          select: { id: true },
        },
      },
    });

    const isLiked = !!existingLike ? existingLike.likedPosts.length > 0 : false;

    if (isLiked) {
      await prisma.user.update({
        where: { id: req.id },
        data: { likedPosts: { disconnect: { id: parsedId.data } } },
      });
    } else {
      await prisma.user.update({
        where: { id: req.id },
        data: { likedPosts: { connect: { id: parsedId.data } } },
      });
    }

    res.status(200).json({ message: "Toggled post like successfully." });
  } catch (error) {
    console.error("Error toggling post like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
