import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import userIcon from "../assets/user.svg";

function TrendsBar() {
  return (
    <div className="flex-col gap-4 min-w-[290px] hidden xl:w-[350px] lg:flex p-2 text-white">
      <label className="flex items-center border border-(--twitter-gray) text-(--twitter-gray) p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 740 840"
          fill="#e7e9ea"
          className="opacity-100 w-4 h-4"
        >
          <path d="M734 668q8 9 0 17l-49 49q-3 3-8 3t-8-3L519 584q-50 38-112 55t-133 6q-53-8-99-33t-83-61t-59-85T3 366q-10-79 16-150T96 95t121-76T367 3q53 7 100 30t84 59t62 82t33 100q11 69-6 131t-55 114zM325 557q48 0 90-18t74-50t50-74t18-90t-18-90t-50-74t-74-50t-90-18t-90 18t-73 50t-50 74t-18 90t18 90t50 74t73 50t90 18" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="text-sm outline-none placeholder-(--twitter-gray) bg-transparent ml-2 w-full text-white"
        />
      </label>
      <div className="flex flex-col gap-4 border border-(--twitter-gray) rounded-lg p-3">
        <h1 className="font-bold text-xl">Subscribe to Premium</h1>
        <p className="text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <Button className="w-fit bg-(--twitter-blue) text-white font-bold rounded-full">
          Subscribe
        </Button>
      </div>
      <div className="border border-(--twitter-gray)"></div>
      <div className="flex flex-col gap-4 border border-(--twitter-gray) rounded-lg p-3">
        <h1 className="font-bold text-lg">What's happening</h1>
        <div>
          <p className="text-sm text-(--twitter-gray)">
            Trending in the United States
          </p>
          <h2 className="font-bold">#ExampleTrend</h2>
          <p className="text-sm text-(--twitter-gray)">20.4K Tweets</p>
        </div>
        <div>
          <p className="text-sm text-(--twitter-gray)">
            Trending in the United States
          </p>
          <h2 className="font-bold">#ExampleTrend</h2>
          <p className="text-sm text-(--twitter-gray)">20.4K Tweets</p>
        </div>
        <div>
          <p className="text-sm text-(--twitter-gray)">
            Trending in the United States
          </p>
          <h2 className="font-bold">#ExampleTrend</h2>
          <p className="text-sm text-(--twitter-gray)">20.4K Tweets</p>
        </div>
        <Link to="/" className="text-(--twitter-blue)">
          {/* update link later */}
          Show more
        </Link>
      </div>
      <div className="flex flex-col gap-4 border border-(--twitter-gray) rounded-lg p-3">
        <h1 className="font-bold text-lg">Who to follow</h1>
        <div className="flex gap-2 items-center">
          <img
            src={userIcon}
            alt=""
            className="w-10 h-10 rounded-full object-fit bg-gray-400"
          />
          <div>
            <h2>User's name</h2>
            <span>@username</span>
          </div>
          <Button className="ml-auto bg-white text-black font-bold rounded-full">
            Follow
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={userIcon}
            alt=""
            className="w-10 h-10 rounded-full object-fit bg-gray-400"
          />
          <div>
            <h2>User's name</h2>
            <span>@username</span>
          </div>
          <Button className="ml-auto bg-white text-black font-bold rounded-full">
            Follow
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={userIcon}
            alt=""
            className="w-10 h-10 rounded-full object-fit bg-gray-400"
          />
          <div>
            <h2>User's name</h2>
            <span>@username</span>
          </div>
          <Button className="ml-auto bg-white text-black font-bold rounded-full">
            Follow
          </Button>
        </div>
        <Link to="/" className="text-(--twitter-blue)">
          {/* update link later */}
          Show more
        </Link>
      </div>
    </div>
  );
}

export default TrendsBar;
