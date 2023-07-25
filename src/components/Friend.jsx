import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import { setFriends, setPosts, setProgress } from "state";
import { useNavigate } from "react-router-dom";
import { PersonRemoveOutlined, PersonAddOutlined } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import DeleteIcon from "@mui/icons-material/Delete";
import { showWarningModal } from "./ShowToast";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Friend = ({
  friendId,
  userPicturePath,
  subTitle,
  name,
  size = "60px",
  postId = null,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const abortController = new AbortController();
  const {signal} = abortController;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    dispatch(setProgress(30));
    let response = await fetch(`${BASE_URL}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setProgress(70));
    let data = await response.json();
    dispatch(setProgress(100));
    dispatch(setFriends({ friends: data }));
  };

  const deletePost = async () => {
    if (postId!==null) {
      dispatch(setProgress(30));const timeout = setTimeout(() => {
        abortController.abort();
        dispatch(setProgress(100));
        showWarningModal(
          "Oops! The connection is taking longer than expected. Please check your internet connection."
        );
      }, 30000);
      let response = await fetch(
        `${BASE_URL}/posts/${postId}/delete`,
        // `http://localhost:3001/posts/${postId}/delete`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },{signal}
      );
      dispatch(setProgress(70))
      let posts = await response.json();
      clearTimeout(timeout);
      dispatch(setPosts({posts}));
      dispatch(setProgress(100));
    }
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap={"1rem"}>
          <UserImage image={userPicturePath} size={size} />
          <Box
            onClick={() => {
              navigate(`profile/${userPicturePath}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize={"0.75rem"}>
              {subTitle}
            </Typography>
          </Box>
        </FlexBetween>
        {_id !== friendId ? (
          <IconButton onClick={() => patchFriend()}>
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        ) : (
          <IconButton onClick={() => deletePost()}>
            <DeleteIcon sx={{ color: main }} />
          </IconButton>
        )}
      </FlexBetween>
    </>
  );
};
export default Friend;
