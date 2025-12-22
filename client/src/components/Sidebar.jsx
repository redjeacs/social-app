import logo from "../assets/logo.webp";
import userIcon from "../assets/user.svg";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const handleSignout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <aside className="custom-scrollbar flex flex-col xl:items-start items-center p-2 overflow-auto fixed w-full bottom-0 h-16 md:top-0 md:h-screen md:w-22 xl:w-68 text-white md:flex-col shadow-lg z-40">
      <div className="flex flex-col flex-1 w-full">
        <div className="flex flex-col items-center xl:items-start xl:gap-1">
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
          <div className="flex-1">
            <img src={logo} alt="Logo" className="w-13 h-13 p-1" />
          </div>
        </div>
        <div className="flex flex-col items-center xl:items-start flex-1 my-2">
          <button className="hidden xl:block rounded-full text-black font-bold bg-white w-full h-15">
            Post
          </button>
          <img src={logo} alt="Post" className="xl:hidden w-16 h-16 p-1" />
        </div>
        <div className="flex gap-2 m-2 p-2 items-center rounded-full hover:bg-gray-800 cursor-pointer">
          <img
            src={user?.profilePicture || userIcon}
            alt="Logo"
            className="w-10 h-10 rounded-full bg-gray-500"
          />
          <div className="hidden xl:flex xl:flex-col" onClick={handleSignout}>
            <span>{user?.name || "Guest"}</span>
            <span>@{user?.username || "username"}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
