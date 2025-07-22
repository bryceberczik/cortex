import { Router, Request, Response } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["read:user", "user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
);

router.get("/me", (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User is not logged in." });
      return;
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error fetching logged in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/logout", (req: Request, res: Response) => {
  try {
    req.logout(() => res.redirect("/"));
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
