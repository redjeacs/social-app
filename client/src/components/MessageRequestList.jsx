import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import MessageRequestCard from "./MessageRequestCard";

function MessageRequestList({ onClose }) {
  const { user, token } = useAuth();
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      const userId = user.id;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok) console.error("failed to fetch user");

        const users = [data, ...data.following];

        setFollowedUsers(users);
      } catch (err) {
        console.error(err);
      }
    };

    const searchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/search/${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok) console.error("unable to search users");

        setSearchedUsers(data.users);
      } catch (err) {
        console.error(err);
      }
    };

    if (searchQuery !== "") searchUsers();
    fetchFollowedUsers();
  }, [searchQuery]);

  return (
    <div
      onClick={() => onClose()}
      className="z-50 fixed flex items-center justify-center inset-0 w-screen h-screen bg-black/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black flex flex-col gap-4 w-full max-w-lg border border-(--twitter-gray-100) rounded-xl p-6 shadow-lg duration-200 ease-in-out pb-0 min-h-[572px]"
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
        {/* Search Bar */}
        <div
          className={`${searchFocus ? "border-(--twitter-blue)" : "border-(--twitter-gray-100)"} flex items-center gap-2 overflow-hidden rounded-xl border border-solid bg-(--twitter-gray-0) p-2 ps-3 pe-4`}
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
            className="h-5 w-5 text-gray-700"
          >
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search name or username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            className="border-box text-(--twitter-white) m-0 w-full bg-transparent placeholder:text-(--twitter-gray-700) outline-none"
          />
        </div>
        {/* Create Group Button */}
        <button className="inline-flex gap-1 items-center boder border-solid min-w-9 h-9 px-4 text-(--twitter-blue) rounded-full cursor-pointer hover:bg-(--twitter-blue)/10 duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            data-icon="icon-people-group-3"
            viewBox="0 0 24 24"
            width="20px"
            height="20px"
            display="flex"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.0003 19H19.9999C21.1598 19 22.1087 17.9982 21.7536 16.894C20.7757 13.8524 18.2557 12.5926 16.0004 13.1147M11.0004 7C11.0004 8.65685 9.65721 10 8.00036 10C6.3435 10 5.00036 8.65685 5.00036 7C5.00036 5.34315 6.3435 4 8.00036 4C9.65721 4 11.0004 5.34315 11.0004 7ZM19.5004 7.5C19.5004 8.88071 18.3811 10 17.0004 10C15.6196 10 14.5004 8.88071 14.5004 7.5C14.5004 6.11929 15.6196 5 17.0004 5C18.3811 5 19.5004 6.11929 19.5004 7.5ZM11.8544 20H4.1463C2.98636 20 2.04449 18.9995 2.35619 17.8822C4.17226 11.3726 11.8284 11.3726 13.6445 17.8822C13.9562 18.9995 13.0144 20 11.8544 20Z"
            ></path>
          </svg>
          <div className="max-w-full whitespace-pre-wrap line-clamp-1 font-bold">
            Create a group
          </div>
        </button>
        <div className="max-h-96 custom-scrollbar overflow-auto w-full">
          {/* Users List */}
          <ul>
            {searchQuery ? (
              searchedUsers.length > 0 ? (
                searchedUsers.map((searchedUser) => (
                  <MessageRequestCard
                    key={searchedUser.id}
                    onClose={onClose}
                    searchedUser={searchedUser}
                  />
                ))
              ) : (
                <div className="flex justify-center text-(--twitter-gray-700)">
                  There are no users matching your description
                </div>
              )
            ) : (
              followedUsers.length > 0 &&
              followedUsers.map((searchedUser) => (
                <MessageRequestCard
                  key={searchedUser.id}
                  onClose={onClose}
                  searchedUser={searchedUser}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MessageRequestList;
