import { Request, Response, NextFunction } from "express";

// TODO: Add admin route security.

const adminCheck = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    console.error("[Middleware] Admin check error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default adminCheck;
