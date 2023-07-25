import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const PostsWidget = ({ userId, isProfile = false }) => {
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPosts = async () => {
    let response = await fetch(`${BASE_URL}/posts`, {
    // let response = await fetch(`http://localhost:3001/posts`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    let response = await fetch(`${BASE_URL}/posts/${userId}`, {
    // let response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
