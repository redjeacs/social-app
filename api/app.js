require("dotenv").config();
const express = require("express");
const passport = require("passport");
const socketConfig = require("./configs/socketConfig");
require("./configs/passportConfig");
require("./configs/cloudinaryConfig");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const conversationsRouter = require("./routes/conversationsRouter");
const messagessRouter = require("./routes/messagesRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagessRouter);

const server = socketConfig(app);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express app listening on port ${PORT}`);
});
