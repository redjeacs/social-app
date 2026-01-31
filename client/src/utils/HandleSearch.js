import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function HandleSearch() {
  const { token } = useAuth();
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const toggleSearchBarFocus = () => {
    setSearchBarFocus(!searchBarFocus);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setSearchBarFocus(false);
    }, 200);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const searchPosts = async (query) => {
      if (query !== "") {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/search/${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await res.json();
          if (!res.ok) console.error("Unable to search posts");
          setPosts(data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setPosts([]);
      }
    };
    searchPosts(query);
  }, [query, token]);

  return {
    searchBarFocus,
    setSearchBarFocus,
    searchQuery,
    setSearchQuery,
    query,
    toggleSearchBarFocus,
    handleInputBlur,
    handleSearchQuery,
    posts,
  };
}

export default HandleSearch;
