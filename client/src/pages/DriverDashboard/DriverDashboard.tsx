import {
  Close,
  Person,
  Settings,
  Warning,
  Logout,
  ExpandMore,
  Route,
  Flag,
  Call,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Avatar,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  ButtonBase,
} from "@mui/material";
import { PageFlex, ColFlex, RowFlex } from "../../style_extensions/Flex";
import { useContext, useState } from "react";
import UserDataContext from "../../context/UserDataContext";
import UserContextTypes from "../../types/UserContextTypes";
import { useNavigate } from "react-router-dom";
import useAxios from "../../api/useAxios";
import { useQuery } from "@tanstack/react-query";
import RouteTypes from "../../types/RouteTypes";
import baseURL from "../../utils/baseURL";
import ConvertTo12HourFormat from "../../utils/12HourFormat";
import { UserTypes } from "../../types/UserTypes";

function DriverDashboard() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isRouteSelected, setIsRouteSelected] = useState<any>({});

  const { userData, setUserData }: UserContextTypes =
    useContext(UserDataContext);

  const navigate = useNavigate();

  function Logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserData?.(undefined);
    navigate("/");
  }

  const getAllDriverRoutes = () => {
    return useAxios.get(`route/driverRoute/${userData?._id}`);
  };

  const { data: DriverRoutes, status: allDriverRoutesStatus } = useQuery({
    queryFn: getAllDriverRoutes,
    queryKey: ["All Driver's Routes"],
    select: (data: any) => {
      return data.data.routes as Array<RouteTypes>;
    },
  });

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
          height: "auto",
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
        {/* Assigned Routes */}
        <Box
          sx={{
            ...ColFlex,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* AR Header */}
          <Box
            sx={{
              ...RowFlex,
              width: "100%",
              gap: "15px",
              p: "15px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Assigned Routes ({DriverRoutes?.length})
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex, width: "100%", gap: "20px", px: "10px" }}>
            {DriverRoutes?.length &&
              DriverRoutes.map((route: RouteTypes) => {
                return (
                  <Accordion
                    expanded={isRouteSelected === route}
                    key={route?._id}
                    sx={{
                      width: "100%",
                      backgroundColor:
                        isRouteSelected == route ? "text.primary" : "white",
                      color:
                        isRouteSelected == route ? "white" : "text.primary",
                    }}
                    onClick={() => setIsRouteSelected(route)}
                    elevation={1}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMore
                          sx={{
                            color:
                              isRouteSelected == route ? "white" : "inherit",
                          }}
                        />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Box
                        sx={{
                          ...RowFlex,
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Route sx={{ width: "30px", height: "30px" }} />
                        <Typography variant="h5" fontWeight={600}>
                          {ConvertTo12HourFormat(route?.shiftTime as string)}
                        </Typography>
                        <Typography sx={{ mr: "15px" }} variant="h5">
                          {route?.totalDistance}km
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ ...ColFlex, width: "100%", gap: "15px" }}>
                        {/* HEADER */}
                        <Box
                          sx={{
                            ...RowFlex,
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            component={"img"}
                            sx={{ width: "100px", aspectRatio: 2.6863 }}
                            src={
                              route?.typeOfRoute === "pickup"
                                ? "/images/pickup-light.png"
                                : "/images/drop-light.png"
                            }
                          />
                          <Button
                            size="large"
                            variant="contained"
                            sx={{ borderRadius: "10px" }}
                            endIcon={<Flag />}
                          >
                            Start Route
                          </Button>
                        </Box>
                        <Divider sx={{ width: "100%" }} />
                        <Box sx={{ ...ColFlex, width: "100%", gap: "10px" }}>
                          {route?.passengers?.length &&
                            route?.passengers.map((passenger: UserTypes) => {
                              return (
                                // Passenger
                                <Box
                                  key={passenger?._id}
                                  sx={{
                                    ...RowFlex,
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      ...RowFlex,
                                      width: "80%",
                                      justifyContent: "flex-start",
                                      gap: "10px",
                                    }}
                                  >
                                    <Avatar
                                      sx={{ width: "30px", height: "30px" }}
                                    />
                                    <Box>
                                      <Typography variant="body1">
                                        {passenger.fName +
                                          " " +
                                          passenger.lName}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "0.7rem",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Route
                                          sx={{
                                            width: "12.5px",
                                            height: "12.5px",
                                            mr: "5px",
                                            color: "secondary.main",
                                          }}
                                        />
                                        {passenger.address}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <ButtonBase
                                    component={"a"}
                                    href={`tel:${passenger?.phone}`}
                                    // onClick={() => handleRemovePassengersFromCab(employee)}
                                    sx={{
                                      ...RowFlex,
                                      width: "20%",
                                      borderRadius: "100px",
                                    }}
                                  >
                                    <Call
                                      sx={{
                                        backgroundColor: "success.main",
                                        borderRadius: "100px",
                                        p: 1,
                                        width: "35px",
                                        height: "35px",
                                        color: "white",
                                      }}
                                    />
                                  </ButtonBase>
                                </Box>
                              );
                            })}
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DriverDashboard;
