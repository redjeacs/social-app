import MessageRequestList from "@/components/MessageRequestList";
import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ChatPage() {
  const navigate = useNavigate();
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchDivRef = useRef(null);

  useEffect(() => {
    if (searchFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchFocus]);

  const openMessageRequestList = () => {
    setIsModalOpen(true);
  };

  const enableSearch = () => {
    setSearchFocus(true);
  };

  const disableSearch = () => {
    if (searchValue === "") {
      setSearchFocus(false);
    }
  };

  const clearSearchValue = () => {
    setSearchValue("");
  };

  return (
    <div className="flex w-full h-full">
      {isModalOpen && (
        <MessageRequestList onClose={() => setIsModalOpen(false)} />
      )}
      <div className="flex flex-col h-full md:min-w-[400px] w-full xl:w-[35%] shrink-0 md:border-x border-(--twitter-border)">
        {/* Header Section */}
        <div className="flex items-center justify-between py-2 px-4 h-16 text-(--twitter-white)">
          <h1 className="font-bold text-xl leading-6 font-[var-(--font-chirp)]">
            Chat
          </h1>
          <div className="flex items-center">
            <button
              onClick={() => navigate("/chat/settings")}
              className="min-w-9 min-h-9 inline-flex gap-1 justify-center items-center cursor-pointer hover:bg-(--twitter-hover) duration-200 border-solid rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                data-icon="icon-settings-stroke"
                viewBox="0 0 24 24"
                role="img"
                className="w-5 h-5"
              >
                <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
              </svg>
            </button>
            <button
              onClick={openMessageRequestList}
              className="min-w-9 min-h-9 inline-flex gap-1 justify-center items-center cursor-pointer hover:bg-(--twitter-hover) duration-200 border-solid rounded-full"
            >
              <svg
                viewBox="0 0 24 24"
                fill="var(--twitter-white)"
                className="w-5 h-5"
              >
                <g>
                  <path d="M4.49805 19C4.22205 19 3.99805 18.776 3.99805 18.5V10.462L11.998 14.099L19.998 10.462V13H21.998V5.5C21.998 4.122 20.876 3 19.498 3H4.49805C3.12005 3 1.99805 4.122 1.99805 5.5V18.5C1.99805 19.878 3.12005 21 4.49805 21H11V19H4.49805ZM4.49805 5H19.498C19.774 5 19.998 5.224 19.998 5.5V8.265L11.998 11.902L3.99805 8.265V5.5C3.99805 5.224 4.22205 5 4.49805 5ZM14 18H17V15H19V18H22V20H19V23H17V20H14V18Z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="px-4 py-1">
          <div
            ref={searchDivRef}
            onClick={enableSearch}
            className="flex cursor-text justify-center items-center gap-2 p-2 ps-3 pe-3 bg-(--twitter-gray-0) overflow-hidden placeholder:text-gray-800 rounded-full border border-solid focus-within:bg-transparent focus-within:border-(--twitter-blue) border-(--twitter-gray-50)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="var(--twitter-gray-700)"
              data-icon="icon-search-stroke"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              display="flex"
              role="img"
              className="h-5 w-5 text-gray-700 shrink-0"
            >
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </svg>
            <div
              className={`${searchFocus && "hidden"} text-(--twitter-gray-700)`}
            >
              Search
            </div>
            <input
              ref={searchInputRef}
              placeholder="Search"
              className={`${searchFocus ? "block" : "hidden"} border-box font-chirp m-0 flex-1 bg-transparent font-normal outline-none disabled:opacity-50 placeholder:text-gray-700`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={disableSearch}
            ></input>
            <button
              onClick={clearSearchValue}
              className={`${searchValue ? "flex" : "hidden"} items-center justify-center min-w-6 h-6 px-3 text-(--twitter-gray-700) cursor-pointer hover:bg-(--twitter-text)/40 rounded-full duration-200`}
            >
              <div className="text-sm">Clear</div>
            </button>
          </div>
        </div>
        {/* Buttons */}
        <div className="py-3">
          <div className="px-4">
            <div className="inline-flex h-9 w-fit items-center justify-center rounded-lg gap-3">
              <button className="flex items-center justify-center px-3 py-1 text-[15px] leading-5 font-semibold bg-(--twitter-white) border border-(--twitter-white) text-black rounded-full cursor-pointer">
                All
              </button>
              <button
                onClick={() => navigate("/chat/requests")}
                className="flex items-center justify-center px-3 py-1 text-[15px] leading-5 font-medium border border-(--twitter-gray-100) text-(--twitter-gray-700) rounded-full cursor-pointer hover:bg-(--twitter-gray-50) duration-200"
              >
                Requests
              </button>
            </div>
          </div>
        </div>
        {/* Inbox */}
        <div className="flex flex-col grow items-center justify-center gap-2">
          <div className="text-[76px] mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-icon="icon-messages-stroke"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              display="flex"
              role="img"
              className="rotate-[-8.29deg]"
            >
              <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
            </svg>
          </div>
          <div className="max-w-full whitespace-pre-wrap text-(--twitter-white) text-2xl leading-7 font-medium">
            Empty inbox
          </div>
          <div className="max-w-full whitespace-pre-wrap text-(--twitter-gray-700) text-[15px]">
            Message someone
          </div>
        </div>
      </div>
      {/* Message Box */}
      <div className="hidden xl:flex flex-col w-full h-full justify-center items-center grow gap-6">
        <Outlet context={{ openMessageRequestList }} />
      </div>
    </div>
  );
}

// Add profile icon onto explore and chat page homepage profile and logo above

export default ChatPage;
