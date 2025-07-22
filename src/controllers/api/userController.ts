import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import { changeUsernameSchema } from "../../schemas/userSchemas";

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { email: true, provider: true, providerId: true, emailOptIn: true },
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

export const toggleEmailNewsletter = async (req: Request, res: Response) => {
  if (!req.id) {
    res.status(404).json({ message: "Missing authentication values." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.id },
      select: { emailOptIn: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    await prisma.user.update({
      where: { id: req.id },
      data: { emailOptIn: !user.emailOptIn },
    });

    res.status(200).json({ message: "Toggled email newsletter successfully." });
  } catch (error) {
    console.error("Error toggling email newsletter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changeUsername = async (req: Request, res: Response) => {
  if (!req.id) {
    res.status(400).json({ message: "Missing authentication values." });
    return;
  }

  const parsedReq = changeUsernameSchema.safeParse(req.body);
  if (!parsedReq.success) {
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedReq;

  try {
    await prisma.user.update({
      where: { id: req.id },
      data: { username: data.username },
    });

    res.status(200).json({ message: "Changed username successfully." });
  } catch (error) {
    console.error("Error changing username:", error);
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
