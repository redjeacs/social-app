import { useNavigate } from "react-router-dom";

function MessageSettings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center h-full overflow-y-auto custom-scrollbar pb-16 px-4">
      <div className="flex w-full gap-4 items-center py-4 sticky top-0 bg-black z-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 justify-center w-9 h-9 text-(--twitter-white) hover:bg-(--twitter-hover) rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            data-icon="icon-arrow-left"
            viewBox="0 0 24 24"
            display="flex"
            role="img"
            className="w-5 h-5"
          >
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </svg>
        </button>
        <div className="max-w-full whitespace-pre-wrap text-(--twitter-white) text-[23px] leading-7 font-bold">
          Settings
        </div>
      </div>
      <div className="flex flex-col w-full max-w-2xl flex-1">
        <div className="flex flex-col gap-2 py-3">Allow</div>
      </div>
    </div>
  );
}

export default MessageSettings;
