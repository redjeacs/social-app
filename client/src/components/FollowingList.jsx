import { useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import Post from "./Post";

function FollowingList() {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [userData, setUserData] = useState(null);
  const [followsPosts, setFollowsPosts] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const userId = user.id;
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
        setAlert({
          type: "error",
          message: `An error occured - ${res.statusText} ${
            data.message || ""
          } ${data.error || ""}`,
        });
        return;
      }
      setUserData(data);
    };
    getUserData();
  }, []);

  useEffect(() => {
    const fetchFollowsPosts = async () => {
      if (
        !userData ||
        !Array.isArray(userData.following) ||
        userData.following.length <= 0
      )
        return;

      const userId = user.id;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/follows/${userId}`,
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
          setAlert({
            type: "error",
            message: `An error occured - ${res.statusText} ${
              data.message || ""
            } ${data.error || ""}`,
          });
          return;
        }

        setFollowsPosts(data);
      } catch (err) {
        setAlert({
          type: "error",
          message: `An error occured - ${err.message}`,
        });
      }
    };

    fetchFollowsPosts();
  }, [userData]);

  return (
    <div className="flex flex-col w-full">
      {followsPosts && followsPosts.length > 0 ? (
        followsPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="flex flex-col w-90 self-center m-10 gap-4">
          <h1 className="text-4xl font-bold">Welcome to X!</h1>
          <span className="text-(--twitter-text)">
            This is the best place to see what’s happening in your world. Find
            some people and topics to follow now.
          </span>
          <Link to="/follow">
            <Button className="bg-(--twitter-blue) text-lg text-white font-bold rounded-full w-35 h-14 cursor-pointer hover:bg-(--twitter-blue-hover)">
              Let's go!
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FollowingList;
