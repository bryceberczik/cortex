import passport from "passport";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

passport.serializeUser((user: any, cb) => {
  try {
    cb(null, user.id);
  } catch (error) {
    console.error("Error serializing user:", error);
    cb(error);
  }
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    cb(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    cb(error);
  }
});
