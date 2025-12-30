import { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";
import PostCard from "./PostCard";
import { buildReplyTree } from "../utils/buildReplyTree";

function PostList({ yourRecentPosts, followsPosts = null }) {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchPosts = async () => {
      if (followsPosts) {
        setPosts(followsPosts);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok)
          setAlert({
            type: "error",
            message: `An error occured - ${res.statusText}`,
          });

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const allPosts = [
    ...(yourRecentPosts || []),
    ...posts.filter(
      (post) => !yourRecentPosts?.some((recent) => recent.id === post.id)
    ),
  ];

  const replyTree = buildReplyTree(allPosts);

  function renderPosts(posts, isRoot = true) {
    const filteredPosts = isRoot
      ? posts.filter((post) => !post.parentPostId)
      : posts;

    return filteredPosts.map((post) => (
      <div key={post.id} className="mb-2">
        <PostCard post={post} />
        {post.replies && post.replies.length > 0 && (
          <div className="relative">{renderPosts(post.replies, false)}</div>
        )}
      </div>
    ));
  }

  return (
    <div className="flex flex-col w-full">
      {replyTree && replyTree.length > 0 ? (
        renderPosts(replyTree)
      ) : (
        <div className="flex w-full items-stretch p-4 max-h-100 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
          <p>no posts yet be the first to post</p>
        </div>
      )}
    </div>
  );
}

export default PostList;
