import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function InboxList({ conversations }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const conversationsWithRecipient = useMemo(() => {
    return conversations.map((conversation) => ({
      ...conversation,
      recipient: conversation.participants.find(
        (participant) => participant.userId !== user.id,
      ),
    }));
  }, [conversations, user.id]);

  if (!conversationsWithRecipient) return <div>No conversations found.</div>;

  return (
    <ul className="w-full h-full">
      {conversationsWithRecipient?.map((conversation) => {
        const other = conversation.recipient || conversation.participants[0];

        return (
          <li
            key={conversation.id}
            onClick={() => navigate(`/chat/${user.id}/with/${other.user.id}`)}
            className="w-full h-20"
          >
            <div className="flex px-4 gap-4 items-stretch cursor-pointer hover:bg-(--twitter-gray-50)">
              <div className="py-3">
                <Link
                  to={`/profile/${other?.user.id}`}
                  className="min-size flex overflow-hidden bg-(--twitter-gray-300) rounded-full min-h-14 min-w-14 size-14 transition duration-200 hover:brightness-90"
                >
                  <img
                    src={other?.user.profile}
                    alt={`user avatar`}
                    className="size-full brightness-100 object-cover"
                    loading="lazy"
                    draggable="false"
                  />
                </Link>
              </div>
              <div className="flex flex-col gap-1 justify-center border-b border-(--twitter-gray-50) flex-1">
                <div className="flex justify-between items-center text-(--twitter-white)">
                  <div className="flex max-w-full line-clamp-1 font-bold leading-5">
                    {other?.user.firstName} {other?.user.lastName}
                  </div>
                </div>
                <div className="flex gap-1.5 items-center shrink-0 text-(--twitter-gray-700) leading-5">
                  {conversation.messages[conversation.messages.length - 1]
                    ?.body || "No messages yet."}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default InboxList;
