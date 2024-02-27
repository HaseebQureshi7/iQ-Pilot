import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Modal,
  Typography,
} from "@mui/material";
import { PageFlex, ColFlex, RowFlex } from "./../../style_extensions/Flex";
import MapComponent from "../../components/Map";
import { Call, Close, Person, Settings, Warning } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../../context/UserDataContext";
import UserContextTypes from "../../types/UserContextTypes";

function EmployeeDashboard() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { userData, setUserData }: UserContextTypes =
    useContext(UserDataContext);

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
            <Avatar />
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
              onClick={() => setOpenModal(!openModal)}
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

      {/* SCHEDULE A ROUTE MODAL */}
      <Modal
        sx={{ ...ColFlex, width: "100%", height: "100%" }}
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <Box
          sx={{
            ...ColFlex,
            p: "30px 10px",
            // minHeight: "40vh",
            width: { xs: "90%", lg: "75%" },
            borderRadius: "15px",
            gap: 5,
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            backgroundColor: "background.default",
          }}
        >
          {/* DANGER POPUP */}
          <Box
            sx={{
              ...ColFlex,
              width: "100%",
              textAlign: "center",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <Typography variant="h5" fontWeight={600} sx={{ mb: "10px" }}>
              Are you in Danger ?
            </Typography>
            <Warning
              sx={{ color: "error.main", width: "50px", height: "50px" }}
            />
            <Typography
              sx={{ width: "60%" }}
              variant="body1"
              color={"GrayText"}
              fontWeight={600}
            >
              The admin will be alerted instantly!
            </Typography>
            <Button
              sx={{
                backgroundColor: "error.main",
                color: "background.default",
                padding: "10px 50px",
                borderRadius: "100px",
              }}
              variant="contained"
              size="large"
            >
              Send Alert
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Profile Picture */}
      <Avatar
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ position: "absolute", top: 15, left: 15, zIndex: 999 }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 999,
          ...ColFlex,
          justifyContent: "flex-start",
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          gap: "20px",
          pb: "20px",
        }}
      >
        {/* Arrival Time */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "text.primary",
            textAlign: "center",
            py: "5px",
          }}
        >
          <Typography sx={{ color: "white", fontWeight: 500 }} variant="h4">
            Arrival - <span style={{ fontWeight: 600 }}>1:34 PM</span>
          </Typography>
        </Box>
        {/* Driver & Cab */}
        <Box
          sx={{
            ...RowFlex,
            justifyContent: "space-between",
            width: "100%",
            px: "25px",
          }}
        >
          <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
            <Typography variant="h6">MOHAMMAD SALEEM</Typography>
            <Typography variant="body2">
              CAB NUMBER - <span style={{ fontWeight: 600 }}>D</span>
            </Typography>
          </Box>
          <Avatar />
        </Box>
        <Divider sx={{ width: "75%" }} />
        {/* Cab Details */}
        <Box
          sx={{
            ...ColFlex,
            alignItems: "flex-start",
            width: "100%",
            px: "25px",
          }}
        >
          <Typography variant="h4">SUZUKI EECO</Typography>
          <Box
            sx={{ ...RowFlex, width: "100%", justifyContent: "space-between" }}
          >
            <Typography variant="h6">JK01 AR 9220</Typography>
            <Box sx={{ ...RowFlex, gap: "10px" }}>
              <Box
                sx={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "100px",
                  backgroundColor: "silver",
                  border: "2px solid black",
                }}
              ></Box>
              <Typography variant="body2">Silver</Typography>
            </Box>
          </Box>
        </Box>
        {/* EMP Actions */}
        <Box sx={{ ...RowFlex, width: "100%", gap: "10px", px: "15px" }}>
          <Button
            sx={{
              backgroundColor: "text.primary",
              borderRadius: "10px",
              color: "white",
              padding: "15px",
              width: "60%",
            }}
            startIcon={<Close />}
          >
            CANCEL CAB
          </Button>
          <Button
            sx={{
              backgroundColor: "success.light",
              borderRadius: "10px",
              color: "white",
              padding: "15px",
              width: "40%",
            }}
            startIcon={<Call />}
          >
            CALL
          </Button>
        </Box>
      </Box>
      <MapComponent height="100%" />
    </Box>
  );
}

export default EmployeeDashboard;
