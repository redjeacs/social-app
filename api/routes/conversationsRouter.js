const { Router } = require("express");
const conversationsController = require("../controllers/conversationsController");
const verifyToken = require("../middlewares/Verifytoken");

const conversationsRouter = Router();

conversationsRouter.get(
  "/:userId",
  verifyToken,
  conversationsController.getUserConversations,
);

conversationsRouter.get(
  "/:userId-:recipientId",
  verifyToken,
  conversationsController.getConversation,
);
conversationsRouter.post(
  "/:userId-:recipientId",
  verifyToken,
  conversationsController.createConversation,
);

module.exports = conversationsRouter;
