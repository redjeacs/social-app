export function buildReplyTree(posts) {
  const map = {};
  const roots = [];

  posts.forEach((post) => {
    map[post.id] = { ...post, replies: [] };
  });

  posts.forEach((post) => {
    if (post.parentPostId) {
      if (map[post.parentPostId]) {
        map[post.parentPostId].replies.push(map[post.id]);
      } else {
        roots.push(map[post.id]);
      }
    } else {
      roots.push(map[post.id]);
    }
  });

  return roots;
}
