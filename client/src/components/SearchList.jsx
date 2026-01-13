import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import PlainUserCard from "./PlainUserCard";

function SearchList({ searchQuery }) {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
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
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    handleSearch();
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col items-stretch">
      <button className="flex cursor-pointer leading-5 p-4 hover:bg-(--twitter-hover)">
        <span>Search for "{searchQuery}"</span>
      </button>
      <div className="bg-[rgb(47,51,54)] my-1 h-px"></div>
      {users &&
        users.map((user) => {
          return <PlainUserCard key={user.id} user={user} />;
        })}
    </div>
  );
}

export default SearchList;
