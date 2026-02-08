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
    include: {
      followers: true,
      following: { include: { following: true } },
      likedPosts: true,
    },
  });

  return user;
};

exports.updateUserProfile = async (userId, updateData) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    include: { followers: true, following: true },
  });
  return updatedUser;
};

exports.getUsersToFollow = async (userId, take) => {
  const followedUsers = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      following: {
        select: { id: true },
      },
    },
  });

  const followedUsersIds =
    followedUsers?.following.map((user) => user.id) || [];

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
        notIn: followedUsersIds,
      },
    },
    include: { followers: true },
    orderBy: { followers: { _count: "desc" } },
    take: take,
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

exports.searchUsers = async (searchQuery) => {
  const user = await prisma.user.findUnique({
    where: { username: searchQuery },
  });

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: searchQuery, mode: "insensitive" } },
        {
          OR: [
            {
              firstName: { contains: searchQuery, mode: "insensitive" },
            },
            { lastName: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
      ],
    },
    include: { following: true, followers: true },
    orderBy: { followersCount: "desc" },
    take: 8,
  });

  return { user: user, users: users };
};

exports.searchPosts = async (searchQuery) => {
  const posts = await prisma.post.findMany({
    where: {
      content: { contains: searchQuery, mode: "insensitive" },
    },
    include: {
      user: true,
      likedBy: true,
      originalPost: {
        include: {
          user: true,
          likedBy: true,
          reposts: true,
          replies: true,
        },
      },
      reposts: true,
      replies: {
        include: { user: true, likedBy: true, reposts: true },
      },
    },
    orderBy: { likes: "desc" },
    take: 20,
  });

  return posts;
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

exports.updateMessageRequestStatus = async (userId, messageStatus) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      messageStatus: messageStatus,
    },
  });

  return user;
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
          replies: true,
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

exports.getUserPosts = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        include: {
          user: true,
          likedBy: true,
          originalPost: {
            include: {
              user: true,
              likedBy: true,
              reposts: true,
              replies: true,
            },
          },
          reposts: true,
          replies: { include: { user: true, likedBy: true, reposts: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user.posts;
};

exports.getUserReplies = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        where: {
          OR: [
            { parentPostId: { not: null } },
            { originalPostId: { not: null } },
          ],
        },
        include: {
          user: true,
          likedBy: true,
          originalPost: {
            include: {
              user: true,
              likedBy: true,
              reposts: true,
              replies: true,
            },
          },
          reposts: true,
          replies: { include: { user: true, likedBy: true, reposts: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user.posts;
};

exports.getUserLikedPosts = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      likedPosts: {
        include: {
          user: true,
          likedBy: true,
          originalPost: {
            include: {
              user: true,
              likedBy: true,
              reposts: true,
              replies: true,
            },
          },
          reposts: true,
          replies: { include: { user: true, likedBy: true, reposts: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user.likedPosts;
};

exports.getPostById = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: true,
      likedBy: true,
      originalPost: {
        include: {
          user: true,
          likedBy: true,
          reposts: true,
          replies: true,
        },
      },
      reposts: true,
      replies: {
        include: { user: true, likedBy: true, reposts: true },
      },
    },
  });
  return post;
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
      originalPost: {
        include: {
          user: true,
          likedBy: true,
          reposts: true,
          replies: true,
        },
      },
      reposts: true,
      replies: {
        include: { user: true, likedBy: true, reposts: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

exports.createPost = async (userId, content, uploadedImages) => {
  const newPost = await prisma.post.create({
    data: {
      content: content,
      media: uploadedImages || [],
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

  const repost = await prisma.post.create({
    data: {
      content: originalPost.content,
      user: { connect: { id: userId } },
      originalPost: { connect: { id: originalPost.id } },
    },
    include: { user: true, originalPost: true, likedBy: true },
  });

  return repost;
};

exports.undoRepost = async (postId, userId) => {
  const repost = await prisma.post.findFirst({
    where: {
      id: postId,
      userId: userId,
      originalPostId: { not: null },
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

exports.replyToPost = async (postId, userId, content) => {
  let post = await prisma.post.findUnique({
    where: { id: postId },
    include: { replies: true, user: true },
  });

  if (post.originalPostId) {
    post = await prisma.post.findUnique({
      where: { id: post.originalPostId },
      include: { replies: true, user: true },
    });
  } else if (!post) {
    return null;
  }

  const reply = await prisma.post.create({
    data: {
      content: content,
      user: { connect: { id: userId } },
      parentPost: { connect: { id: post.id } },
    },
    include: { user: true },
  });

  return reply;
};

exports.getUserConversations = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      conversations: {
        include: {
          conversation: {
            include: {
              participants: {
                include: {
                  user: true,
                },
              },
              messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
                include: { sender: true },
              },
            },
          },
        },
        orderBy: {
          conversation: { updatedAt: "desc" },
        },
      },
    },
  });

  return user.conversations.map((cp) => cp.conversation);
};

exports.getConversation = async (userId, recipientId) => {
  const sameUser = userId === recipientId;
  const ids = sameUser ? [userId] : [userId, recipientId];
  const uniqueKey = ids.slice().sort().join("|");

  const conversation = await prisma.conversation.findUnique({
    where: {
      uniqueKey: uniqueKey,
    },
    include: {
      participants: true,
      messages: { orderBy: { createdAt: "asc" }, include: { sender: true } },
    },
  });

  if (!conversation) return null;

  return conversation;
};

exports.createConversation = async (userId, recipientId) => {
  const sameUser = userId === recipientId;
  const ids = sameUser ? [userId] : [userId, recipientId];
  const uniqueKey = ids.slice().sort().join("|");

  const users = await prisma.user.findMany({ where: { id: { in: ids } } });
  if (users.length !== ids.length)
    throw new Error("Cannot create conversation: user not found");

  try {
    return await prisma.conversation.create({
      data: {
        uniqueKey,
        participants: {
          create: ids.map((id) => ({ user: { connect: { id } } })),
        },
      },
      include: {
        participants: true,
        messages: { orderBy: { createdAt: "asc" }, include: { sender: true } },
      },
    });
  } catch (e) {
    if (e.code === "P2002") {
      return this.getConversation(userId, recipientId);
    }
    throw e;
  }
};

exports.createMessage = async (conversationId, senderId, body) => {
  const newMessage = await prisma.message.create({
    data: {
      body: body,
      conversation: { connect: { id: conversationId } },
      sender: { connect: { id: senderId } },
    },
    include: { sender: true },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  return newMessage;
};
