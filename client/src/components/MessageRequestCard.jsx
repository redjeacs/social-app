import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MessageRequestCard({ searchedUser, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRequestAllowed, setIsRequestAllowed] = useState(false);

  useEffect(() => {
    if (
      searchedUser.following.some(
        (followedUser) => followedUser.id === user.id,
      ) ||
      searchedUser.id === user.id ||
      searchedUser.messageStatus === "Everyone"
    )
      setIsRequestAllowed(true);
  }, [searchedUser]);

  return (
    <li
      onClick={() => {
        if (isRequestAllowed) {
          onClose();
          navigate(`/chat/${user.id}/with/${searchedUser.id}`);
        }
      }}
      className="w-full"
    >
      <div
        className={`flex w-full gap-3 p-2 items-center rounded-lg select-none ${isRequestAllowed ? "hover:bg-(--twitter-gray-50) cursor-pointer" : "opacity-20"}`}
      >
        <div className="relative isolate min-size flex overflow-hidden bg-(--twitter-gray-300) rounded-full min-w-10 min-h-10 size-10 transition duration-200 hover:brightness-90">
          <img
            src={searchedUser.profile}
            alt="user avatar"
            className="size-full brightness-100 object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden flex-col items-start gap-0">
          <div className=" flex items-center gap-1 shrink-0 max-w-full text-(--twitter-whtie) line-clamp-1 font-bold leading-5">
            {searchedUser.firstName} {searchedUser.lastName}
          </div>
          <div className=" max-w-full flex text-(--twitter-gray-700) line-clamp-1 leading-5">
            @{searchedUser.username}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MessageRequestCard;
