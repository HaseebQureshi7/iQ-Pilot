import { Dashboard, LocalTaxi, Hail, Route } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Avatar,
  Typography,
  ButtonProps,
} from "@mui/material";
import { ColFlex } from "../../style_extensions/Flex";
import { useContext } from "react";
import UserDataContext from "../../context/UserDataContext";
import UserContextTypes from "../../types/UserContextTypes";
import { useNavigate } from "react-router-dom";

interface SidebarButtonPropTypes extends ButtonProps {
  text: string;
  isActive?: boolean;
}

function Sidebar() {
  const { userData, setUserData }: UserContextTypes =
    useContext(UserDataContext);

  const navigate = useNavigate();

  function Logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserData?.(undefined);
    navigate("/");
  }

  const SideBarButton = ({
    text,
    isActive = false,
    ...rest
  }: SidebarButtonPropTypes) => {
    return (
      <Button
        sx={{
          borderRadius: "100px",
          backgroundColor: isActive ? "text.primary" : "inherit",
          color: !isActive ? "text.primary" : "white",
          width: "90%",
          py: "10px",
          justifyContent: "flex-start",
          gap: "10px",
          pl: "25px",
        }}
        variant={isActive ? "contained" : "text"}
        {...rest}
        size="small"
      >
        {text}
      </Button>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "20%",
        height: "100%",
        borderRadius: "15px",
      }}
    >
      {/* Section - 1 */}
      <Box sx={{ ...ColFlex, width: "100%", height: "20%" }}>
        <Box
          component={"img"}
          src="/images/logo-full.png"
          sx={{ width: "75px", aspectRatio: 1 }}
        />
      </Box>

      <Divider
        sx={{ width: "80%", borderWidth: "1px", margin: "auto", mb: "25px" }}
      />

      {/* Section - 2 */}
      <Box
        sx={{
          ...ColFlex,
          width: "100%",
          height: "50%",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <SideBarButton
          text="Dashboard"
          startIcon={<Dashboard />}
          isActive={true}
        />
        <SideBarButton
          text="Scheduled Routes"
          startIcon={<Route />}
          isActive={false}
        />
        <SideBarButton
          text="All Cab Drivers"
          startIcon={<LocalTaxi />}
          isActive={false}
        />
        <SideBarButton
          text="All Team Members"
          startIcon={<Hail />}
          isActive={false}
        />
      </Box>

      {/* <Divider
        sx={{ width: "85%", borderWidth: "1px", margin: "auto", mb: "15px" }}
      /> */}

      {/* Section - 3 */}
      <Box
        sx={{
          ...ColFlex,
          width: "100%",
          height: "30%",
          justifyContent: "flex-start",
        }}
      >
        <Avatar sx={{ width: "60px", height: "60px", mb: "10px" }} />
        <Typography variant="body1" fontWeight={600}>
          {userData?.fName[0] + "." + " " + userData?.lName}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            mb: "20px",
            fontSize: "0.65rem",
          }}
          variant="subtitle2"
        >
          {userData?.email}
        </Typography>
        <Button
          onClick={Logout}
          sx={{
            borderRadius: "100px",
            width: "35%",
            p:"1px",
            fontSize:"0.7rem"
          }}
          size="small"
          variant="contained"
          color="error"
          // startIcon={<Dashboard />}
        >
          LOG OUT
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
