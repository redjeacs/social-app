import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import WhoToFollow from "@/components/WhoToFollow";
import CreatorsForYou from "@/components/CreatorsForYou";

function FollowPage() {
  const { user, token } = useAuth();
  const [selectedTab, setSelectedTab] = useState("Who to Follow");

  return (
    <>
      {(!user || !token) && <Navigate to="/signin" />}

      <div className="sticky top-0 flex w-full bg-black z-10 p-2 justify-between">
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className="p-2 hover:bg-[rgba(239,243,244,0.1)] rounded-full cursor-pointer"
          >
            <svg
              id="back-arrow"
              role="button"
              fill="white"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </Link>
          <h1 className="text-xl font-bold">Follow</h1>
        </div>
      </div>
      <div className="w-full top-0 z-10 bg-black flex grow border-b border-(--twitter-gray)">
        <div
          className={`relative flex flex-col text-gray-400 justify-center items-center flex-1 h-13 cursor-pointer ${
            selectedTab === "Who to Follow" ? "text-white" : ""
          }`}
          onClick={() => setSelectedTab("Who to Follow")}
        >
          Who to Follow
          <div
            className={`absolute bottom-0 min-w-14 h-1 rounded-full ${
              selectedTab === "Who to Follow"
                ? "border-2 border-(--twitter-blue) font-bold"
                : "font-normal"
            }`}
          ></div>
        </div>
        <div
          className={`relative flex flex-col text-gray-400 justify-center items-center flex-1 h-13 cursor-pointer ${
            selectedTab === "Creators for you" ? "text-white" : ""
          }`}
          onClick={() => setSelectedTab("Creators for you")}
        >
          Creators for you
          <div
            className={`absolute bottom-0 min-w-14 h-1 rounded-full ${
              selectedTab === "Creators for you"
                ? "border-2 border-(--twitter-blue) font-bold"
                : "font-normal"
            }`}
          ></div>
        </div>
      </div>
      <div className="max-w-[600px] flex flex-col">
        {selectedTab === "Who to Follow" && <WhoToFollow />}
        {selectedTab === "Creators for you" && <CreatorsForYou />}
      </div>
    </>
  );
}

export default FollowPage;
