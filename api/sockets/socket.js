const http = require("http");
const { Server } = require("socket.io");
const db = require("../db/queries");

module.exports = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", async (data, callback) => {
      try {
        const newMessage = await db.createMessage(
          data.conversationId,
          data.senderId,
          data.body,
        );

        io.emit("sendMessage", newMessage);

        if (typeof callback === "function") {
          callback({ status: "ok", message: newMessage });
        }
      } catch (err) {
        console.error("Error saving message to database:", err);
        if (typeof callback === "function")
          callback({ status: "error", error: "Failed to save message" });
      }
    });
  });

  return server;
};
