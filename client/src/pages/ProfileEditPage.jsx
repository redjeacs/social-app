import { Button } from "@/components/ui/button";

function ProfileEditPage() {
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(91,112,131,0.4)] z-50">
      <div className="flex flex-col basis-auto rounded-2xl bg-blac max-w-[600px] w-full bg-black mx-auto">
        <div className="flex items-center px-4 h-[53px]">
          <div className="flex items-center justify-start min-w-14">
            <button className="w-9 h-9 cursor-pointer">
              <div className="flex justify-center items-center w-8.5 h-8.5 hover:rounded-full hover:bg-(--twitter-text)/30">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                  <path
                    fill="rgb(239,243,244)"
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <h1 className="text-xl font-bold flex-1">Edit profile</h1>
          <button className="w-16.5 h-8 text-sm font-bold bg-[#EFF3F4] text-[#0F1419] rounded-full cursor-pointer hover:bg-[rgb(215,219,220)]">
            Save
          </button>
        </div>
        <div className="flex justify-center items-center aspect-3/1 w-ful max-h-[200px] opacity-75">
          <button className="flex justify-center items-center w-10.5 h-10.5 backdrop:blur-xs rounded-full cursor-pointer hover:bg-[rgba(39,44,48,0.75)] ease-in-out duration-100">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <path
                fill="rgb(255,255,255)"
                d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditPage;
