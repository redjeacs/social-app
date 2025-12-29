export const handlePostLike = async ({
  e,
  user,
  post,
  token,
  setAlert,
  navigate,
}) => {
  e.preventDefault();
  const userId = user.id;
  let postId = post.id;

  if (post.originalPostId) {
    postId = post.originalPostId;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      }
    );

    let data;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = { message: await res.text() };
    }

    if (!res.ok) {
      setAlert({
        type: "error",
        message: `An error occured - ${data.message || res.statusText}`,
      });
      return;
    }

    setAlert({
      type: "success",
      message: data.message || "Post liked successfully",
    });
    navigate(0);
  } catch (err) {
    console.error("Error liking post:", err);
    setAlert({
      type: "error",
      message: `An error occured - ${err.message}`,
    });
  }
};

export const handleRepost = async ({
  e,
  user,
  post,
  token,
  setAlert,
  navigate,
}) => {
  e.preventDefault();
  const postId = post.id;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/repost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      }
    );

    let data;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = { message: await res.text() };
    }

    if (!res.ok) {
      setAlert({
        type: "error",
        message: `An error occured - ${data.message || res.statusText}`,
      });
      return;
    }

    setAlert({
      type: "success",
      message: data.message || "Post reposted successfully",
    });
    navigate(0);
    console.log("Repost data:", data);
  } catch (err) {
    console.error("Error reposting post:", err);
    setAlert({
      type: "error",
      message: `An error occured - ${err.message}`,
    });
  }
};

export const handleUndoRepost = async ({ e, user, post, token, setAlert }) => {
  e.preventDefault();

  let targetPostId;
  if (post.originalPostId && post.user.id === user.id) {
    targetPostId = post.id;
  } else {
    targetPostId = post.reposts.find((repost) => repost.userId === user.id).id;
  }

  console.log(targetPostId);

  const postId = targetPostId;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/undo-repost`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      }
    );

    let data;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = { message: await res.text() };
    }

    if (!res.ok) {
      setAlert({
        type: "error",
        message: `An error occured - ${data.message || res.statusText}`,
      });
      return;
    }

    setAlert({
      type: "success",
      message: data.message || "You have undone the repost",
    });
  } catch (err) {
    console.error("Error undoing repost:", err);
    setAlert({
      type: "error",
      message: `An error occured - ${err.message}`,
    });
  }
};
