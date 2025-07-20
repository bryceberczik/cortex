import { Request, Response } from "express";
import { fetchPosts } from "../config/contentfulConfig";

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await fetchPosts("post");

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
