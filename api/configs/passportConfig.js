const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Helper to find or create user with identity
async function findOrCreateOAuthUser({
  provider,
  providerId,
  email,
  username,
  firstName,
  lastName,
}) {
  // Try to find identity
  let identity = await prisma.identity.findUnique({
    where: { provider_providerId: { provider, providerId } },
    include: { user: true },
  });

  if (identity && identity.user) {
    return identity.user;
  }

  // If not found, create user and identity
  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password: "", // No password for OAuth
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

// Google OAuth Strategy
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

// GitHub OAuth Strategy
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
          firstName: profile.displayName || "",
          lastName: "",
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
