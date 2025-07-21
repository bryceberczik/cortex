import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";

// TODO: unpublishPost

const prisma = new PrismaClient();

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
