import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";

function PostPage() {
  const { token } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          setAlert({
            type: "error",
            message: `An error occured - ${res.statusText}`,
          });
          return;
        }

        setPost(data);
      } catch (error) {
        setAlert({
          type: "error",
          message: `An error occured - ${error.message}`,
        });
      }
    };
    fetchPost();
  }, [postId]);

  console.log(post);

  return (
    <>
      <div className="sticky top-0 flex w-full bg-black z-10 p-2 justify-between">
        <div className="flex gap-4 items-center">
          <button
            to="#"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[rgba(239,243,244,0.1)] rounded-full cursor-pointer"
          >
            <svg
              id="back-arrow"
              role="button"
              fill="white"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </button>
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </div>
    </>
  );
}

export default PostPage;
