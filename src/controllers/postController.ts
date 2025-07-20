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
  try {
    
  } catch (error) {
    console.error("Error creating prisma entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
