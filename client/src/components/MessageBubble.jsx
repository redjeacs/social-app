import { useAuth } from "@/contexts/AuthContext";
import { formatTimeSimple } from "@/utils/formatDate";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

function MessageBubble({ message, nextMessage }) {
  const { user } = useAuth();
  const [bubbleHover, setBubbleHover] = useState(false);

  const isSender = message?.senderId === user?.id;
  const isEnd = !nextMessage || nextMessage?.senderId !== message?.senderId;

  if (!message)
    return (
      <div className="w-full flex justify-center p-2">
        <Spinner />
      </div>
    );

  return (
    <>
      <li className="w-full">
        <div
          className={`flex px-4 py-1 ${isSender ? "justify-end" : "justify-start"}`}
        >
          <div
            onMouseOver={() => setBubbleHover(true)}
            onMouseLeave={() => setBubbleHover(false)}
            className="grid gap-x-2 gap-y-0.5 max-w-[calc(55%+128px)] grid-cols-[auto_auto_auto_auto] items-center -me-4"
          >
            <div className="flex flex-col gap-1 items-end">
              {message.attachment && (
                <img
                  src={message.attachment}
                  alt="Message Attachment"
                  loading="lazy"
                  className="bg-(twitter-gray-50) object-cover cursor-pointer overflow-hidden  border border-(--twitter-gray-100) rounded-2xl"
                />
              )}
              {message.body !== "" && (
                <div
                  className={`relative flex items-end px-4 py-2 rounded-2xl gap-1 ${isSender ? "bg-(--twitter-blue)" : "bg-(--twitter-gray-50)"}`}
                >
                  <span className="max-w-full leading-4.5">{message.body}</span>

                  <span
                    aria-hidden="true"
                    className={`${isEnd ? "inline-block" : "hidden"} min-w-13 pl-2 user-select-none`}
                  >
                    <div className="flex items-center justify-end text-white ml-auto shrink-0 gap-1 max-w-full text-xs leading-3">
                      {formatTimeSimple(new Date(message.createdAt))}
                    </div>
                  </span>
                </div>
              )}
            </div>
            <div
              className={`w-32 flex items-center gap-1 min-h-8 ${isSender ? "flex-row-reverse" : ""}`}
              style={isSender ? { gridArea: "1" } : {}}
            >
              <button
                className={`${bubbleHover ? "inline-flex" : "hidden"} items-center gap-1 justify-center w-8 h-8 text-(--twitter-white) hover:bg-(--twitter-hover) rounded-full cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  data-icon="icon-more"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  display="flex"
                  role="img"
                >
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default MessageBubble;
