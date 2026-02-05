import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import userProfilePlaceholder from "../assets/user.svg";
import globeIcon from "../assets/globe.png";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { GiphyFetch } from "@giphy/js-fetch-api";

function PostForm({ isPostFormOpen, setIsPostFormOpen }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const { setAlert } = useAlert();
  const textareaRef = useRef(null);
  const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

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
        `${import.meta.env.VITE_API_URL}/api/posts/${user.id}`,
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
      if (window.location.pathname === `/`) navigate(0);
      if (isPostFormOpen) setIsPostFormOpen(false);
    } catch (err) {
      setAlert({
        type: "error",
        message: `An error occured - ${err.message}`,
      });
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setPost((prevPost) => prevPost + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const searchGifs = async (query) => {
    try {
      const { data } = await giphyFetch.search(query || "trending", {
        limit: 10,
      });
      setGifs(data);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to load GIFs" });
    }
  };

  const handleGifSelect = (gif) => {
    setSelectedGif(gif.images.fixed_height.url);
    setShowGifPicker(false);
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
        <div className="border-b border-(--twitter-gray) grow">
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
            className={`p-2 text-xl resize-none text-gray-200 bg-transparent w-full focus:outline-none ${isPostFormOpen ? "min-h-24" : "min-h-10"}`}
          ></textarea>
          {selectedGif && (
            <div className="p-2">
              <img
                src={selectedGif}
                alt="selected gif"
                className="w-32 h-32 rounded object-cover"
              />
              <button
                onClick={() => setSelectedGif(null)}
                className="text-sm text-(--twitter-blue) mt-1"
              >
                Remove
              </button>
            </div>
          )}
          <span className="p-2 flex gap-2 items-center text-sm font-bold text-(--twitter-blue)">
            <img
              src={globeIcon}
              alt="globe icon"
              className="bg-(--twitter-blue) w-3 h-3 rounded-full object-cover"
            />
            Everyone can reply
          </span>
        </div>
        <div className="flex justify-between items-center p-1 mt-1 relative">
          <div className="flex">
            <DropdownMenu open={showGifPicker} onOpenChange={setShowGifPicker}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onClick={() => {
                    if (!showGifPicker) searchGifs("trending");
                  }}
                  className="text-(--twitter-blue) hover:bg-(--twitter-blue)/10 rounded-full p-2 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <g>
                      <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                    </g>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2 bg-gray-900 border-gray-700">
                <input
                  type="text"
                  placeholder="Search GIFs..."
                  onChange={(e) => searchGifs(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-white rounded mb-2 focus:outline-none text-sm"
                />
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {gifs.map((gif) => (
                    <img
                      key={gif.id}
                      src={gif.images.fixed_height.url}
                      alt="gif"
                      onClick={() => handleGifSelect(gif)}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu
              open={showEmojiPicker}
              onOpenChange={setShowEmojiPicker}
            >
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-center text-(--twitter-blue) hover:bg-(--twitter-blue)/10 rounded-full p-1.5 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <g>
                      <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                    </g>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 bg-transparent border-0">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme="dark"
                  width={320}
                  height={400}
                  lazyLoadEmojis="true"
                  emojiStyle="twitter"
                  skinTonesDisabled
                  className="custom-scrollbar bg-black!"
                />
              </DropdownMenuContent>
            </DropdownMenu>
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
