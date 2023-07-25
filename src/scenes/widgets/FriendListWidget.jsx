import { useTheme } from "@emotion/react";
import { Typography, Box, Divider } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const FriendListWidget = () => {
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends =useSelector((state)=>state.user.friends);
  const dispatch = useDispatch();

  const { palette } = useTheme();

  const getUserFriends = async () => {
    let response = await fetch(
      `${BASE_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    dispatch(setFriends({friends:data}));
  };

  useEffect(() => {
    getUserFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper mt={"1rem"}>
      <Box gap={"0.5rem"}>
        <Typography color={palette.neutral.main} mb={"1rem"} fontSize={"large"}>
          Friends
        </Typography>
        <Divider/>
        {friends &&
          friends.map(({ _id, firstName, lastName, picturePath, location }) => (
            <Box key={_id} p={'0.3rem'}>
              <Friend
                size="30px"
                friendId={_id}
                name={firstName + " " + lastName}
                userPicturePath={picturePath}
                subTitle={location}
              />
              <Divider />
            </Box>
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
