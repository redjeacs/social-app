const db = require("../db/queries");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await db.getUser("id", userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsersToFollow = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const usersToFollow = await db.getUsersToFollow(userId);

    if (!usersToFollow)
      return res.status(404).json({ message: "No users to follow found" });

    res.status(200).json(usersToFollow);
  } catch (err) {
    next(err);
  }
};

exports.getPopularUsers = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const popularUsers = await db.getPopularUsers(userId);

    if (!popularUsers)
      res.status(404).json({ message: "No popular users found" });

    res.status(200).json(popularUsers);
  } catch (err) {
    next(err);
  }
};
