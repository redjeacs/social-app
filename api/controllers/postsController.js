const db = require("../db/queries");
const validators = require("../middlewares/Validators");
const { matchedData, validationResult } = require("express-validator");
const CustomNotFoundError = require("../middlewares//CustomNotFoundError");
const cloudinary = require("../configs/cloudinaryConfig");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts", error });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await db.getUserPosts(userId);

    if (!posts) return res.status(404).json({ message: "Posts not found" });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts", error });
  }
};

exports.getPostsByReplies = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await db.getUserReplies(userId);

    if (!posts) return res.status(404).json({ message: "Posts not found" });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts", error });
  }
};

exports.getPostsByLikes = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await db.getUserLikedPosts(userId);

    if (!posts) res.status(404).json({ message: "Posts not found" });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving posts", err });
  }
};

exports.getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await db.getPostById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post", error });
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
    const images = req.files;
    const uploadedImages = [];

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Validation errors", errors: errors.array() });

    const data = matchedData(req);

    if (!data) return res.status(400).json({ message: "Invalid post data" });

    try {
      if (images && images.length > 0) {
        for (const image of images) {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "social-app/posts",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              },
            );
            stream.end(image.buffer);
          });
          uploadedImages.push(result.secure_url);
        }
      }

      uploadedImages.push(
        ...(Array.isArray(data.gifUrls)
          ? data.gifUrls
          : data.gifUrls
            ? [data.gifUrls]
            : []),
      );

      if (uploadedImages.length > 4)
        return res
          .status(400)
          .json({ message: "Maximum 4 media items allowed" });

      const newPost = await db.createPost(userId, data.content, uploadedImages);

      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating post", error: error.message });
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

exports.repost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const repost = await db.repost(postId, userId);

    if (!repost) {
      return res.status(404).json({ message: "Original post not found" });
    }

    res
      .status(201)
      .json({ message: "Post reposted successfully", repost: repost });
  } catch (error) {
    res.status(500).json({ message: "Error reposting post", error });
  }
};

exports.undoRepost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const result = await db.undoRepost(postId, userId);

    if (!result) {
      return res.status(404).json({ message: "Repost not found" });
    }

    res.status(200).json({ message: "Repost undone successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error undoing repost", error });
  }
};

exports.replyToPost = async (req, res) => {
  const { postId } = req.params;
  const { content, userId } = req.body;

  try {
    const reply = await db.replyToPost(postId, userId, content);

    if (!reply) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(201).json({ message: "Reply added successfully", reply: reply });
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};

exports.searchPosts = async (req, res, next) => {
  const { searchQuery } = req.params;

  try {
    const posts = await db.searchPosts(searchQuery);

    if (!posts) return res.status(200).json({ message: "no matching posts" });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
