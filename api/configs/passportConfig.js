const passport = require("passport");
require("dotenv").config();
const { PrismaPg } = require("@prisma/adapter-pg");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");

const db_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const adapter = new PrismaPg({
  connectionString: db_URL,
});
const prisma = new PrismaClient({ adapter });

async function findOrCreateOAuthUser({
  provider,
  providerId,
  email,
  username,
  firstName,
  lastName,
}) {
  let identity = await prisma.identity.findUnique({
    where: { provider_providerId: { provider, providerId } },
    include: { user: true },
  });

  if (identity && identity.user) {
    return identity.user;
  }

  let user = await prisma.user.findUnique({
    where: { email: email },
    include: { identities: true },
  });

  if (user) {
    await prisma.identity.create({
      data: {
        provider,
        providerId,
        userId: user.id,
      },
    });
    return user;
  }

  user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password: "",
      identities: {
        create: {
          provider,
          providerId,
        },
      },
    },
  });

  return user;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser({
          provider: "google",
          providerId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName || profile.emails[0].value,
          firstName: profile.name?.givenName || "",
          lastName: profile.name?.familyName || "",
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let firstName = "";
        let lastName = "";
        if (profile.displayName) {
          const name = profile.displayName.split(" ");
          firstName = name[0];
          lastName = name.slice(1).join(" ");
        }
        const user = await findOrCreateOAuthUser({
          provider: "github",
          providerId: profile.id,
          email:
            profile.emails && profile.emails[0] ? profile.emails[0].value : "",
          username:
            profile.username ||
            (profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : ""),
          firstName: firstName || "",
          lastName: lastName || "",
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
