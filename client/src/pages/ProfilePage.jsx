import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAlert } from "@/contexts/AlertContext";

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
  }, [user.id]);

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
          <h1 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
        </div>
      </div>
      <div className="w-full aspect-3/1 bg-[rgb(51,54,57)]">
        {user.profile && (
          <img
            src={user.coverImage}
            aria-placeholder="profile background image"
            className=" w-full h-full object-cover"
          ></img>
        )}
      </div>
      {/* Profile Info */}
      <div className=" pt-3 pb-0 px-4">
        {/* Profile Picture and Edit Button */}
        <div className="w-full aspect-3/1 mb-4 flex flex-col basis-auto items-stretch">
          <div className="relative flex gap-4 items-end mr-4 min-h-11.5 justify-between">
            <div className="relative flex justify-center items-stretch -mt-11 w-[25%] bg-black">
              <div className=" flex justify-center items-center absolute bottom-5 md:bottom-0 min-w-18 min-h-18 w-full aspect-square max-w-40 max-h-40 border-2 md:border-4 border-black rounded-full bg-gray-400">
                <img
                  className=" w-full h-full rounded-full opacity-75 object-cover"
                  src={user.profile}
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
      </div>
    </>
  );
}

export default ProfilePage;
