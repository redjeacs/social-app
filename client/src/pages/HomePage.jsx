import PostList from "@/components/PostList";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import userProfilePlaceholder from "../assets/user.svg";
import globeIcon from "../assets/globe.png";
import { Button } from "@/components/ui/button";

function HomePage() {
  const { user, token } = useAuth();
  const [selectedTab, setSelectedTab] = useState("For you");
  const [post, setPost] = useState("");
  const textareaRef = useRef(null);

  const handleTextareaInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
    // Handle post submission logic here
  };

  return (
    <div className="flex gap-6 min-h-screen">
      {(!user || !token) && <Navigate to="/signin" />}
      <div className="max-w-[600px] w-screen border-x  border-gray-700 text-white">
        <div className="sticky top-0 bg-black flex grow border-b border-gray-700">
          <div
            className={`relative flex flex-col text-gray-400 justify-center items-center flex-1 h-13 cursor-pointer ${
              selectedTab === "For you" ? "text-white" : ""
            }`}
            onClick={() => setSelectedTab("For you")}
          >
            For you
            <div
              className={`absolute bottom-0 min-w-14 h-1 rounded-full ${
                selectedTab === "For you"
                  ? "border-2 border-blue-500 font-bold"
                  : "font-normal"
              }`}
            ></div>
          </div>
          <div
            className={`relative flex flex-col text-gray-400 justify-center items-center flex-1 h-13 cursor-pointer ${
              selectedTab === "Following" ? "text-white" : ""
            }`}
            onClick={() => setSelectedTab("Following")}
          >
            Following
            <div
              className={`absolute bottom-0 min-w-14 h-1 rounded-full ${
                selectedTab === "Following"
                  ? "border-2 border-blue-500 font-bold"
                  : "font-normal"
              }`}
            ></div>
          </div>
        </div>
        <div className="flex p-2 border-b border-gray-700">
          <div className="p-2">
            <img
              src={user?.profilePicture || userProfilePlaceholder}
              alt="profile picture"
              className="w-10 h-10 rounded-full bg-gray-400 object-cover"
            />
          </div>

          <div className="flex flex-col flex-1">
            <div className="border-b border-gray-700">
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
        <div className="max-w-[600px] flex flex-col">
          <PostList />
        </div>
      </div>

      <div className=" min-w-[290px] hidden lg:block p-2">
        <div className="border border-gray-500 text-gray-500 p-2 rounded-full">
          search
        </div>
      </div>
    </div>
  );
}

export default HomePage;
