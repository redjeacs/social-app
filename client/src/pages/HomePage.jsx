import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TrendsBar from "@/components/TrendsBar";
import { useLocation } from "react-router-dom";

function HomePage() {
  const { user, token } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="flex gap-6 min-h-screen">
      {(!user || !token) && <Navigate to="/signin" />}
      <div
        className={`md:w-[80vw] ${
          pathname === "/chat" ? "md:max-w-[1185px]" : "md:max-w-[600px]"
        } w-screen border-x border-(--twitter-border) text-white`}
      >
        <Outlet />
      </div>

      <TrendsBar />
    </div>
  );
}

export default HomePage;
