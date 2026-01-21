function MessageRequestCard({ user }) {
  return (
    <li className="w-full">
      <div className="flex w-full gap-3 p-2 items-center rounded-lg select-none hover:bg-(--twitter-gray-50) cursor-pointer">
        <div className="relative isolate min-size flex overflow-hidden bg-(--twitter-gray-300) rounded-full min-w-10 min-h-10 size-10 transition duration-200 hover:brightness-90">
          <img
            src={user.profile}
            alt="user avatar"
            className="size-full brightness-100 object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden flex-col items-start gap-0">
          <div className=" flex items-center gap-1 shrink-0 max-w-full text-(--twitter-whtie) line-clamp-1 font-bold leading-5">
            {user.firstName} {user.lastName}
          </div>
          <div className=" max-w-full flex text-(--twitter-gray-700) line-clamp-1 leading-5">
            @{user.username}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MessageRequestCard;
