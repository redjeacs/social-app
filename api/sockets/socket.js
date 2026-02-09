const http = require("http");
const { Server } = require("socket.io");
const db = require("../db/queries");
const cloudinary = require("../configs/cloudinaryConfig");

module.exports = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 1e7, // 100 MB
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leaveConversation", (conversationId) => {
      socket.leave(conversationId);
    });

    socket.on("sendMessage", async (data, callback) => {
      try {
        if (data.media) {
          const { type, file } = data.media;
          if (type === "image") {
            const result = await new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                {
                  folder: "social-app/messages",
                  resource_type: "auto",
                },
                (err, result) => {
                  if (err) reject(err);
                  else resolve(result);
                },
              );
              stream.end(Buffer.from(file.split(",")[1], "base64"));
            });
            data.media = { type, file: result.secure_url };
          }
        }

        const newMessage = await db.createMessage(
          data.conversationId,
          data.senderId,
          data.body,
          data.media?.file || null,
        );

        // emit to the room, not everyone
        io.to(data.conversationId).emit("messageReceived", newMessage);

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
