import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex max-w-[1420px] justify-self-center">
      <Sidebar />
      <main className="flex-1 md:h-screen md:ml-22 xl:ml-68">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
