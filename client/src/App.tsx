import { Box, PaletteMode, ThemeProvider } from "@mui/material";
import MainRouter from "./router/MainRouter";
import ProjectTheme from "./style_extensions/ProjectTheme";
import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalSnackbar from "./components/ui/Snackbar";
import { SnackbarTypes } from "./types/SnackbarTypes";
import SnackbarContext from "./context/SnackbarContext";
import UserDataContext from "./context/UserDataContext";
import { UserTypes } from "./types/UserTypes";
import useAxios from "./api/useAxios";
import { useNavigate } from "react-router-dom";

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const [userData, setUserData] = useState<UserTypes>();
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  const isBaseRoute: boolean =
    !location.pathname.includes("admin") &&
    !location.pathname.includes("employee") &&
    !location.pathname.includes("driver");

  useEffect(() => {
    if (!userData && document.cookie.startsWith("jwt=")) {
      useAxios
        .post("auth/validate-token", {})
        .then((res) => {
          let user: UserTypes = res.data.currentUser;
          setUserData(user);
          // if (!window.location.pathname.includes("dashboard")) {
          // navigate(user?.role === "admin" ? "adminDashboard" : "dashboard");
          isBaseRoute && navigate(`/${user?.role}`);
          // }
        })
        .catch((err) => console.log(err));
    }

    if (userData?.role) {
      isBaseRoute && navigate(`/${userData?.role}`);
    }
  }, []);

  return (
    <ThemeProvider theme={ProjectTheme(themeMode)}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <GlobalSnackbar value={{ openSnack, setOpenSnack }} />
        <SnackbarContext.Provider value={{ openSnack, setOpenSnack }}>
          {/* <Box
        sx={{
          maxWidth: "100vw",
          minHeight: "100vh",
          color: "text.primary",
          background: "background.default",
          overflowX:"hidden"
        }}
      > */}
          <MainRouter />
          <ReactQueryDevtools />
          {/* </Box> */}
        </SnackbarContext.Provider>
      </UserDataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
