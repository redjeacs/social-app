import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const navigate = useNavigate();
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  const searchDivRef = useRef(null);

  useEffect(() => {
    if (searchFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchFocus]);

  const openMessageRequestList = () => {
    // Logic to open message request list
    console.log("Message request list opened");
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
      <div className="flex flex-col h-full md:min-w-[400px] w-full xl:w-[35%] shrink-0 md:border-x border-(--twitter-border)">
        {/* Header Section */}
        <div className="flex items-center justify-between py-2 px-4 h-16 text-(--twitter-white)">
          <h1 className="font-bold text-xl leading-6 font-[var-(--font-chirp)]">
            Chat
          </h1>
          <div className="flex items-center">
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
        {/* Initial Placeholder */}
        <div className="text-[48px] size-24 rounded-full bg-(--twitter-gray-0) flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            data-icon="icon-messages-stroke"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            display="flex"
            role="img"
          >
            <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
          </svg>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="max-w-full whitespace-pre-wrap text-(--twitter-white) font-bold text-center text-xl leading-6">
            Start Conversation
          </div>
          <div className="max-w-full whitespace-pre-wrap text-(--twitter-gray-700) text-center leading-6">
            Choose from your existing conversations, or start a new one.
          </div>
        </div>
        <button
          onClick={openMessageRequestList}
          className="inline-flex gap-1 items-center bg-(--twitter-white) text-black rounded-full h-9 min-w-9 px-4 hover:bg-(--twitter-white)/80 duration-200 cursor-pointer"
        >
          <div className="max-w-full whitespace-pre-wrap font-bold">
            New chat
          </div>
        </button>
      </div>
    </div>
  );
}

// Add profile icon onto explore and chat page homepage profile and logo above

export default ChatPage;
