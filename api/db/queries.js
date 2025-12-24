require("dotenv").config();
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const db_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const adapter = new PrismaPg({
  connectionString: db_URL,
});
const prisma = new PrismaClient({ adapter });

exports.createUser = async (email, firstName, lastName, username, password) => {
  await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    },
  });
};

exports.getUser = async (colName, query) => {
  const key = { [colName]: query };
  const user = await prisma.user.findUnique({
    where: key,
  });
  return user;
};

exports.getUsersToFollow = async (userId) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    include: { followers: true },
    take: 20,
  });
  return users;
};

exports.getPopularUsers = async (userId) => {
  const users = await prisma.user.findMany({
    where: { id: { not: userId } },
    include: { followers: true },
    orderBy: {
      followersCount: "desc",
    },
    take: 20,
  });
  return users;
};

exports.followUser = async (followerId, userId) => {
  const followedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      followers: {
        connect: { id: followerId },
      },
      followersCount: {
        increment: 1,
      },
    },
  });
  return followedUser;
};

exports.unfollowUser = async (followerId, userId) => {
  const unfollowedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      followers: {
        disconnect: { id: followerId },
      },
      followersCount: {
        decrement: 1,
      },
    },
  });
  return unfollowedUser;
};

exports.getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

exports.getFollowsPosts = async (userId) => {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        followers: {
          some: {
            id: userId,
          },
        },
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

exports.createPost = async (userId, content) => {
  const newPost = await prisma.post.create({
    data: {
      content: content,
      user: { connect: { id: userId } },
    },
  });
  return newPost;
};
