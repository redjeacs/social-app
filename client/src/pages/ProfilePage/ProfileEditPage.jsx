import { useAuth } from "@/contexts/AuthContext";
import userIcon from "@/assets/user.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";
import { Spinner } from "@/components/ui/spinner";

function ProfileEditPage() {
  const { user, setUser, token } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: user.bio,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    profile: user.profile,
    coverImage: user.coverImage,
  });
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [profilePreview, setProfilePreview] = useState("");
  const [inputFocus, setInputFocus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const multipartFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) multipartFormData.append(key, value);
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: multipartFormData,
        },
      );

      if (!res.ok) {
        setAlert({ type: "error", message: "Failed to update profile" });
        setIsUploading(false);
        return;
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      navigate(-1);
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: `An error occurred while updating profile: ${err.message}`,
      });
    }
    setIsUploading(false);
  };

  const openCoverImageFile = () => {
    return () => {
      document.getElementById("coverImage").click();
    };
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, coverImage: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openProfileFile = () => {
    return () => {
      document.getElementById("profile").click();
    };
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(91,112,131,0.4)] z-40">
      {isUploading && (
        <div className="absolute flex flex-col items-center gap-4 justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50">
          <Spinner />
          <span className="text-white text-lg">Updating profile...</span>
        </div>
      )}
      <div className="relative flex flex-col basis-auto md:rounded-2xl bg-blac max-w-full md:max-w-[600px] w-screen bg-black mx-auto min-w-[60px] h-[650px] min-h-[400px] max-h-screen md:max-h-[90vh] overflow-auto custom-scrollbar">
        {/* Nav */}
        <div className="sticky top-0 bg-black z-20 rounded-t-2xl flex items-center px-4 h-[53px] p-4">
          <div className="flex items-center justify-start min-w-14 bg-black">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 cursor-pointer"
            >
              <div className="flex justify-center items-center w-8.5 h-8.5 hover:rounded-full hover:bg-(--twitter-text)/30">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="md:block hidden w-5 h-5"
                >
                  <path
                    fill="rgb(239,243,244)"
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
                  ></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="block md:hidden w-5 h-5"
                >
                  <path
                    fill="rgb(239,243,244)"
                    d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <h1 className="text-xl font-bold flex-1">Edit profile</h1>
          <button
            onClick={(e) => handleProfileUpdate(e)}
            className="w-16.5 h-8 text-sm font-bold bg-[#EFF3F4] text-[#0F1419] rounded-full cursor-pointer hover:bg-[rgb(215,219,220)]"
          >
            Save
          </button>
        </div>
        {/* Image Display */}
        <div className="relative flex justify-center items-center aspect-3/1 w-full max-h-[200px] opacity-75">
          <img
            src={coverImagePreview || user.coverImage}
            alt="cover image preview"
            className={`absolute w-full h-full object-cover ${
              formData.coverImage ? "" : "hidden"
            }`}
          />
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            className="hidden"
            onChange={handleCoverImageChange}
          />
          <button
            onClick={openCoverImageFile()}
            className="flex z-2 justify-center items-center w-10.5 h-10.5 backdrop:blur-xs rounded-full cursor-pointer hover:bg-[rgba(39,44,48,0.75)] ease-in-out duration-100"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <path
                fill="rgb(255,255,255)"
                d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
              ></path>
            </svg>
          </button>
        </div>
        {/* Photo Edit Bar */}
        <div className="relative flex gap-4 items-end mr-4 min-h-11.5">
          <div className="relative flex justify-center items-stretch  ml-4 -mt-11 w-[25%] bg-black">
            <div className="flex justify-center items-center absolute bottom-0 min-w-16 min-h-16 w-full aspect-square max-w-29 max-h-29 border-2 border-black rounded-full bg-gray-400">
              <img
                className=" w-full h-full rounded-full opacity-75 object-cover"
                src={profilePreview || user.profile || userIcon}
                alt="profile image"
              />
              <input
                type="file"
                id="profile"
                name="profile"
                className="hidden"
                onChange={handleProfileChange}
              />
              <button
                onClick={openProfileFile()}
                className="absolute flex justify-center items-center bottom-1/2 right-1/2 bg-[rgba(15,20,25,0.75)] translate-x-1/2 translate-y-1/2 w-10.5 h-10.5 backdrop:blur-xs rounded-full cursor-pointer hover:bg-[rgba(39,44,48,0.75)] ease-in-out duration-100"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                  <path
                    fill="rgb(255,255,255)"
                    d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden sm:flex justify-between items-center gap-1 p-3 bg-[rgb(22,24,28)] flex-1 h-fit rounded-lg">
            <div className="flex flex-col gap-1 items-stretch flex-1">
              <span className="wrap-break-word text-sm font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] text-[rgb(231,233,234)] font-bold">
                Edit your photo with Imagine
              </span>
              <span className="wrap-break-word text-sm font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] text-[rgb(113,118,123)]">
                Customize yourself in seconds
              </span>
            </div>
            <button className="border border-[rgb(51,54,57)] bg-[rgb(51,54,57)] cursor-pointer min-h-9 min-w-9 px-4 rounded-full">
              <div className="flex grow gap-1 items-center justify-center text-center">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5">
                  <g>
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.667"
                      d="M17.084 7.5c0-1.163 0-1.744-.144-2.218-.323-1.065-1.157-1.899-2.222-2.222-.473-.143-1.055-.143-2.218-.143H8.25c-1.867 0-2.8 0-3.513.363-.627.32-1.137.83-1.457 1.457-.363.713-.363 1.646-.363 3.513v4.25c0 1.163 0 1.745.144 2.218.323 1.065 1.156 1.899 2.222 2.222.473.143 1.054.143 2.217.143"
                    ></path>
                    <path
                      d="M2.917 12.5l3.75-3.333 2.917 2.916"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.667"
                    ></path>
                    <circle
                      cx="12.5"
                      cy="7.5"
                      fill="currentColor"
                      r="1.667"
                    ></circle>
                    <path
                      d="M17.56 10.894c-.644-.645-1.684-.659-2.346-.032l-3.656 3.463c-.6.568-.968 1.34-1.031 2.164l-.11 1.428 1.479-.114c.793-.061 1.539-.404 2.101-.967l3.564-3.563c.657-.657.657-1.722 0-2.38z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.667"
                    ></path>
                  </g>
                </svg>
                <span className="text-sm text-[rgb(239,243,244)] font-bold">
                  Edit Photo
                </span>
              </div>
            </button>
          </div>
        </div>
        {/* First Name Input */}
        <div className="flex flex-col items-stretch px-4 py-3">
          <label
            htmlFor="firstName"
            className={`border  rounded-sm ${
              inputFocus === "firstName"
                ? "border-[rgb(29,155,240)] shadow-[0_0_0_1px_rgb(29,155,240)]"
                : "border-[rgb(51,54,57)]"
            }`}
          >
            <div className="flex flex-col p-2">
              <span
                className={` text-sm ${
                  inputFocus === "firstName"
                    ? "text-[rgb(29,155,240)]"
                    : "text-[rgb(113,118,123)]"
                }`}
              >
                First Name
              </span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="outline-none"
                onFocus={() => setInputFocus("firstName")}
                onBlur={() => setInputFocus("")}
              />
            </div>
          </label>
        </div>
        {/* Last Name Input */}
        <div className="flex flex-col items-stretch px-4 py-3">
          <label
            htmlFor="lastName"
            className={`border  rounded-sm ${
              inputFocus === "lastName"
                ? "border-[rgb(29,155,240)] shadow-[0_0_0_1px_rgb(29,155,240)]"
                : "border-[rgb(51,54,57)]"
            }`}
          >
            <div className="flex flex-col p-2">
              <span
                className={` text-sm ${
                  inputFocus === "lastName"
                    ? "text-[rgb(29,155,240)]"
                    : "text-[rgb(113,118,123)]"
                }`}
              >
                Last Name
              </span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="outline-none"
                onFocus={() => setInputFocus("lastName")}
                onBlur={() => setInputFocus("")}
              />
            </div>
          </label>
        </div>
        {/* Bio Input */}
        <div className="flex flex-col items-stretch px-4 py-3">
          <label
            htmlFor="bio"
            className={`border  rounded-sm ${
              inputFocus === "bio"
                ? "border-[rgb(29,155,240)] shadow-[0_0_0_1px_rgb(29,155,240)]"
                : "border-[rgb(51,54,57)]"
            }`}
          >
            <div className="flex flex-col p-2">
              <span
                className={` text-sm ${
                  inputFocus === "bio"
                    ? "text-[rgb(29,155,240)]"
                    : "text-[rgb(113,118,123)]"
                }`}
              >
                Bio
              </span>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                maxLength={160}
                style={{ height: "72px" }}
                className="outline-none resize-none text-left"
                onFocus={() => setInputFocus("bio")}
                onBlur={() => setInputFocus("")}
              />
            </div>
          </label>
        </div>
        {/* Location Input */}
        <div className="flex flex-col items-stretch px-4 py-3">
          <label
            htmlFor="location"
            className={`border rounded-sm ${
              inputFocus === "location"
                ? "border-[rgb(29,155,240)] shadow-[0_0_0_1px_rgb(29,155,240)]"
                : "border-[rgb(51,54,57)]"
            }`}
          >
            <div className="flex flex-col p-2">
              <span
                className={` text-sm ${
                  inputFocus === "location"
                    ? "text-[rgb(29,155,240)]"
                    : "text-[rgb(113,118,123)]"
                }`}
              >
                Location
              </span>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="outline-none"
                onFocus={() => setInputFocus("location")}
                onBlur={() => setInputFocus("")}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditPage;
