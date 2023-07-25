import {
    LocationOnOutlined,
    ManageAccountsOutlined,
    EditOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material"

import { useTheme, Box, Typography, Divider } from "@mui/material"

import FlexBetween from "components/FlexBetween"
import UserImage from "components/UserImage"
import WidgetWrapper from "components/WidgetWrapper"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const UserWidget = ({ user_id, picturePath }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token)
    const theme = useTheme()
    let dark = theme.palette.neutral.dark
    let main = theme.palette.neutral.main
    let medium = theme.palette.neutral.medium

    const getUser = async () => {
        let response = await fetch(
            `${BASE_URL}/users/${user_id}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        let data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    const {
        firstName,
        lastName,
        occupation,
        location,
        friends,
        viewedProfiles = 0,
        impressions = 0
    } = user;
    return (

        <WidgetWrapper theme={theme}>

            {/* First Row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${user_id}`)}
            >
                <FlexBetween
                    gap={"1rem"}
                >
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: main,
                                    cursor: "pointer",
                                },
                            }}
                        >{firstName} {lastName}</Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* Second Row */}
            <Box gap={"0.3rem"} padding={"0.5rem 0"}>
                <Box display={"flex"} alignItems={"center"} gap={"1rem"} mb={"0.3rem"}>
                    <LocationOnOutlined color={main} />
                    <Typography fontWeight={"300"} color={medium}>
                        {location}
                    </Typography>
                </Box>
                <Box x display={"flex"} alignItems={"center"} gap={"1rem"} mb={"0.3rem"}>
                    <WorkOutlineOutlined color={main} />
                    <Typography fontWeight={"300"} color={medium}>
                        {occupation}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/* Third Row */}
            <Box gap={"0.3rem"} padding={"0.5rem 0"}>
                <Box display={"flex"} justifyContent={"space-between"} gap={"1rem"} mb={"0.3rem"}>
                    <Typography fontWeight={"300"} color={medium}>
                        Who's viewed your profile
                    </Typography>
                    <Typography color={main} fontWeight={"500"}>
                        {viewedProfiles}
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} gap={"1rem"} mb={"0.3rem"}>
                    <Typography fontWeight={"300"} color={medium}>
                        impressions of your Posts
                    </Typography>
                    <Typography color={main} fontWeight={"500"} >
                        {impressions}
                    </Typography>
                </Box>
            </Box>

            <Divider/>

            {/* Fourth Row */}
            <Box gap={"1rem"} padding={"0.5rem 0"}>
                <Typography color={dark} variant="h5" fontWeight={"400"} mb={"0.7rem"}>Social Profiles</Typography>
                <FlexBetween mb={"0.5rem"}>
                    <FlexBetween gap={"1rem"}>
                    <img src="../assets/linkedin.png" alt="twitter" />
                        <Typography fontWeight={"400"} color={main}>
                            LinkedIn
                        </Typography>
                    </FlexBetween>
                    <EditOutlined color={main} />
                </FlexBetween>
                <FlexBetween mb={"0.5rem"}>
                    <FlexBetween gap={"1rem"}>
                    <img src="../assets/twitter.png" alt="twitter" />
                        <Typography fontWeight={"400"} color={main}>
                            Twitter
                        </Typography>
                    </FlexBetween>
                    <EditOutlined color={main} />
                </FlexBetween>
            </Box>

        </WidgetWrapper >
    )
}

export default UserWidget