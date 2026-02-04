import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ChatroomInfo() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { recipientId } = useParams();
  const [recipientProfile, setRecipientProfile] = useState(null);

  useEffect(() => {
    const fetchRecipientProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${recipientId}`,
          {
            method: "GET",
            headers: {
              "CONTENT-TYPE": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok)
          console.error(`Unable to fetch user data: ${data.message}`);

        setRecipientProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipientProfile();
  }, [recipientId]);

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed inset-0 z-50 w-screen h-screen bg-black/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col overflow-y-auto outline-none fixed w-full max-w-lg 2xl:max-w-[640px] h-[650px] 2xl:h-[772px] max-h-[85vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-(--twitter-gray-50) shadow-lg duration-200 transition-all rounded-3xl bg-(--twitter-gray-0) custom-scrollbar"
      >
        {/* Header */}
        <div className="w-full shrink-0 py-2 px-4 sticky top-0 flex items-center justify-between z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex gap-1 items-center transition justify-center h-9 min-w-9 hover:bg-(--twitter-hover) rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-icon="icon-arrow-left"
              viewBox="0 0 24 24"
              className="text-[24px] w-5 h-5"
            >
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </svg>
          </button>
        </div>
        {/* Profile Descriptions */}
        {!recipientProfile ? (
          <div className="w-full h-24 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 pb-6">
            <div className="w-24 h-24">
              <Link
                to={`/profile/${recipientProfile.id}`}
                className="flex overflow-hidden bg-(--twitter-gray-300) rounded-full size-full transiton-all duration-200 hover:brightness-90"
              >
                <img
                  src={recipientProfile.profile}
                  alt="user avatar"
                  loading="lazy"
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col items-center gap-1 ">
              <Link
                to={`/profile/${recipientProfile.id}`}
                target="__blank"
                className="text-xl leading-5 font-bold"
              >
                {recipientProfile.firstName} {recipientProfile.lastName}
              </Link>
              <div className="max-w-full text-(--twitter-gray-700) line-clamp-1 leading-6 text-[17px]">
                @{recipientProfile.username}
              </div>
            </div>
            <div className="relative w-full flex flex-col gap-12 p-4">
              <div className="flex w-full gap-6 sm:gap-12 justify-center">
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => navigate(`/profile/${recipientId}`)}
                    className="size-16 rounded-full min-w-unset bg-(--twitter-gray-50) hover:bg-(--twitter-gray-100) p-4 flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      data-icon="icon-people2-stroke"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5Z"
                      ></path>
                      <path
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.9997 13C9.02123 13 6.67402 14.5539 5.43304 16.8621C4.59593 18.4191 6.02717 20 7.79494 20H16.2044C17.9722 20 19.4034 18.4191 18.5663 16.8621C17.3254 14.5539 14.9781 13 11.9997 13Z"
                      ></path>
                    </svg>
                  </button>
                  <div className="leading-5">Profile</div>
                </div>
                <div className="flex flex-col items-center gap-3 ">
                  <button className="size-16 rounded-full min-w-unset bg-(--twitter-gray-50) hover:bg-(--twitter-gray-100) p-4 flex items-center justify-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      data-icon="icon-search-stroke"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                    </svg>
                  </button>
                  <div className="leading-5">Search</div>
                </div>
                <div className="flex flex-col items-center gap-3 text-red-500">
                  <button className="size-16 rounded-full min-w-unset bg-(--twitter-gray-50) hover:bg-(--twitter-gray-100) p-4 flex items-center justify-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      data-icon="icon-trashcan-stroke"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path>
                    </svg>
                  </button>
                  <div className="leading-5 text-center">Delete Convo</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatroomInfo;
