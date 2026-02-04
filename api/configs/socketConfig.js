const http = require("http");
const { Server } = require("socket.io");

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

    socket.on("connect", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} connected to room: ${room}`);
    });

    socket.on("disconnect", (room) => {
      socket.leave(room);
      console.log(`User ${socket.id} disconnected from room: ${room}`);
    });

    socket.on("sendMessage", ({ room, message }) => {
      io.to(room).emit("receiveMessage", message);
      console.log(`Message sent to room ${room}: ${message}`);
    });
  });

  return server;
};
