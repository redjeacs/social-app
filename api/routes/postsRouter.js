const { Router } = require("express");
const verifyToken = require("../middlewares/Verifytoken");
const postsController = require("../controllers/postsController.js");
const postsRouter = Router();

postsRouter.get("/", verifyToken, postsController.getAllPosts);
postsRouter.get("/:postId", verifyToken, postsController.getPostById);
postsRouter.post("/:userId", verifyToken, postsController.createPost);
postsRouter.get(
  "/follows/:userId",
  verifyToken,
  postsController.getFollowsPosts
);
postsRouter.post("/:postId/like", verifyToken, postsController.likePost);
postsRouter.post("/:postId/repost", verifyToken, postsController.repost);
postsRouter.delete(
  "/:postId/undo-repost",
  verifyToken,
  postsController.undoRepost
);

postsRouter.post(
  "/:postId/comment",
  verifyToken,
  postsController.addCommentToPost
);

module.exports = postsRouter;
