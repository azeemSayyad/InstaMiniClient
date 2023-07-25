import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import Friend from "components/Friend";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { setPost } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const loggedInUserPicturePath = useSelector(
    (state) => state.user.picturePath
  );

  const [isComments, setIsComments] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [comment, setComment] = useState("");

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const getImage = async (imagePath) => {
    if (imagePath) {
      fetch(`${BASE_URL}/assets/${imagePath}`)
      // fetch(`http://localhost:3001/assets/${imagePath}`)
        .then((resp) => {
          if (!resp.ok) return new Error("Post not Found");
          return resp.blob();
        })
        .then((blob) => {
          let url = URL.createObjectURL(blob);
          setImageURL(url);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLike = async () => {
    let response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    let data = await response.json();
    dispatch(setPost({ post: data }));
  };

  const handleComment = async () => {
    let body = {
      comment,
      commentedUserId: loggedInUserId,
    };
    let response = await fetch(`${BASE_URL}/posts/${postId}/comment`, 
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    let post = await response.json();
    dispatch(setPost({ post: post }));
    setComment("");
  };

  useEffect(() => {
    getImage(picturePath);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper marginTop={'1rem'}>
      <Friend
        name={name}
        userPicturePath={userPicturePath}
        friendId={postUserId}
        subTitle={location}
        postId={postId}
      />
      <Typography color={main} sx={{ mt: "1rem", mb: "0.5rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height={"auto"}
          sx={{ marginTop: "0.5rem", borderRadius: "0.5rem" }}
          src={imageURL}
          alt="post pic"
        />
      )}

      <FlexBetween>
        <FlexBetween gap={"0.5rem"}>
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography color={main}>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography color={main}>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/*Comments section*/}
      {isComments && (
        <>
          <Divider sx={{ margin: "0.5rem 0" }} />
          <Box mt={"0.3rem"}>
            <Box
              width="100%"
              padding="0.2rem 0"
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
              gap="0.3rem"
            >
              <Box flexBasis={"90%"}>
                <FlexBetween gap={"0.75rem"}>
                  <UserImage image={loggedInUserPicturePath} size="26px" />
                  <InputBase
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    sx={{
                      backgroundColor: { main },
                      border: `2px solid ${main}`,
                      borderRadius: "0.3rem",
                      width: "100%",
                      m: "0.5rem 0 0.75rem 0",
                      paddingLeft: "0.75rem",
                    }}
                  />
                </FlexBetween>
              </Box>

              <Box flexBasis={"7%"}>
                <IconButton onClick={handleComment}>
                  <SendOutlined color="primary" fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {comments.map((object, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />

                <FlexBetween>
                  <Box
                    key={i}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1.5rem"}
                    sx={{ m: "0.5rem 0", pl: "0.75rem" }}
                  >
                    <UserImage image={object.picturePath} size="24px" />
                    <Box gap={"0.01rem"}>
                      <Typography color={medium} fontSize={"11px"}>
                        {object.name}
                      </Typography>
                      <Typography color={main} fontSize={"15px"}>
                        {object.comment}
                      </Typography>
                    </Box>
                  </Box>
                </FlexBetween>
              </Box>
            ))}
            {/*Comments section*/}
            <Divider />
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
