import logo from "../assets/logo.webp";
import messagesIcon from "../assets/messages.webp";
import userIcon from "../assets/user.svg";
import devProfileIcon from "../assets/devprofiles.jpg";
import signoutIcon from "../assets/signout.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const handleSignout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <aside className="flex flex-col xl:items-start items-center p-2 overflow-auto fixed w-full bottom-0 h-16 md:top-0 md:h-screen md:w-22 xl:w-68 text-white md:flex-col shadow-lg z-40">
      <div className="">
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div className="">
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div className="">
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
      </div>

      <div className="w-full xl:p-4">
        <button className="hidden xl:block rounded-full text-black font-bold bg-white w-full h-15">
          Post
        </button>
        <img src={logo} alt="Logo" className="w-18 h-18 p-1 xl:hidden" />
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-16 h-16 p-1" />
      </div>
    </aside>
  );
}

export default Sidebar;
