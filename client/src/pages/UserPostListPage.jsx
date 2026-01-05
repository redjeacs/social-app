import { useParams } from "react-router-dom";

function UserPostListPage() {
  const userId = useParams().userId;

  return <div className="">UserPostListPage</div>;
}

export default UserPostListPage;
