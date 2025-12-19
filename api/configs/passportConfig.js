const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const db = require("../db/queries");

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
        // Try to find user by googleId
        let user = await db.getUser("googleId", profile.id);
        if (!user) {
          // If not found, create new user
          user = await db.createOAuthUser({
            email: profile.emails[0].value,
            username: profile.displayName || profile.emails[0].value,
            googleId: profile.id,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
          });
        }
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
        // Try to find user by githubId
        let user = await db.getUser("githubId", profile.id);
        if (!user) {
          // If not found, create new user
          user = await db.createOAuthUser({
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : "",
            username:
              profile.username ||
              (profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : ""),
            githubId: profile.id,
            firstName: profile.displayName || "",
            lastName: "",
          });
        }
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
