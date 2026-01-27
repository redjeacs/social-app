import { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";
import PostCard from "./PostCard";
import { buildReplyTree } from "../utils/buildReplyTree";
import { useNavigate, Link } from "react-router-dom";

function PostList({ yourRecentPosts, postsData = null }) {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (postsData) {
        setPosts(Array.isArray(postsData) ? postsData : []);
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
        if (res.status === 401 || res.status === 403) navigate("/signin");

        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [postsData]);

  const allPosts = [
    ...(yourRecentPosts || []),
    ...posts.filter(
      (post) => !yourRecentPosts?.some((recent) => recent.id === post.id),
    ),
  ];

  const replyTree = buildReplyTree(allPosts);

  function renderPosts(posts) {
    return posts.map((post) => (
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
        <div className="flex flex-col w-full justify-stretch items-center gap-4 p-4 max-h-100 cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
          <p>There are no posts that match your search.</p>
          <Link
            to="/"
            className="flex items-center gap-1 px-4 py-2 bg-(--twitter-blue) rounded-full cursor-pointer hover:bg-(--twitter-blue-hover) transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden={true}
              fill="rgb(239,243,244)"
              className="w-full h-5"
            >
              <g>
                <path d="M12 4c-4.418 0-8 3.58-8 8s3.582 8 8 8c3.806 0 6.993-2.66 7.802-6.22l1.95.44C20.742 18.67 16.76 22 12 22 6.477 22 2 17.52 2 12S6.477 2 12 2c3.272 0 6.176 1.57 8 4V3.5h2v6h-6v-2h2.616C17.175 5.39 14.749 4 12 4z"></path>
              </g>
            </svg>
            <span className="font-bold">return</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PostList;
