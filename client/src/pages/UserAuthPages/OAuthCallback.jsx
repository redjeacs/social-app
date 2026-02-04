import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function OAuthCallback() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    async function fetchUser(token) {
      if (token) {
        setToken(token);
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to fetch user data");
          return;
        }

        setUser(data.user);
        navigate("/");
      } catch (err) {
        console.error("Error fetching user data:", err);
        alert("An error occurred while signing you in. Please try again.");
        return;
      }
    }

    fetchUser(token);
  }, [navigate, setToken]);

  return <div>Signing you in...</div>;
}

export default OAuthCallback;
