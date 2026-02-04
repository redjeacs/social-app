import userIcon from "../assets/user.svg";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useEffect, useState } from "react";

function FollowCard({ userToFollow, trendsBar = false }) {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (
        Array.isArray(userToFollow.followers) &&
        userToFollow.followers.some((follower) => follower.id === user.id)
      ) {
        setIsFollowing(true);
      }
    };
    checkIfFollowing();
  }, [userToFollow.followers, user.id]);

  const handleUserFollow = async (userId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/follow/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    if (!res.ok)
      setAlert({
        type: "error",
        message: `An error occured - ${res.statusText} ${data.message || ""} ${
          data.error || ""
        }`,
      });
    setIsFollowing(true);
    setAlert({
      type: "success",
      message: data.message,
    });
  };

  const handleUserUnfollow = async (userId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/unfollow/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    if (!res.ok)
      setAlert({
        type: "error",
        message: `An error occured - ${res.statusText} ${data.message || ""} ${
          data.error || ""
        }`,
      });
    setIsFollowing(false);
    setAlert({
      type: "success",
      message: data.message,
    });
  };

  return (
    <div
      key={userToFollow.id}
      className={`${trendsBar ? "text-[15px]" : "px-4 py-3"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 w-full">
          <img
            src={userToFollow.profile || userIcon}
            alt={`${userToFollow.username}'s profile`}
            className={`${
              trendsBar ? "w-10 h-10" : "w-12 h-12"
            } rounded-full bg-gray-400 object-cover`}
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <div className={`${trendsBar && "h-10"} flex flex-col`}>
                <span className="font-bold">
                  {userToFollow.firstName} {userToFollow.lastName}
                </span>
                <span className="text-gray-400">@{userToFollow.username}</span>
              </div>
              <Button
                onClick={
                  isFollowing
                    ? () => handleUserUnfollow(userToFollow.id)
                    : () => handleUserFollow(userToFollow.id)
                }
                onMouseEnter={(e) => {
                  if (isFollowing) e.target.textContent = "Unfollow";
                }}
                onMouseLeave={(e) => {
                  if (isFollowing) e.target.textContent = "Following";
                }}
                className={`bg-white text-black font-bold rounded-full px-4 py-1 hover:bg-white/90 ${
                  isFollowing &&
                  "w-22 bg-black text-(--twitter-text) border border-(--twitter-text) hover:text-[rgb(244,33,46)] hover:bg-[rgba(244,33,46,0.1)] hover:border-[rgb(244,33,46)]"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
            {!trendsBar && <p>{userToFollow.bio || ""}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowCard;
