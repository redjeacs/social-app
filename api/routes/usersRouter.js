const { Router } = require("express");
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const usersRouter = Router();

usersRouter.get("/:userId", verifyToken, usersController.getUserById);
usersRouter.patch(
  "/:userId",
  verifyToken,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  usersController.updateUserProfile
);
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
usersRouter.get(
  "/search/:searchQuery",
  verifyToken,
  usersController.searchUsers
);
usersRouter.post("/follow/:userId", verifyToken, usersController.followUser);
usersRouter.post(
  "/unfollow/:userId",
  verifyToken,
  usersController.unfollowUser
);

module.exports = usersRouter;
