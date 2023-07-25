import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import LoginPage from "scenes/loginPage";
import Navbar from "scenes/navbar";

import { themeSettings } from "theme";
import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  let mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const auth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/profile/:userId"
                element={auth ? <ProfilePage /> : <Navigate to={"/"} />}
              />
              <Route
                path="/home"
                element={auth ? <HomePage /> : <Navigate to={"/"} />}
              />
              <Route path="/navbar" element={<Navbar />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
