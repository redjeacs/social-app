import App from "../App";
import HomePage from "../pages/HomePage";
import SignupPage from "@/pages/UserAuthPages/SignupPage";
import SigninPage from "@/pages/UserAuthPages/SigninPage";
import OAuthCallback from "@/pages/UserAuthPages/OAuthCallback";
import FollowPage from "@/pages/FollowPage/FollowPage";
import PostListPage from "../pages/PostListPage/PostListPage";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import PostPage from "../pages/PostPage/PostPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProfileEditPage from "@/pages/ProfilePage/ProfileEditPage";
import UserPostListPage from "@/pages/ProfilePage/UserPostListPage";
import UserRepliesListPage from "@/pages/ProfilePage/UserRepliesListPage";
import UserLikesListPage from "@/pages/ProfilePage/UserLikesListPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import InboxPlaceholder from "@/pages/ChatPage/InboxPlaceholder";
import MessageSettings from "@/pages/ChatPage/MessageSettings";
import Chatbox from "@/pages/ChatPage/Chatbox";
import ChatroomInfo from "@/pages/ChatPage/ChatroomInfo";
import PostFormModal from "@/pages/PostFormPage/PostFormModal";

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
          { path: "/post", element: <PostFormModal /> },
        ],
      },
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signin", element: <SigninPage /> },
  { path: "/oauth-callback", element: <OAuthCallback /> },
];

export default routes;
