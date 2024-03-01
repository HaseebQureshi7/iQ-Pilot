import { PaletteMode, ThemeProvider } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "./api/useAxios";
import GlobalSnackbar from "./components/ui/Snackbar";
import SelectedEmpsContext from "./context/SelectedEmpsContext";
import SnackbarContext from "./context/SnackbarContext";
import UserDataContext from "./context/UserDataContext";
import MainRouter from "./router/MainRouter";
import ProjectTheme from "./style_extensions/ProjectTheme";
import { SnackbarTypes } from "./types/SnackbarTypes";
import { UserTypes } from "./types/UserTypes";

function App() {
  const [themeMode] = useState<PaletteMode>("light");
  const [userData, setUserData] = useState<UserTypes>();
  const [selectedEmps, setSelectedEmps] = useState<Array<UserTypes>>([]);
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
      const autoLogin = async () => {
        try {
          if (!userData) {
            const response = await useAxios.post("/auth/validate-token", {});
            if (response.status === 200) {
              setUserData(response.data.user);
              isBaseRoute && navigate(`/${response.data.currentUser?.role}`)
            } else {
              return;
            }
          }
        } catch (error) {
          console.error("Auto-login failed:", error);
        }
      };
      autoLogin();
    }, [navigate, setUserData, userData]);

  return (
    <ThemeProvider theme={ProjectTheme(themeMode)}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <SelectedEmpsContext.Provider value={{ selectedEmps, setSelectedEmps }}>
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
        </SelectedEmpsContext.Provider>
      </UserDataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
