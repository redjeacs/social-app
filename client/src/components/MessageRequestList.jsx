function MessageRequestList({ onClose }) {
  return (
    <div
      onClick={() => onClose()}
      className="z-50 fixed flex items-center justify-center inset-0 w-screen h-screen bg-black/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black flex flex-col w-full max-w-lg border border-(--twitter-gray-100) rounded-xl p-6 shadow-lg duration-200 ease-in-out pb-0 min-h-[572px]"
      >
        <div className="flex flex-col text-center space-y-1.5 sm:text-left">
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-xl leading-7 text-(--twitter-white) tracking-tight font-extrabold">
              New message
            </h2>
            <button
              onClick={() => onClose()}
              className="inline-flex gap-1 items-center transition justify-center h-9 min-w-9 hover:bg-(--twitter-hover) rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                data-icon="icon-close"
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
                display="flex"
                role="img"
              >
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageRequestList;
