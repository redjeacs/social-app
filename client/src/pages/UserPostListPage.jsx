import PostList from "@/components/PostList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/contexts/AlertContext";

function UserPostListPage() {
  const { token } = useAuth();
  const { setAlert } = useAlert();
  const userId = useParams().userId;
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${userId}`,
          {
            method: "GET",
            headers: {
              "Application-Type": "response/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok)
          setAlert({ type: "error", message: "failed to fetch posts" });
        setPosts(data);
      } catch (err) {
        setAlert({
          type: "error",
          message: `An error occured while fetching posts: ${err}`,
        });
      }
    };
    fetchUserPosts();
  }, [userId]);

  console.log(posts);

  return (
    <div className="">
      <PostList postsData={posts} />
    </div>
  );
}

export default UserPostListPage;
