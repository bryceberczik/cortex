import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";

// TODO: changeUsername

// TODO: changeIcon

// TODO: toggleEmailNewsletter

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { email: true, provider: true, providerId: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.id) {
    res.status(400).json({ message: "Missing authentication values." });
    return;
  }

  try {
    await prisma.user.delete({ where: { id: req.id } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
