require("dotenv").config();
const express = require("express");
const http = require("http");
const passport = require("passport");
const socket = require("./sockets/socket");
require("./configs/passportConfig");
require("./configs/cloudinaryConfig");
const app = express();
const cors = require("cors");
app.set("trust proxy", 1);

const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const conversationsRouter = require("./routes/conversationsRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/conversations", conversationsRouter);

const server = http.createServer(app);
socket(server);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express app listening on port ${PORT}`);
});
