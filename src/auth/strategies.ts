import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const generateUsername = (username?: string) => {
  const base = username || "user";
  const suffix = Math.floor(Math.random() * 10000);
  return `${base.replace(/\s+/g, "").toLowerCase()}${suffix}`;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await prisma.user.upsert({
        where: {
          provider_providerId: {
            provider: "GOOGLE",
            providerId: profile.id,
          },
        },
        create: {
          username: generateUsername(profile.username),
          email: profile.emails ? profile.emails[0].value : null,
          provider: "GOOGLE",
          providerId: profile.id,
        },
        update: {},
      });

      return cb(null, user);
    }
  )
);
