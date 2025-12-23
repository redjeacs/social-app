import userIcon from "../assets/user.svg";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "../contexts/AuthContext";
import heartIcon from "../assets/heart.png";

function Post({ post }) {
  const { user } = useAuth();
  return (
    <div className="flex w-full items-stretch border-b border-gray-700 gap-2 p-4 pb-0 justify-center cursor-pointer hover:bg-[rgb(10,10,10)] ease-in-out duration-500">
      <div className="h-full w-10 bg-gray-400 rounded-full">
        <img
          src={post.profile || userIcon}
          alt="profile icon"
          className="w-10 h-10"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2">
          <span className="font-bold">{`${user?.firstName} ${user?.lastName}`}</span>
          <span className="text-(--twitter-text)">@{user?.username}</span>
          <div className="text-(--twitter-text)">·</div>
          <span className="text-(--twitter-text)">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <p>{post.content}</p>
        <div className="flex justify-around w-full text-(--twitter-text) mt-2">
          <div className="flex gap-2 items-center">
            <div className="hover:text-(--twitter-blue) hover:bg-[rgba(29,155,240,0.2)] p-2 rounded-full ease-in-out duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="var(--twitter-text)"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4.5 h-4.5"
              >
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </svg>
            </div>
            <span>{post.comments || ""}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="hover:text-[rgb(0,186,124)] hover:bg-[rgba(0,186,124,0.2)] p-2 rounded-full ease-in-out duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-repeat2-icon lucide-repeat-2 w-4.5 h-4.5"
              >
                <path d="m2 9 3-3 3 3" />
                <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                <path d="m22 15-3 3-3-3" />
                <path d="M11 6h6a2 2 0 0 1 2 2v10" />
              </svg>
            </div>
            <span>{post.retweet || ""}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="hover:text-[rgb(249,24,128)] hover:bg-[rgba(249,24,128,0.2)] p-2 rounded-full ease-in-out duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart-icon lucide-heart w-4.5 h-4.5"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </div>
            <span>{post.likes || ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
