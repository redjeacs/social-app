import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

function CreatorsForYou() {
  const { user } = useAuth();
  const { setAlert } = useAlert();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/follow`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
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
      {suggestedUsers.map((user) => (
        <FollowCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default CreatorsForYou;
