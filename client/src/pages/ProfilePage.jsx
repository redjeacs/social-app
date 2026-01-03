import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAlert } from "@/contexts/AlertContext";
import { formatDate } from "@/utils/formatDate";

function ProfilePage() {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
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
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setAlert({ type: "error", message: "Failed to fetch user data" });
          return;
        }

        setUserData(data);
      } catch (err) {
        setAlert({
          type: "error",
          message: `An error occurred while fetching user data: ${err.message}`,
        });
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <>
      <Outlet />
      <div className="sticky top-0 flex w-full bg-black z-10 p-2 justify-between">
        <div className="flex gap-4 items-center">
          <button
            to="#"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[rgba(239,243,244,0.1)] rounded-full cursor-pointer"
          >
            <svg
              id="back-arrow"
              role="button"
              fill="white"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </button>
          <h1 className="text-xl font-bold">{`${userData.firstName} ${userData.lastName}`}</h1>
        </div>
      </div>
      {/* Cover Image */}
      <div className="w-full aspect-3/1 bg-[rgb(51,54,57)]">
        {userData.coverImage && (
          <img
            src={userData.coverImage}
            aria-placeholder="profile background image"
            className=" w-full h-full object-cover"
          ></img>
        )}
      </div>
      {/* Profile Info */}
      <div className=" pt-3 pb-0 px-4">
        {/* Profile Picture and Edit Button */}
        <div className="w-full mb-4 flex flex-col basis-auto items-stretch">
          <div className="relative flex gap-4 items-end mr-4 min-h-11.5 justify-between">
            <div className="relative flex justify-center items-stretch -mt-11 w-[25%] bg-black">
              <div className=" flex justify-center items-center absolute bottom-5 md:bottom-0 min-w-18 min-h-18 w-full aspect-square max-w-40 max-h-40 border-2 md:border-4 border-black rounded-full bg-gray-400">
                <img
                  className=" w-full h-full rounded-full opacity-75 object-cover"
                  src={userData.profile}
                  alt="profile image"
                ></img>
              </div>
            </div>
            <Link to="/profile/edit" className="mb-4">
              <Button
                variant="outline"
                className=" border-(--twitter-text) bg-transparent rounded-full"
              >
                Edit profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex mb-3 mt-1 flex-wrap items-stretch">
          <div className="flex flex-col shrink mb-3">
            <h2 className="text-2xl font-bold w-full">
              {`${userData.firstName} ${userData.lastName}`}
            </h2>
            <span className="text-(--twitter-text) w-full">
              @{userData.username}
            </span>
          </div>
          <p className="w-full mb-2">{userData.bio}</p>
          <div className="flex text-(--twitter-text) w-full mb-2 gap-4 flex-wrap text-sm">
            {userData.location && (
              <span className="flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5"
                >
                  <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z" />
                </svg>
                {userData.location}
              </span>
            )}
            {userData.createdAt && (
              <span className="flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5"
                >
                  <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z" />
                </svg>
                Joined {formatDate(userData.createdAt)}
              </span>
            )}
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-(--twitter-text)">
              <strong className="text-white mr-1">
                {userData.followingCount || 0}
              </strong>
              Following
            </span>
            <span className="text-(--twitter-text)">
              <strong className="text-white mr-1">
                {userData.followersCount || 0}
              </strong>
              Followers
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
