import MessageList from "@/components/MessageList";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useParams, Link } from "react-router-dom";

function Chatbox() {
  const { user, token } = useAuth();
  const { recipientId } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${recipientId}`,
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
          console.error(`Unable to fetch user data: ${data.message}`);

        setFriend(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFriend();
  }, [user.id, recipientId]);

  if (!friend) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col w-full h-full grow relative">
      {/* <Outlet /> work on info modal later*/}
      {/* Header */}
      <div className="absolute top-0 start-0 end-0 z-10 h-20 pointer-events-none bg-linear-to-b from-black via-black/90 to-transparent"></div>
      <div className="flex w-full p-4 gap-4 items-center justify-between absolute z-10">
        <Link
          to={`/chat/${user.id}/with/${recipientId}/info`}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="min-size flex overflow-hidden bg-(--twitter-gray-300) rounded-full min-h-12 min-w-12 size-12">
            <img
              src={friend.profile}
              alt="user avatar"
              loading="lazy"
              className="brightness-100 object-cover"
              draggable="false"
            />
          </div>
          <div className="overflow-hidden flex items-center gap-1 max-w-full line-clamp-1 text-(--twitter-white) text-lg leading-5">
            {friend.firstName} {friend.lastName}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to={`/chat/${user.id}/with/${recipientId}/info`}
            className="inline-flex items-center gap-1 justify-center bg-(--twitter-gray-0) text-[15px] leading-5 text-(--twitter-white) hover:bg-(--twitter-gray-50) rounded-full min-w-1- w-12 h-12 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              role="img"
              className="w-5 h-5"
            >
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </Link>
        </div>
      </div>
      {/* Message List */}
      <MessageList friend={friend} />
    </div>
  );
}

export default Chatbox;
