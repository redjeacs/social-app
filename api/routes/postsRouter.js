const { Router } = require("express");
const verifyToken = require("../middlewares/Verifytoken");
const postsController = require("../controllers/postsController.js");
const postsRouter = Router();

postsRouter.get("/", verifyToken, postsController.getAllPosts);
postsRouter.post("/:userId", verifyToken, postsController.createPost);
postsRouter.get(
  "/follows/:userId",
  verifyToken,
  postsController.getFollowsPosts
);
postsRouter.post("/:postId/like", verifyToken, postsController.likePost);

module.exports = postsRouter;
