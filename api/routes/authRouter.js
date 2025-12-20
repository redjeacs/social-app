const { Router } = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/Verifytoken");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/", verifyToken, authController.checkSignin);
authRouter.get("/user", verifyToken, authController.getUser);
authRouter.post("/signup", authController.createUser);
authRouter.post("/signin", authController.signin);
authRouter.get("/demo-signin", authController.demoSignin);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get("/google/callback", authController.googleCallback);
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get("/github/callback", authController.githubCallback);

module.exports = authRouter;
