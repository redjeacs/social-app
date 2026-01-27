const db = require("../db/queries");

exports.getUserConversations = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const conversations = await db.getUserConversations(userId);

    if (!conversations)
      return res
        .status(404)
        .json({ message: "No conversations found for this user" });

    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

exports.getConversation = async (req, res, next) => {
  const { userId, recipientId } = req.params;

  try {
    const conversation = await db.getConversation(userId, recipientId);
    if (!conversation)
      return res
        .status(404)
        .json({ message: "Conversation not found between these users" });

    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

exports.createConversation = async (req, res, next) => {
  const { userId, recipientId } = req.params;

  try {
    const newConversation = await db.createConversation(userId, recipientId);

    if (!newConversation)
      return res
        .status(400)
        .json({ message: "Failed to create a new conversation" });

    res.status(201).json(newConversation);
  } catch (err) {
    next(err);
  }
};
