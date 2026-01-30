import App from "../App";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import OAuthCallback from "../pages/OAuthCallback";
import FollowPage from "../pages/FollowPage";
import PostListPage from "../pages/PostListPage";
import ExplorePage from "../pages/ExplorePage";
import PostPage from "../pages/PostPage";
import ProfilePage from "../pages/ProfilePage";
import ProfileEditPage from "@/pages/ProfileEditPage";
import UserPostListPage from "@/pages/UserPostListPage";
import UserRepliesListPage from "@/pages/UserRepliesListPage";
import UserLikesListPage from "@/pages/UserLikesListPage";
import ChatPage from "@/pages/ChatPage";
import InboxPlaceholder from "@/pages/ChatPage/InboxPlaceholder";
import MessageSettings from "@/pages/ChatPage/MessageSettings";
import Chatbox from "@/pages/ChatPage/Chatbox";
import ChatroomInfo from "@/pages/ChatPage/ChatroomInfo";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          { index: true, element: <PostListPage /> },
          { path: "/follow", element: <FollowPage /> },
          { path: "/explore", element: <ExplorePage /> },
          { path: "/post/:postId", element: <PostPage /> },
          {
            path: "/chat",
            element: <ChatPage />,
            children: [
              { index: true, element: <InboxPlaceholder /> },
              { path: "/chat/settings", element: <MessageSettings /> },
              {
                path: "/chat/:userId/with/:recipientId",
                element: <Chatbox />,
                children: [
                  {
                    path: "/chat/:userId/with/:recipientId/info",
                    element: <ChatroomInfo />,
                  },
                ],
              },
            ],
          },
          {
            path: "/profile/:userId",
            element: <ProfilePage />,
            children: [
              { index: true, element: <UserPostListPage /> },
              { path: "/profile/:userId/edit", element: <ProfileEditPage /> },
              {
                path: "/profile/:userId/replies",
                element: <UserRepliesListPage />,
              },
              {
                path: "/profile/:userId/likes",
                element: <UserLikesListPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signin", element: <SigninPage /> },
  { path: "/oauth-callback", element: <OAuthCallback /> },
];

export default routes;
