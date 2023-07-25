import {
  EditOutlined,
  AttachFileOutlined,
  DeleteOutlined,
  ImageOutlined,
  MicOutlined,
  GifBoxOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  Typography,
  InputBase,
  useMediaQuery,
  IconButton,
  Divider,
  Button,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setProgress } from "state";
import Dropzone from "react-dropzone";
import { showWarningModal } from "components/ShowToast";

const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const abortController = new AbortController();
  const {signal} = abortController;

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const handlePost = async () => {
    let formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    dispatch(setProgress(30));
    const timeout = setTimeout(() => {
      abortController.abort();
      dispatch(setProgress(100));
      showWarningModal(
        "Oops! The connection is taking longer than expected. Please check your internet connection."
      );
    }, 30000);
    let response = await fetch(`${BASE_URL}/posts`, {
    // let response = await fetch(`http://localhost:3001/posts`, {
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },{signal});
    dispatch(setProgress(70))
    let posts = await response.json();
    clearTimeout(timeout);
    dispatch(setPosts({posts}));
    setImage(null);
    setPost("");
    dispatch(setProgress(100))
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap={"1rem"}>
        <UserImage image={picturePath} />
        <InputBase
          onChange={(e) => setPost(e.target.value)}
          placeholder="Share your thoughts here..."
          value={post}
          sx={{
            backgroundColor: medium,
            padding: "1rem 1.5rem",
            borderRadius: "2rem",
            width: "100%",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFile) => {
              setImage(acceptedFile[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="0.3rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween gap={"1.5rem"}>
        <FlexBetween gap={"0.5rem"} onClick={() => setIsImage(!isImage)}>
          <ImageOutlined color={mediumMain} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": { cursor: "pointer" },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap={"0.5rem"} color={mediumMain}>
              <GifBoxOutlined color={mediumMain} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap={"0.5rem"} color={mediumMain}>
              <AttachFileOutlined color={mediumMain} />
              <Typography color={mediumMain}>Attach</Typography>
            </FlexBetween>

            <FlexBetween gap={"0.5rem"} color={mediumMain}>
              <MicOutlined color={mediumMain} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween>
            <IconButton sx={{ "&:hover": { cursor: "pointer" } }}>
              <MoreHorizOutlined color={medium} />
            </IconButton>
          </FlexBetween>
        )}

        <Button
          onClick={handlePost}
          disabled={!post}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            cursor: "pointer",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
