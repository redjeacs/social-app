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
    include: { followers: true, following: true },
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
      likedBy: true,
      originalPost: {
        include: {
          user: true,
          likedBy: true,
          reposts: true,
        },
      },
      reposts: true,
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
      likedBy: true,
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

exports.likePost = async (postId, userId) => {
  const userWithLikes = await prisma.user.findUnique({
    where: { id: userId },
    include: { likedPosts: { select: { id: true } } },
  });

  if (!userWithLikes) throw new Error("User not found");
  const alreadyLiked = userWithLikes.likedPosts.some((p) => p.id === postId);

  if (alreadyLiked) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        likedPosts: { disconnect: { id: postId } },
      },
    });
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likes: { decrement: 1 },
      },
      include: { likedBy: true },
    });

    return { post: updatedPost, removed: true };
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: {
        likedPosts: { connect: { id: postId } },
      },
    });
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likes: { increment: 1 },
      },
      include: { likedBy: true },
    });

    return { post: updatedPost, removed: false };
  }
};

exports.repost = async (postId, userId) => {
  const originalPost = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!originalPost) {
    return null;
  }

  console.log("Original post found:", originalPost);

  const repost = await prisma.post.create({
    data: {
      content: originalPost.content,
      user: { connect: { id: userId } },
      originalPost: { connect: { id: originalPost.id } },
    },
    include: { user: true, originalPost: true, likedBy: true },
  });

  console.log("Repost created:", repost);

  return repost;
};

exports.undoRepost = async (postId, userId) => {
  const repost = await prisma.post.findFirst({
    where: {
      id: postId,
      userId: userId,
    },
  });

  if (!repost) {
    return null;
  }

  await prisma.post.delete({
    where: { id: repost.id },
  });

  return repost;
};
