import { useState } from "react";
import Post from "./Post";

function PostList() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="flex flex-col w-full ">
      {posts && posts.length > 0 ? (
        posts?.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <>
          <div className="flex w-full items-stretch p-4 min-h-100 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
            <p>no posts yet be the first to post</p>
          </div>
          <div className="flex w-full items-stretch p-4 min-h-100 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
            <p>no posts yet be the first to post</p>
          </div>
          <div className="flex w-full items-stretch p-4 min-h-100 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
            <p>no posts yet be the first to post</p>
          </div>
          <div className="flex w-full items-stretch p-4 min-h-100 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
            <p>no posts yet be the first to post</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PostList;
