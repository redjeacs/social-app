import { useAuth } from "@/contexts/AuthContext";
import { formatDateSimple } from "@/utils/formatDate";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MessageBubble from "./MessageBubble";
import { useSocket } from "@/contexts/SocketContext";
import { useAlert } from "@/contexts/AlertContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { GiphyFetch } from "@giphy/js-fetch-api";
import EmojiPicker from "emoji-picker-react";

function MessageList({ friend }) {
  const { user, token } = useAuth();
  const { socket } = useSocket();
  const { setAlert } = useAlert();
  const [conversation, setConversation] = useState({});
  const [isMessaging, setIsMessaging] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  useEffect(() => {
    const createOrFetchConversation = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/conversations/${user.id}/with/${friend.id}`,
          {
            method: "POST",
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

    createOrFetchConversation();
  }, [user.id, friend.id]);

  useEffect(() => {
    if (!socket || !conversation?.id) return;
    socket.emit("joinConversation", conversation.id);

    return () => {
      socket.emit("leaveConversation", conversation.id);
    };
  }, [socket, conversation?.id]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      setConversation((prevConversation) => ({
        ...prevConversation,
        messages: [...prevConversation.messages, newMessage],
      }));
    };

    socket.on("messageReceived", handleReceiveMessage);

    return () => {
      socket.off("messageReceived", handleReceiveMessage);
    };
  }, [socket]);

  const handleTextareaInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
    if (textAreaRef.current.value !== "") {
      setIsMessaging(true);
    } else {
      setIsMessaging(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!socket) {
      setAlert({ type: "error", message: "Socket not connected" });
      return;
    }

    if (!message.trim() && !selectedImage) return;

    try {
      const messageData = {
        conversationId: conversation.id,
        senderId: user.id,
        body: message,
      };

      if (selectedImage) {
        messageData.media = {
          type: selectedImage.type,
          file: selectedImage.file,
        };
      }

      socket.emit("sendMessage", messageData, (res) => {
        if (res?.status === "ok") {
          setMessage("");
          setSelectedImage(null);
          textAreaRef.current.style.height = "auto";
          setIsMessaging(false);
        } else {
          setAlert({ type: "error", message: "Failed to send message" });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage({ type: "image", file: event.target?.result });
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsMessaging(true);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
    setIsMessaging(true);
  };

  const searchGifs = async (query) => {
    try {
      const { data } = await giphyFetch.search(query || "trending", {
        limit: 10,
      });
      setGifs(data);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to load GIFs" });
    }
  };

  const handleGifSelect = (gif) => {
    setSelectedImage({ type: "gif", file: gif.images.fixed_height.url });
    setShowGifPicker(false);
    setIsMessaging(true);
  };

  const handleGifOpenChange = (open) => {
    setShowGifPicker(open);
    if (open) searchGifs("");
  };

  if (!friend) return <div>loading</div>;
  return (
    <>
      <div className="flex-1 overflow-hidden isolate relative h-full">
        <div className="h-screen! w-full custom-scrollbar overflow-auto">
          <div className="h-21"></div>
          <div className="h-5"></div>
          <ul className="relative w-full">
            <li className=" w-full">
              {/* Friend Info */}
              <div className="flex flex-col items-center py-8 px-4">
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
                <div className="overflow-hidden flex items-center gap-1 shrink-0">
                  <div className="max-w-full text-(--twitter-white) text-lg leading-5 line-clamp-1 font-bold">
                    {friend.firstName} {friend.lastName}
                  </div>
                </div>
                <div className="max-w-full text-(--twitter-gray-700) leading-5">
                  @{friend.username}
                </div>
                <div className="max-w-full text-(--twitter-gray-700) leading-5">
                  Joined {formatDateSimple(new Date(friend.createdAt))}
                </div>
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
            {/* Message Bubbles List */}
            {conversation.messages &&
              conversation.messages.map((message, i) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  nextMessage={conversation.messages[i + 1]}
                />
              ))}
            <div ref={messagesEndRef} />
          </ul>
          <div className="h-23"></div>
        </div>
      </div>
      {/* Message Input */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 isolate w-full max-w-5xl p-4 z-10 ">
        <div className="relative flex w-full items-end gap-2">
          {/* Image Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 justify-center w-12 h-12 text-(--twitter-white) bg-(--twitter-gray-50) hover:bg-(--twitter-gray-100) rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                data-icon="icon-plus"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                role="img"
              >
                <path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"></path>
              </svg>
            </button>
          </div>
          {/* GIF Picker */}
          <DropdownMenu open={showGifPicker} onOpenChange={handleGifOpenChange}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 justify-center w-12 h-12 text-(--twitter-white) bg-(--twitter-gray-50) hover:bg-(--twitter-gray-100) rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  data-icon="icon-gif-pill-stroke"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  role="img"
                >
                  <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2 bg-black border-black custom-scrollbar">
              <input
                type="text"
                placeholder="Search GIFs..."
                onChange={(e) => searchGifs(e.target.value)}
                className="w-full p-2 text-white mb-2 border-2 border-(--twitter-gray-700) outline-none focus:border-(--twitter-blue) text-sm rounded-full"
              />
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {gifs.map((gif) => (
                  <img
                    key={gif.id}
                    src={gif.images.fixed_height.url}
                    alt="gif"
                    onClick={() => handleGifSelect(gif)}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Emoji Picker */}
          <DropdownMenu
            open={showEmojiPicker}
            onOpenChange={setShowEmojiPicker}
          >
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 justify-center w-12 h-12 text-(--twitter-white) bg-(--twitter-gray-50) hover:bg-(--twitter-gray-100) rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  data-icon="icon-smile-circle-flap"
                  viewBox="0 0 18 18"
                  width={20}
                  height={20}
                  display="flex"
                  role="img"
                >
                  <path
                    fill="currentColor"
                    d="M8.37435 7.12435C8.37435 8.27518 7.81435 9.20768 7.12435 9.20768C6.43435 9.20768 5.87435 8.27435 5.87435 7.12435C5.87435 5.97435 6.43435 5.04102 7.12435 5.04102C7.81435 5.04102 8.37435 5.97268 8.37435 7.12435ZM12.541 7.12435C12.541 8.27518 11.981 9.20768 11.291 9.20768C10.601 9.20768 10.041 8.27435 10.041 7.12435C10.041 5.97435 10.601 5.04102 11.291 5.04102C11.981 5.04102 12.541 5.97268 12.541 7.12435ZM17.6852 7.42768C17.7278 7.74144 17.7492 8.05771 17.7493 8.37435C17.7493 12.7335 12.5327 17.7035 7.95768 17.7035H7.50518C3.54102 17.5293 0.666016 13.9577 0.666016 9.20768C0.668442 6.94304 1.56914 4.77184 3.17049 3.17049C4.77184 1.56914 6.94304 0.668442 9.20768 0.666016C13.5068 0.666016 17.151 3.57268 17.6843 7.42685M9.20768 2.33268C7.38493 2.33467 5.6374 3.05963 4.34852 4.34852C3.05963 5.6374 2.33467 7.38493 2.33268 9.20768C2.33268 12.4743 4.11935 15.8593 7.53352 16.036C8.0806 15.9974 8.59342 15.7554 8.97101 15.3577C9.21219 15.0077 9.38339 14.6144 9.47518 14.1993C9.38685 14.2077 9.29768 14.2077 9.20768 14.2077C6.14185 14.2077 5.12435 11.2635 5.08435 11.1377L6.66768 10.6102L5.87435 10.8743L6.66351 10.606C6.84734 11.1448 7.18753 11.6167 7.64067 11.9613C8.09381 12.3059 8.63935 12.5078 9.20768 12.541C9.47439 12.5429 9.73969 12.5021 9.99351 12.4202C10.2212 11.8096 10.5835 11.2582 11.0535 10.8068C11.8317 10.1345 12.7858 9.69848 13.8035 9.55018C14.3575 9.4738 14.8874 9.27449 15.3543 8.96685C15.7434 8.59964 15.9811 8.10032 16.021 7.56685C15.5585 4.57768 12.646 2.33102 9.20768 2.33102V2.33268Z"
                  ></path>
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 bg-transparent border-0">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="dark"
                width={320}
                height={400}
                lazyLoadEmojis="true"
                emojiStyle="twitter"
                skinTonesDisabled
                className="custom-scrollbar bg-black!"
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <form
            onSubmit={(e) => handleMessageSubmit(e)}
            className="flex-1 relative"
          >
            <div className="flex flex-col items-center w-full overflow-hidden placeholder:text-(--twitter-gray-800) bg-(--twitter-gray-50) rounded-3xl py-2 text-lg leading-6">
              {/* Image Preview */}
              {selectedImage && (
                <div className="flex flex-col gap-2 p-2 w-full max-h-50 relative rounded overflow-auto border-(--twitter-border) border-b">
                  <div className="relative self-start max-w-full">
                    <img
                      src={selectedImage.file}
                      alt={`selected ${selectedImage.type}`}
                      loading="lazy"
                      className="max-w-full max-h-45 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        if (textAreaRef.current.value === "")
                          setIsMessaging(false);
                      }}
                      className="absolute flex top-3 right-3 gap-1 items-center transition bg-[rgb(15,20,25,0.75)] hover:bg-[rgb(15,20,25,0.5)] justify-center h-7.5 min-w-7.5 rounded-full cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <g>
                          <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-end w-full px-2">
                <textarea
                  ref={textAreaRef}
                  name="body"
                  id="body"
                  placeholder="Message"
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onInput={handleTextareaInput}
                  className={`box-border text-(--twitter-white) m-0 w-full resize-none bg-transparent outline-none placeholder:text-(--twitter-gray-700) flex-1 min-h-8 max-h-60 px-2 py-1 custom-scrollbar`}
                ></textarea>
                <div className="self-end h-8">
                  <button
                    className={`inline-flex items-center gap-1 justify-center w-8 h-8 text-(--twitter-white) bg-(--twitter-blue) hover:bg-(--twitter-blue-hover) rounded-full cursor-pointer transition-opacity duration-200 ease-in-out 
                      ${isMessaging ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      data-icon="icon-arrow-up"
                      viewBox="0 0 24 24"
                      role="img"
                      className="h-4.5 w-4.5"
                    >
                      <path d="M12 3.59l7.457 7.45-1.414 1.42L13 7.41V21h-2V7.41l-5.043 5.05-1.414-1.42L12 3.59z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 start-0 end-3 pointer-events-none bg-linear-to-b from-transparent via-black/80 to-black h-20"></div>
    </>
  );
}

export default MessageList;
