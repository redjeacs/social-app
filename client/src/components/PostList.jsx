import { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";
import Post from "./Post";

function PostList({ yourRecentPosts }) {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchPosts = async () => {
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

        console.log("Fetched posts:", data);
        setPosts(data);
        setAlert({ type: "success", message: "Posts loaded successfully!" });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {yourRecentPosts && yourRecentPosts.length > 0 && (
        <>
          {yourRecentPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
      {posts && posts.length > 0 ? (
        posts?.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <>
          <div className="flex w-full items-stretch p-4 max-h-100 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
            <p>no posts yet be the first to post</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PostList;
