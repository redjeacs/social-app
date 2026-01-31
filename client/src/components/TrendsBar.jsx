import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FollowCard from "./FollowCard";
import HandleSearch from "@/utils/HandleSearch";
import SearchList from "./SearchList";

function TrendsBar() {
  const { user, token } = useAuth();
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
  const [followSuggestion, setFollowSuggestion] = useState([]);
  const [followContainer, setFollowContainer] = useState(true);
  const [searchBar, setSearchBar] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchFollowSuggestions = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/follow/${user.id}?take=3`,
          {
            method: "GET",
            headers: {
              "Conent-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok) console.error("failed to fetch follow suggestons");

        setFollowSuggestion(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFollowSuggestions();
  }, []);

  useEffect(() => {
    const checkBrowserPath = () => {
      setFollowContainer(true);
      setSearchBar(true);
      if (pathname === "/follow") setFollowContainer(false);
      if (pathname === "/explore") setSearchBar(false);
    };
    checkBrowserPath();
  }, [pathname]);

  if (pathname.includes("/chat")) return null;

  return (
    <div className="flex-col gap-4 min-w-72.5 hidden xl:w-87.5 lg:flex p-2 text-white">
      {searchBar ? (
        <>
          <label className="flex items-center border border-(--twitter-gray) text-(--twitter-gray) p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 740 840"
              fill="#e7e9ea"
              className="opacity-100 w-4 h-4"
            >
              <path d="M734 668q8 9 0 17l-49 49q-3 3-8 3t-8-3L519 584q-50 38-112 55t-133 6q-53-8-99-33t-83-61t-59-85T3 366q-10-79 16-150T96 95t121-76T367 3q53 7 100 30t84 59t62 82t33 100q11 69-6 131t-55 114zM325 557q48 0 90-18t74-50t50-74t18-90t-18-90t-50-74t-74-50t-90-18t-90 18t-73 50t-50 74t-18 90t18 90t50 74t73 50t90 18" />
            </svg>
            {/* use explore page search components */}
            <input
              autoComplete="off"
              type="text"
              placeholder="Search"
              id="search"
              name="search"
              value={searchQuery}
              onFocus={toggleSearchBarFocus}
              onBlur={handleInputBlur}
              onChange={(e) => handleSearchQuery(e)}
              className="text-sm outline-none placeholder-(--twitter-gray) bg-transparent ml-2 w-full text-white"
            />
          </label>
          <div className="relative flex items-stretch flex-col bg-black z-2">
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
        </>
      ) : (
        <div className="border border-(--twitter-text)/50 my-2"></div>
      )}
      <div className="flex flex-col gap-4 border border-(--twitter-gray) rounded-lg p-3">
        <h1 className="font-bold text-xl">Subscribe to Premium</h1>
        <p className="text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <Button className="w-fit bg-(--twitter-blue) text-white font-bold rounded-full">
          Subscribe
        </Button>
      </div>
      <div className="border border-(--twitter-gray)"></div>
      {followContainer && (
        <div className="flex flex-col gap-4 border border-(--twitter-gray) rounded-lg p-3">
          <h1 className="font-bold text-lg">Who to follow</h1>
          {followSuggestion.length > 0 &&
            followSuggestion.map((user) => (
              <FollowCard key={user.id} userToFollow={user} trendsBar={true} />
            ))}

          <Link to="/follow" className="text-(--twitter-blue)">
            Show more
          </Link>
        </div>
      )}
    </div>
  );
}

export default TrendsBar;
