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

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const data = await db.likePost(postId, userId);

    if (!data) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (data.removed) {
      return res
        .status(200)
        .json({ message: "Post unliked successfully", post: data.post });
    }

    res
      .status(200)
      .json({ message: "Post liked successfully", post: data.post });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
};
