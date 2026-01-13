import userIcon from "@/assets/user.svg";
import { useNavigate } from "react-router-dom";

function PlainUserCard({ user }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/profile/${user.id}`)}
      className="cursor-pointer py-3 px-4 hover:bg-(--twitter-hover) transition-colors duration-500"
    >
      <div className="flex items-stretch">
        <div className="basis-10 grow-0 justify-center mr-2 items-stretch transition-colors rounded-full bg-(--twitter-gray)">
          <img
            aria-hidden="true"
            src={user.profile || userIcon}
            alt="profile image"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start text-sm">
          <span className="font-bold">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-(--twitter-text)">@{user.username}</span>
        </div>
      </div>
    </button>
  );
}

export default PlainUserCard;
