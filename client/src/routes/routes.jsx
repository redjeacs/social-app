import App from "../App";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import OAuthCallback from "../pages/OAuthCallback";
import FollowPage from "../pages/FollowPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/follow", element: <FollowPage /> },
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signin", element: <SigninPage /> },
  { path: "/oauth-callback", element: <OAuthCallback /> },
];

export default routes;
