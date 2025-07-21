import { Request, Response, NextFunction } from "express";

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.isUnauthenticated() || !req.user) {
      res.status(401).json({ message: "User is not authenticated." });
      return;
    }

    req.id = req.user.id;
    next();
  } catch (error) {
    console.error("[Middleware] Authentication check error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authCheck;
