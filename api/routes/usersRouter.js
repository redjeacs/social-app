const { Router } = require("express");
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/Verifytoken");

const usersRouter = Router();

usersRouter.get("/:userId", verifyToken, usersController.getUserById);
usersRouter.get(
  "/popular/:userId",
  verifyToken,
  usersController.getPopularUsers
);
usersRouter.get(
  "/follow/:userId",
  verifyToken,
  usersController.getUsersToFollow
);

module.exports = usersRouter;
