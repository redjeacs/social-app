import { useOutletContext } from "react-router-dom";

function InboxPlaceholder() {
  const { openMessageRequestList } = useOutletContext();

  return (
    <>
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
        <div className="max-w-full whitespace-pre-wrap font-bold">New chat</div>
      </button>
    </>
  );
}

export default InboxPlaceholder;
