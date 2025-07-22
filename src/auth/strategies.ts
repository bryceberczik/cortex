import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from "passport-github2";
import { VerifyCallback } from "passport-oauth2";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
const DOMAIN = process.env.DOMAIN!;

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
      callbackURL: `${DOMAIN}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const user = await prisma.user.upsert({
          where: {
            provider_providerId: {
              provider: "GOOGLE",
              providerId: profile.id,
            },
          },
          create: {
            username: generateUsername(profile.username || profile.displayName),
            email: profile.emails ? profile.emails[0].value : null,
            provider: "GOOGLE",
            providerId: profile.id,
          },
          update: {},
          select: { id: true },
        });

        return cb(null, user.id);
      } catch (error) {
        console.error("Google Passport error:", error);
        cb(error);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${DOMAIN}/auth/github/callback`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: GitHubProfile,
      cb: VerifyCallback,
    ) => {
      try {
        const user = await prisma.user.upsert({
          where: {
            provider_providerId: {
              provider: "GITHUB",
              providerId: profile.id,
            },
          },
          create: {
            username: generateUsername(profile.username || profile.displayName),
            email: profile.emails ? profile.emails[0].value : null,
            provider: "GITHUB",
            providerId: profile.id,
          },
          update: {},
          select: { id: true },
        });

        return cb(null, user.id);
      } catch (error) {
        console.error("GitHub Passport error:", error);
        cb(error);
      }
    },
  ),
);
