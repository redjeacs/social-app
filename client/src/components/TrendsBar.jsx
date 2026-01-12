import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FollowCard from "./FollowCard";

function TrendsBar() {
  const { user, token } = useAuth();
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
          }
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

  return (
    <div className="flex-col gap-4 min-w-[290px] hidden xl:w-[350px] lg:flex p-2 text-white">
      {searchBar ? (
        <label className="flex items-center border border-(--twitter-gray) text-(--twitter-gray) p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 740 840"
            fill="#e7e9ea"
            className="opacity-100 w-4 h-4"
          >
            <path d="M734 668q8 9 0 17l-49 49q-3 3-8 3t-8-3L519 584q-50 38-112 55t-133 6q-53-8-99-33t-83-61t-59-85T3 366q-10-79 16-150T96 95t121-76T367 3q53 7 100 30t84 59t62 82t33 100q11 69-6 131t-55 114zM325 557q48 0 90-18t74-50t50-74t18-90t-18-90t-50-74t-74-50t-90-18t-90 18t-73 50t-50 74t-18 90t18 90t50 74t73 50t90 18" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="text-sm outline-none placeholder-(--twitter-gray) bg-transparent ml-2 w-full text-white"
          />
        </label>
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
