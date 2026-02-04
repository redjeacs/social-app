import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import FollowCard from "./FollowCard";

function CreatorsForYou() {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/popular/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok) {
          setAlert({
            type: "error",
            message: `An error occured - ${res.statusText} ${
              data.message || ""
            } ${data.error || ""}`,
          });
        }
        setSuggestedUsers(data);
      } catch (error) {
        setAlert({
          type: "error",
          message: `An error occured - ${error.message}`,
        });
      }
    };
    fetchPopularUsers();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {suggestedUsers &&
        suggestedUsers.length > 0 &&
        suggestedUsers.map((user) => (
          <FollowCard key={user.id} userToFollow={user} />
        ))}
    </div>
  );
}

export default CreatorsForYou;
