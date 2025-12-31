import App from "../App";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import OAuthCallback from "../pages/OAuthCallback";
import FollowPage from "../pages/FollowPage";
import PostListPage from "../pages/PostListPage";
import PostPage from "../pages/PostPage";
import ProfilePage from "../pages/ProfilePage";
import ProfileEditPage from "@/pages/ProfileEditPage";

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
          { path: "/post/:postId", element: <PostPage /> },
          {
            path: "/profile",
            element: <ProfilePage />,
            children: [{ path: "/profile/edit", element: <ProfileEditPage /> }],
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
