import { Request, Response } from "express";
import { fetchPosts } from "../config/contentfulConfig";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();

    if (posts.length === 0) {
      res.status(200).json({ message: "No posts found." });
      return;
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { sys, fields } = req.body;

  const locales = Object.keys(fields.title || {});

  if (!locales.length) {
    return res.status(400).json({ message: "No title provided" });
  }

  const locale = locales[0];

  const contentfulId: string = sys.id;
  const title: string = fields.title[locale];
  const content: string = (fields.body && fields.body[locale]) || "";

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
    console.error("Error creating post entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
