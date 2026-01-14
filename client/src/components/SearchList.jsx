import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import PlainUserCard from "./PlainUserCard";
import { useNavigate } from "react-router-dom";

function SearchList({ searchQuery }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    searchUsers();
  }, [searchQuery]);

  const searchUsers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/search/${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) console.error("Unable to search users");

      if (data.user) setUser(data.user);
      else setUser(null);
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-stretch">
      <button
        onClick={() => {
          navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
        }}
        className="flex cursor-pointer leading-5 p-4 hover:bg-(--twitter-hover)"
      >
        <span>Search for "{searchQuery}"</span>
      </button>
      <div className="bg-[rgb(47,51,54)] my-1 h-px"></div>
      {users &&
        users.map((user) => {
          return <PlainUserCard key={user.id} user={user} />;
        })}
      {user && (
        <button
          onClick={() => navigate(`/profile/${user.id}`)}
          className="cursor-pointer py-3 px-4 hover:bg-(--twitter-hover) transition-colors duration-500"
        >
          <div className="flex items-stretch">go to @{user.username}</div>
        </button>
      )}
    </div>
  );
}

export default SearchList;
