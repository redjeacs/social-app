const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const verifyToken = require("../middlewares/Verifytoken");

const messagesRouter = Router();

messagesRouter.post(
  "/:conversationId",
  verifyToken,
  messagesController.postMessage,
);

module.exports = messagesRouter;
