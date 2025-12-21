function Post({ post }) {
  return (
    <div className="flex w-full items-stretch border-b border-gray-700 p-4 justify-center cursor-pointer hover:bg-gray-900 ease-in-out duration-500">
      <p>{post?.text}</p>
    </div>
  );
}

export default Post;
