import PostForm from "./PostForm";

function PostFormModal({ isPostFormOpen, setIsPostFormOpen }) {
  return (
    isPostFormOpen && (
      <div
        onClick={() => setIsPostFormOpen(false)}
        className="fixed inset-0 w-screen h-screen bg-[rgba(91,112,131,0.4)] start-0 end-0 z-10 flex justify-center"
      >
        {/* PostForm */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[5%] min-w-150 max-h-[90vh] max-w-[80vw] shrink rounded-2xl overflow-hidden bg-black"
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center px-4 max-w-150 w-full h-13">
              <button
                onClick={() => setIsPostFormOpen(false)}
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
            <div className="px-2">
              <PostForm
                isPostFormOpen={isPostFormOpen}
                setIsPostFormOpen={setIsPostFormOpen}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PostFormModal;
