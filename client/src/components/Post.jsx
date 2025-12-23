import userIcon from "../assets/user.svg";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "../contexts/AuthContext";

function Post({ post }) {
  const { user } = useAuth();
  return (
    <div className="flex w-full items-stretch border-b border-gray-700 p-4 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
      <div className="h-full w-10">
        <img
          src={post.profile || userIcon}
          alt="profile icon"
          className="w-10 h-10"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2">
          <span>{`${user?.firstName} ${user?.lastName}`}</span>
          <span>{user?.email}</span>
          <div>-</div>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default Post;
