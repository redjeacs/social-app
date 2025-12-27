import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TrendsBar from "@/components/TrendsBar";

function HomePage() {
  const { user, token } = useAuth();

  return (
    <div className="flex gap-6 min-h-screen">
      {(!user || !token) && <Navigate to="/signin" />}
      <div className="max-w-[600px] w-screen border-x border-(--twitter-gray) text-white">
        <Outlet />
      </div>

      <TrendsBar />
    </div>
  );
}

export default HomePage;
