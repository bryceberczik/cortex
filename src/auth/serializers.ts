import passport from "passport";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

passport.serializeUser((id: string, cb) => {
  try {
    cb(null, id);
  } catch (error) {
    console.error("Error serializing user:", error);
    cb(error);
  }
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { email: true, provider: true, providerId: true },
    });

    cb(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    cb(error);
  }
});
