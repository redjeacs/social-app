import { useNavigate } from "react-router-dom";
import SearchList from "@/components/SearchList";
import PostList from "@/components/PostList";
import HandleSearch from "@/utils/HandleSearch";

function ExplorePage() {
  const {
    searchBarFocus,
    setSearchBarFocus,
    searchQuery,
    query,
    toggleSearchBarFocus,
    handleInputBlur,
    handleSearchQuery,
    posts,
  } = HandleSearch();
  const navigate = useNavigate();

  const handleBackNavigate = () => {
    if (searchBarFocus) {
      setSearchBarFocus(false);
      return;
    }
    navigate(-1);
  };

  return (
    <div className="w-full h-full mb-15">
      <div className="px-4 w-full h-13 flex items-center justify-center">
        <div
          className={` ${
            searchBarFocus || query ? "flex" : "hidden"
          } flex-col min-w-14 items-start self-stretch justify-center min-h-8`}
        >
          <button
            onClick={handleBackNavigate}
            className="min-h-9 min-w-9 cursor-pointer rounded-full hover:bg-(--twitter-hover) duration-20"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden={true}
              fill="rgb(239,243,244)"
              className="w-full h-5"
            >
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </button>
        </div>
        <div className={`relative flex flex-col grow shrink`}>
          <label
            htmlFor="search"
            className={`flex items-center border mx-1 ${
              searchBarFocus
                ? "border-2 border-(--twitter-blue)"
                : "border-(--twitter-gray)"
            } text-(--twitter-gray) p-2.5 rounded-full`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 740 840"
              fill="var(--twitter-gray)"
              className="opacity-100 w-4 h-4"
            >
              <path d="M734 668q8 9 0 17l-49 49q-3 3-8 3t-8-3L519 584q-50 38-112 55t-133 6q-53-8-99-33t-83-61t-59-85T3 366q-10-79 16-150T96 95t121-76T367 3q53 7 100 30t84 59t62 82t33 100q11 69-6 131t-55 114zM325 557q48 0 90-18t74-50t50-74t18-90t-18-90t-50-74t-74-50t-90-18t-90 18t-73 50t-50 74t-18 90t18 90t50 74t73 50t90 18" />
            </svg>
            <input
              type="text"
              autoComplete="off"
              placeholder="Search"
              name="search"
              id="search"
              value={searchQuery}
              onFocus={toggleSearchBarFocus}
              onBlur={handleInputBlur}
              onChange={(e) => handleSearchQuery(e)}
              className="text-sm outline-none placeholder-(--twitter-gray) bg-transparent w-full pl-1 pr-4 leading-5 text-white caret-(--twitter-blue)"
            />
          </label>
          <div className="relative flex items-stretch flex-col flex-1 bg-black z-2">
            <div
              className={`absolute ${
                searchBarFocus ? "flex" : "hidden"
              } flex-col items-stretch  w-full min-h-25 max-h-[calc(80vh-53px)] overflow-y-auto bg-black custom-scrollbar overscroll-contain rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_1px_rgba(255,255,255,0.15)]`}
            >
              <div className="">
                {searchQuery ? (
                  <SearchList searchQuery={searchQuery} />
                ) : (
                  <div className="text-[rgb(113,118,123)] leading-5 text-center p-3 pt-5">
                    <span>Try searching for people</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col min-w-14 items-end self-stretch justify-center min-h-8`}
        >
          <button
            onClick={handleBackNavigate}
            className="min-h-9 min-w-9 cursor-pointer rounded-full hover:bg-(--twitter-hover) duration-20"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="rgb(239,243,244)"
              className="w-full h-5"
            >
              <g>
                <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      {query ? <PostList postsData={posts} /> : <PostList />}
    </div>
  );
}

export default ExplorePage;
