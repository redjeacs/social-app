require("dotenv").config();
const express = require("express");
const passport = require("passport");
require("./configs/passportConfig");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express app listening on port ${PORT}`);
});
