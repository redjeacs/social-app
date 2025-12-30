import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";
import userIcon from "@/assets/user.svg";
import { formatDateFull } from "../utils/formatDate";
import ReplyForm from "@/components/ReplyForm";

import {
  handlePostLike,
  handleRepost,
  handleUndoRepost,
} from "@/utils/PostHandler";
import PostCard from "@/components/PostCard";

function PostPage() {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [parentChain, setParentChain] = useState([]);
  const likedPost = post?.originalPost || post;
  const isLiked = likedPost?.likedBy?.some(
    (likedUser) => likedUser.id === user.id
  );
  const isRepost = Boolean(post?.originalPost);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          setAlert({
            type: "error",
            message: `An error occured - ${res.statusText}`,
          });
          return;
        }

        setPost(data);
      } catch (error) {
        setAlert({
          type: "error",
          message: `An error occured - ${error.message}`,
        });
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchParentChain = async () => {
      if (!post) return;
      let chain = [];
      let current = post;

      while (current.parentPostId) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/${current.parentPostId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          if (!res.ok) {
            setAlert({
              type: "error",
              message: `An error occured - ${res.statusText}`,
            });
            return;
          }
          chain.unshift(data);
          current = data;
        } catch (err) {
          setAlert({
            type: "error",
            message: `An error occured - ${err.message}`,
          });
        }
      }
      setParentChain(chain);
    };
    fetchParentChain();
  }, [post, token]);

  if (!post) return;

  console.log(post);

  return (
    <>
      <div className="sticky top-0 flex w-full bg-black z-10 p-2 justify-between">
        <div className="flex gap-4 items-center">
          <button
            to="#"
            onClick={() => navigate(-1)}
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
          </button>
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </div>
      {parentChain &&
        parentChain.map((parentPost) => (
          <PostCard key={parentPost.id} post={parentPost} />
        ))}
      <article className="w-full flex flex-col pt-4 border-b border-(--twitter-gray) px-4">
        <div className="flex w-full gap-2">
          <div className="h-full w-10 bg-gray-400 rounded-full">
            <img
              src={
                (isRepost && post.originalPost.user?.profile) ||
                post.user?.profile ||
                userIcon
              }
              alt="profile icon"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col text-[15px] max-h-fit">
            <span className="font-bold h-auto">
              {isRepost
                ? `${post.originalPost.user.firstName} ${post.originalPost.user.lastName}`
                : post.user && `${post.user.firstName} ${post.user.lastName}`}
            </span>
            <span className="text-(--twitter-text) h-auto">
              @
              {(isRepost && post.originalPost.user.username) ||
                (post.user && post.user.username)}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full justify-end h-9">
          <p className="h-6">{post.content}</p>
        </div>
        <div className="my-4">
          <span className="text-(--twitter-text)">
            {(isRepost && formatDateFull(post.originalPost.createdAt)) ||
              formatDateFull(post.createdAt)}
          </span>
        </div>
        <div className="flex grow border-t border-(--twitter-gray) h-12 text-(--twitter-text)">
          <div className="flex flex-1 items-center hover:text-(--twitter-blue) ">
            <div className="relative h-fit flex gap-1 cursor-pointer">
              <div className=" hover:bg-[rgba(29,155,240,0.2)] p-2 rounded-full ease-in-out duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentcolor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5.5 h-5.5"
                >
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </svg>
              </div>
              <span className="absolute text-xs right-0 bottom-1.5">
                {isRepost &&
                Array.isArray(post.originalPost.replies) &&
                post.originalPost.replies.length > 0
                  ? post.originalPost.replies.length
                  : "" ||
                    (Array.isArray(post.replies) && post.replies?.length > 0)
                  ? post.replies.length
                  : ""}
              </span>
            </div>
          </div>
          <div
            className={`flex flex-1 items-center hover:text-[rgb(0,186,124)] ${
              (isRepost && post.userId === user.id) ||
              (post.reposts &&
                post.reposts.some((repost) => repost.userId === user.id))
                ? "text-[rgb(0,186,124)]"
                : ""
            }`}
          >
            <div
              onClick={
                (isRepost && post.userId === user.id) ||
                (post.reposts &&
                  post.reposts.some((repost) => repost.userId === user.id))
                  ? (e) =>
                      handleUndoRepost({
                        e,
                        user,
                        post,
                        token,
                        setAlert,
                        navigate,
                      })
                  : (e) =>
                      handleRepost({
                        e,
                        user,
                        post,
                        token,
                        setAlert,
                        navigate,
                      })
              }
              className="relative h-fit flex gap-1 cursor-pointer"
            >
              <div className=" hover:bg-[rgba(0,186,124,0.2)] p-2 rounded-full ease-in-out duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-repeat2-icon lucide-repeat-2 w-5.5 h-5.5"
                >
                  <path d="m2 9 3-3 3 3" />
                  <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                  <path d="m22 15-3 3-3-3" />
                  <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                </svg>
              </div>
              <span className="absolute text-xs right-0 bottom-1.5">
                {isRepost && Array.isArray(post.originalPost.reposts)
                  ? post.originalPost.reposts.length
                  : "" ||
                    (Array.isArray(post.reposts) && post.reposts.length > 0)
                  ? post.reposts.length
                  : ""}
              </span>
            </div>
          </div>
          <div
            onClick={(e) =>
              handlePostLike({ e, user, post, token, setAlert, navigate })
            }
            className={`flex flex-1 items-center hover:text-[rgb(249,24,128)] ${
              isLiked && "text-[rgb(249,24,128)]"
            }`}
          >
            <div className="relative h-fit flex gap-1 cursor-pointer">
              <div className="flex hover:bg-[rgba(249,24,128,0.2)] p-2 rounded-full ease-in-out duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart-icon lucide-heart w-5.5 h-5.5"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </div>
              <span className="absolute text-xs right-0 bottom-1.5">
                {(isRepost &&
                  Array.isArray(post.originalPost.likes) &&
                  post.originalPost.likes) ||
                  (Array.isArray(post.likes) && post.likes.length > 0
                    ? post.likes
                    : "")}
              </span>
            </div>
          </div>
          <div className="flex items-center hover:text-(--twitter-blue)">
            <div className="cursor-pointer hover:bg-[rgba(29,155,240,0.2)] p-2 rounded-full ease-in-out duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-share-icon lucide-share w-5.5 h-5.5"
              >
                <path d="M12 2v13" />
                <path d="m16 6-4-4-4 4" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              </svg>
            </div>
          </div>
        </div>
      </article>
      <ReplyForm />
      <div>
        {post.replies &&
          Array.isArray(post.replies) &&
          post.replies.length > 0 &&
          post.replies.map((reply) => <PostCard key={reply.id} post={reply} />)}
      </div>
    </>
  );
}

export default PostPage;
