import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

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

  console.log(users);
  return <div className="">SearchList</div>;
}

export default SearchList;
