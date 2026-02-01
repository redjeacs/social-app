import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import userProfilePlaceholder from "../assets/user.svg";
import globeIcon from "../assets/globe.png";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useEffect } from "react";

function PostForm({ yourRecentPosts, setYourRecentPosts }) {
  const { user, token } = useAuth();
  const [post, setPost] = useState("");
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setAlert } = useAlert();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isSubmittingPost) {
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 10;
        setProgress(progressValue);
        if (progressValue >= 100) {
          clearInterval(interval);
          setIsSubmittingPost(false);
          setProgress(0);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSubmittingPost]);

  const handleTextareaInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingPost(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: post }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setAlert({
          type: "error",
          message: `An error occured - ${data.message || res.statusText}`,
        });
        return;
      }
      setPost("");
      setYourRecentPosts([{ ...data.post, user }, ...yourRecentPosts]);
      setAlert({ type: "success", message: "Post submitted successfully!" });
    } catch (err) {
      setAlert({
        type: "error",
        message: `An error occured - ${err.message}`,
      });
    }
  };

  return (
    <div className="relative flex p-2 border-b border-(--twitter-gray)">
      <div className="p-2">
        <img
          src={user?.profilePicture || userProfilePlaceholder}
          alt="profile picture"
          className="w-10 h-10 rounded-full bg-gray-400 object-cover"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="border-b border-(--twitter-gray)">
          {isSubmittingPost && (
            <Progress
              className="absolute top-0 left-0 w-full"
              value={progress}
            />
          )}
          <textarea
            ref={textareaRef}
            autoComplete="off"
            placeholder="What's happening?"
            name="post"
            id="post"
            rows="1"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            onInput={handleTextareaInput}
            maxLength="280"
            className="p-2 text-xl resize-none text-gray-200 min-h-10 bg-transparent w-full focus:outline-none"
          ></textarea>
          <span className="p-2 flex gap-2 items-center text-sm font-bold text-(--twitter-blue)">
            <img
              src={globeIcon}
              alt="globe icon"
              className="bg-(--twitter-blue) w-3 h-3 rounded-full object-cover"
            />
            Everyone can reply
          </span>
        </div>
        <div className="flex justify-between items-center p-3 mt-2">
          <div>
            <img
              src={globeIcon}
              alt="globe icon"
              className="bg-(--twitter-blue) w-3 h-3 rounded-full object-cover"
            />
          </div>
          <Button
            onClick={handlePostSubmit}
            variant="secondary"
            className="bg-gray-400 rounded-full"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
