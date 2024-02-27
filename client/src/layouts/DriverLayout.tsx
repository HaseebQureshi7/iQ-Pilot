import { Close, Person, Settings, Warning, Logout } from "@mui/icons-material";
import { Drawer, Avatar, Typography, Button, Box } from "@mui/material";
import { PageFlex, ColFlex, RowFlex } from "../style_extensions/Flex";
import baseURL from "../utils/baseURL";
import { ReactNode, useContext, useState } from "react";
import UserDataContext from "../context/UserDataContext";
import { Outlet, useNavigate } from "react-router-dom";
import UserContextTypes from "../types/UserContextTypes";

function DriverLayout() {
  const { userData, setUserData }: UserContextTypes =
    useContext(UserDataContext);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  function Logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserData?.(undefined);
    navigate("/");
  }

  return (
    <Box sx={{ ...PageFlex, height: "100vh" }}>
      {/* SIDEBAR */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
        <Box
          sx={{
            ...ColFlex,
            width: "80vw",
            height: "100vh",
            gap: "40px",
            p: "15px",
          }}
        >
          {/* Logo Header */}
          <Box
            sx={{
              ...RowFlex,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
              component={"img"}
              src="/images/logo-blue.png"
              sx={{ width: "50px", aspectRatio: 1 }}
            />
            <Close
              sx={{ width: 30, height: 30 }}
              onClick={() => setOpenDrawer(!openDrawer)}
            />
          </Box>
          {/* Profile Card */}
          <Box
            sx={{
              ...RowFlex,
              width: "100%",
              gap: "15px",
              backgroundColor: "text.primary",
              color: "white",
              borderRadius: "10px",
              p: "5px",
            }}
          >
            <Avatar src={baseURL + userData?.profilePicture} />
            <Box sx={{ ...ColFlex, width: "70%", alignItems: "flex-start" }}>
              <Typography variant="h6">
                {userData?.fName + " " + userData?.lName}
              </Typography>
              <Typography variant="caption" color={"lightgrey"}>
                {(userData?.department?.charAt(0).toUpperCase() as string) +
                  userData?.department?.slice(1, 99)}{" "}
                Department
              </Typography>
            </Box>
          </Box>
          {/* OPTIONS/ACTIONS */}
          <Box sx={{ ...ColFlex, width: "100%" }}>
            <Button
              sx={{
                justifyContent: "flex-start",
                p: "15px",
                pl: "20px",
                color: "text.primary",
              }}
              fullWidth
              startIcon={<Person />}
              // variant={"outlined"}
            >
              Profile
            </Button>
            <Button
              sx={{
                justifyContent: "flex-start",
                p: "15px",
                pl: "20px",
                color: "text.primary",
              }}
              fullWidth
              startIcon={<Settings />}
              // variant={"outlined"}
            >
              Settings
            </Button>
          </Box>
          {/* LOGOUT AND SOS */}
          <Box
            sx={{ ...ColFlex, width: "100%", gap: "15px", marginTop: "auto" }}
          >
            <Button
              sx={{
                backgroundColor: "error",
                borderRadius: "10px",
                p: "15px",
              }}
              color={"error"}
              fullWidth
              startIcon={<Warning />}
              variant={"contained"}
            >
              EMERGENCY SOS
            </Button>
            <Button
              onClick={() => Logout()}
              sx={{
                backgroundColor: "text.primary",
                color: "white",
                borderRadius: "10px",
                p: "15px",
              }}
              fullWidth
              variant={"contained"}
            >
              LOG OUT
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Body Start */}
      <Box
        sx={{
          ...ColFlex,
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          gap: "0px",
          pb: "20px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            ...RowFlex,
            width: "100%",
            justifyContent: "space-between",
            borderBottom: "2px solid lightgrey",
            p: "15px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {userData?.fName[0] + ". " + userData?.lName}
          </Typography>
          {/* Profile Picture */}
          <Avatar
            src={baseURL + userData?.profilePicture}
            onClick={() => setOpenDrawer(!openDrawer)}
          />
        </Box>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default DriverLayout;
