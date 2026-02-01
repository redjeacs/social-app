import PostList from "@/components/PostList";
import { useState } from "react";
import FollowingList from "@/components/FollowingList";
import PostForm from "@/components/PostForm";

function PostsPage() {
  const [selectedTab, setSelectedTab] = useState("For you");
  const [yourRecentPosts, setYourRecentPosts] = useState([]);

  return (
    <>
      <div className="sticky w-full top-0 z-10 bg-black flex grow border-b border-(--twitter-gray)">
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
                ? "border-2 border-(--twitter-blue) font-bold"
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
                ? "border-2 border-(--twitter-blue) font-bold"
                : "font-normal"
            }`}
          ></div>
        </div>
      </div>
      {/* Post Form */}
      <PostForm
        yourRecentPosts={yourRecentPosts}
        setYourRecentPosts={setYourRecentPosts}
      />
      {/* Tabs */}
      <div className="max-w-150 flex flex-co pb-15">
        {selectedTab === "Following" && (
          <FollowingList yourRecentPosts={yourRecentPosts} />
        )}
        {selectedTab === "For you" && (
          <PostList yourRecentPosts={yourRecentPosts} />
        )}
      </div>
    </>
  );
}

export default PostsPage;
