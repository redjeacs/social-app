import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MessageSettings() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    const checkUserRequestStatus = async () => {
      const userId = user.id;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        if (!res.ok) console.error("failed to fetch user");

        setRequestStatus(data.messageStatus);
      } catch (err) {
        console.error(err);
      }
    };

    checkUserRequestStatus();
  }, [user.id]);

  const handleRequestStatusChange = async () => {
    //handle it
  };

  return (
    <div className="flex flex-col w-full items-center h-full overflow-y-auto custom-scrollbar pb-16 px-4">
      {/* Header */}
      <div className="flex w-full gap-4 items-center py-4 sticky top-0 bg-black z-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 justify-center w-9 h-9 text-(--twitter-white) hover:bg-(--twitter-hover) rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            data-icon="icon-arrow-left"
            viewBox="0 0 24 24"
            display="flex"
            role="img"
            className="w-5 h-5"
          >
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </svg>
        </button>
        <div className="max-w-full whitespace-pre-wrap text-(--twitter-white) text-[23px] leading-7 font-bold">
          Settings
        </div>
      </div>
      {/* Message Request Status */}
      <div className="flex flex-col w-full max-w-2xl flex-1">
        <div className="flex flex-col gap-2 py-3">
          <div className="max-w-full text-[15px] leading-5">
            Allow message requests from:
          </div>
          <div className="maxd-w-full text-(--twitter-gray-700) text-[13px] leading-4">
            <span>People you follow will always be able to message you. </span>
            <a
              className="text-(--twitter-blue) hover:underline"
              rel="noopener noreferrer"
              href="https://help.x.com/en/using-x/direct-messages#receive"
              target="_blank"
            >
              Learn more
            </a>
          </div>
          <div
            role="radiogroup"
            aria-required="false"
            className="flex flex-col gap-3 pt-2"
          >
            <div className="flex justify-between items-start">
              <div className="max-w-full text-[15px] leading-5">No one</div>
              <button
                onClick={handleRequestStatusChange}
                className="border-(--twitter-gray-700) border-2 text-(--twitter-gray-0) size-5 shrink-0 rounded-full shadow-xs cursor-pointer outline-none"
              >
                <span className="relative flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    data-icon="icon-circle-fill"
                    viewBox="0 0 24 24"
                    role="img"
                    className={`${requestStatus === "No one" && "fill-(--twitter-blue)"} absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <circle cx="12" cy="12" r="10.3"></circle>
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div className="max-w-full text-[15px] leading-5">Everyone</div>
              <button
                onClick={handleRequestStatusChange}
                className="border-(--twitter-gray-700) border-2 text-(--twitter-gray-0) size-5 shrink-0 rounded-full shadow-xs cursor-pointer outline-none"
              >
                <span className="relative flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    data-icon="icon-circle-fill"
                    viewBox="0 0 24 24"
                    role="img"
                    className={`${requestStatus === "everyone" && "fill-(--twitter-blue)"} absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <circle cx="12" cy="12" r="10.3"></circle>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageSettings;
