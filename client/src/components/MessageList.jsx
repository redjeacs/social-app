import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MessageList({ friend, conversationId }) {
  const { user, token } = useAuth();
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/conversation/${user.id}-${conversationId}`,
          {
            method: "GET",
            headers: {
              "CONTENT-TYPE": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok)
          console.error(`Failed to fetch conversation: ${data.message}`);

        setConversation(data);
      } catch (err) {
        console.error(err);
      }
    };
  }, [conversationId]);

  if (!friend) return <div>loading</div>;
  return (
    <div className="h-screen! w-full custom-scrollbar overflow-auto">
      <div className="h-[84px]"></div>
      <div className="h-5"></div>
      <ul className="relative w-full">
        <li className="absolute w-full left-0 top-0">
          <div className="flex flex-col items-center py-8 px-4">
            {/* Friend Avatar */}
            <div className="mb-4">
              <div className="min-size flex overflow-hidden bg-(--twitter-gray-300) rounded-full min-h-16 min-w-16 size-16">
                <img
                  src={friend.profile}
                  alt="user avatar"
                  className="object-cover brightness-100"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>
            {/* Friend Name */}
            <div className="overflow-hidden flex items-center gap-1 shrink-0">
              <div className="max-w-full text-(--twitter-white) text-lg leading-5 line-clamp-1 font-bold">
                {friend.firstName} {friend.lastName}
              </div>
            </div>
            {/* Friend Username */}
            <div className="max-w-full text-(--twitter-gray-700) leading-5">
              @{friend.username}
            </div>
            {/* Friend Date Joined */}
            <div className="max-w-full text-(--twitter-gray-700) leading-5">
              {friend.createdAt}
            </div>
            {/* Profile Button */}
            <Link
              to={`/profile/${friend.id}`}
              className="gap-1 inline-flex items-center border border-solid duration-200 hover:bg-(--twitter-white)/90 justify-center h-9 min-w-9 px-4 leading-5 bg-(--twitter-white) border-transparent text-black rounded-full mt-6 cursor-pointer"
            >
              <div className="max-w-full whitespace-pre-wrap line-clamp-1 font-bold">
                View Profile
              </div>
            </Link>
          </div>
        </li>
      </ul>
      <div className="h-[92px]"></div>
    </div>
  );
}

export default MessageList;
