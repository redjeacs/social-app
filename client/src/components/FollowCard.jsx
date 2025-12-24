function FollowCard({ user }) {
  return (
    <div key={user.id} className="p-4 border-b border-(--twitter-gray)">
      {user.username}
    </div>
  );
}

export default FollowCard;
