import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Spinner } from "./components/ui/spinner";

function App() {
  const { user, token } = useAuth();
  const [validatingUser, setValidatingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/signin");
    } else {
      setValidatingUser(false);
    }
  }, [user, token, navigate]);

  if (validatingUser) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  return (
    <div className="flex max-w-[1420px] justify-self-center">
      <Sidebar />
      <main
        className={`flex-1 md:h-screen md:ml-22 ${
          location.pathname === "/chat" ? "" : "xl:ml-68"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
