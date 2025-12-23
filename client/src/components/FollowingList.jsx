import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function FollowingList() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-90 self-center m-10 gap-4">
        <h1 className="text-4xl font-bold">Welcome to X!</h1>
        <span className="text-(--twitter-text)">
          This is the best place to see what’s happening in your world. Find
          some people and topics to follow now.
        </span>
        <Button className="bg-(--twitter-blue) text-lg text-white font-bold rounded-full w-35 h-14 cursor-pointer hover:bg-(--twitter-blue-hover)">
          <Link to="/follow">Let's go!</Link>
        </Button>
      </div>
    </div>
  );
}

export default FollowingList;
