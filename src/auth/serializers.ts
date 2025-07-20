import passport from "passport";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

passport.serializeUser((user: any, cb) => cb(null, user.id));

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});
