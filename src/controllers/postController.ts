import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

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

export const publishPost = async (req: Request, res: Response) => {
  const { sys, fields } = req.body;

  const contentfulId: string = sys.id;

  const title: string = fields.title["en-US"];
  const content: string = fields.content["en-US"];

  try {
    const post = await prisma.post.upsert({
      where: { contentfulId },
      create: {
        contentfulId,
        title,
        content,
      },
      update: {
        title,
        content,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error publishing post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
