import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function HomePage() {
  const { user, token } = useAuth();

  return (
    <div>
      {(!user || !token) && <Navigate to="/signin" />}
      HomePage
    </div>
  );
}

export default HomePage;
