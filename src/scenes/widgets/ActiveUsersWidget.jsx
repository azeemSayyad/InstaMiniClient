import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Status from "components/Status";
import UserImage from "components/UserImage";
import { useEffect } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ActiveUsersWidget = () => {
  const token = useSelector((state) => state.token);
  const [activeUsers, setActiveUsers] = useState(null);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  const getActiveUsers = async () => {
    try {
      let response = await fetch(`${BASE_URL}/activeUsers`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = await response.json();
      setActiveUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getActiveUsers();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Box padding={"0.5rem"}>
        <Typography variant="h5" color={medium}>
          Active
        </Typography>
        <Divider sx={{ marginTop:'1rem' }}/>
        {activeUsers && activeUsers.map(({ name, picturePath }) => (
          <Box key={`${name}-${picturePath}`} mt={"1rem"}>
            <FlexBetween mt={'0.4rem'}>
              <FlexBetween  gap={"1rem"}>
                <UserImage image={picturePath} size="30px" />
                <Typography variant="h5">{name}</Typography>
              </FlexBetween>
              <Status color={true} />
            </FlexBetween>
            </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default ActiveUsersWidget;
