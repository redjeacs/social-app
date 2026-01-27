const db = require("../db/queries");

exports.postMessage = async (req, res, next) => {
  const { conversationId } = req.params;
  const { senderId, body } = req.body;

  try {
    const newMessage = await db.createMessage(conversationId, senderId, body);

    if (!newMessage) {
      return res.status(400).json({ error: "Failed to create message" });
    }

    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
};
