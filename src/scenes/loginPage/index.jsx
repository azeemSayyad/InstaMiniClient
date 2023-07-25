import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "state";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { useEffect } from "react";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:900px)");
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress);
  const theme = useTheme();

  useEffect(()=>{
    dispatch(setProgress(0)); 
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box>
        <LoadingBar
          color="#e20057"
          height={2}
          progress={progress}
          onLoaderFinished={() => dispatch(setProgress(0))}
          className="loading-div"
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Sociopedia
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          textAlign="center"
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Sociopedia, the Social Media for Sociopaths!
          </Typography>
          <Form />
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;
