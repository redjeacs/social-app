const db = require("../db/queries");
const validators = require("../middlewares/Validators");
const { matchedData, validationResult } = require("express-validator");
const CustomNotFoundError = require("../middlewares//CustomNotFoundError");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts", error });
  }
};

exports.getFollowsPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await db.getFollowsPosts(userId);

    if (!posts)
      res.status(404).json({ message: "No posts found for followers" });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving follower posts", error });
  }
};

exports.createPost = [
  validators.postValidator,
  async (req, res) => {
    const { userId } = req.params;
    const { content } = req.body;
    console.log("Creating post for userId:", userId, "with content:", content);

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Validation errors", errors: errors.array() });

    const data = matchedData(req);
    if (!data) throw new CustomNotFoundError("No data found after validation");

    try {
      const newPost = await db.createPost(userId, content);
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error });
    }
  },
];
