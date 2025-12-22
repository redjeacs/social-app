const { Router } = require("express");
const verifyToken = require("../middlewares/Verifytoken");
const postsController = require("../controllers/postsController.js");
const postsRouter = Router();

postsRouter.get("/", verifyToken, postsController.getAllPosts);
postsRouter.post("/:userId", verifyToken, postsController.createPost);

module.exports = postsRouter;
