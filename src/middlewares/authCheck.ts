import { Request, Response, NextFunction } from "express";

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ message: "User is not authenticated." });
};

export default authCheck;
