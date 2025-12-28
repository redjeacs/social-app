import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import globeIcon from "@/assets/globe.png";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import userProfilePlaceholder from "../assets/user.svg";
import { useNavigate, useParams } from "react-router-dom";

function ReplyForm() {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const textareaRef = useRef(null);

  const handleTextareaInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (isSubmittingReply) {
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 10;
        setProgress(progressValue);
        if (progressValue >= 100) {
          clearInterval(interval);
          setIsSubmittingReply(false);
          setProgress(0);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSubmittingReply]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReply(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: reply, userId: user.id }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setAlert({
          type: "error",
          message: `An error occured - ${data.message || res.statusText}`,
        });
        return;
      }

      setReply("");
      setIsReplying(false);
      navigate(0);
    } catch (err) {
      setAlert({
        type: "error",
        message: `An error occured - ${err.message || res.statusText}`,
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
      <div className="relative flex flex-col flex-1">
        <div className="">
          {isSubmittingReply && (
            <Progress
              className="absolute top-0 left-0 w-full"
              value={progress}
            />
          )}
          <textarea
            ref={textareaRef}
            autoComplete="off"
            placeholder="Post your reply"
            name="comment"
            id="comment"
            rows="1"
            value={reply}
            onFocus={() => setIsReplying(true)}
            onChange={(e) => setReply(e.target.value)}
            onInput={handleTextareaInput}
            maxLength="280"
            className="p-2 text-xl resize-none text-gray-200 min-h-10 bg-transparent w-full focus:outline-none"
          ></textarea>
          <div
            className={`justify-between items-center p-3 ${
              isReplying
                ? "flex mt-2"
                : "absolute top-1/2 -translate-y-1/2 right-0"
            }`}
          >
            {isReplying && (
              <div>
                <img
                  src={globeIcon}
                  alt="globe icon"
                  className="bg-(--twitter-blue) w-3 h-3 rounded-full object-cover"
                />
              </div>
            )}
            <Button
              onClick={handleReplySubmit}
              variant="secondary"
              className="bg-gray-400 rounded-full"
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyForm;
