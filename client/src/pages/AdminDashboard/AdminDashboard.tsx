import { Box, Typography } from "@mui/material";
import { ColFlex, RowFlex } from "./../../style_extensions/Flex";
import MapComponent from "../../components/Map";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../api/useAxios";

function AdminDashboard() {
  // ALL ASSIGNED ROUTES
  const getAllAssignedRoutesQF = () => {
    return useAxios.get("route/nonActive");
  };

  const { data: allRoutes, status: allRoutesStatus } = useQuery({
    queryFn: getAllAssignedRoutesQF,
    queryKey: ["All Assigned Routes"],
    select: (data) => {
      return data.data.nonActiveroutes;
    },
  });

  // ALL AVAILABLE CABS
  const getAllCabsQF = () => {
    return useAxios.get("users/drivers");
  };

  const { data: allCabs, status: allCabStatus } = useQuery({
    queryFn: getAllCabsQF,
    queryKey: ["All Cabs"],
    select: (data) => {
      return data.data.drivers;
    },
  });

  // ALL ROASTERED PASSENGERS
  const getRosteredPassengersQF = () => {
    return useAxios.get("route/rosteredPassengers");
  };

  const { data: rosteredPassengers, status: rosteredPassengersStatus } =
    useQuery({
      queryFn: getRosteredPassengersQF,
      queryKey: ["All Rostered Passengers"],
      select: (data) => {
        return data.data.roasterd;
      },
    });

  // ALL PENDING PASSENGERS
  const getPendingPassengersQF = () => {
    return useAxios.get("route/pendingPassengers");
  };

  const { data: pendingPassengers, status: pendingPassengersStatus } = useQuery(
    {
      queryFn: getPendingPassengersQF,
      queryKey: ["All Pending Passengers"],
      select: (data) => {
        return data.data.pendingPassengers;
      },
    }
  );

  return (
    <Box
      sx={{
        ...ColFlex,
        width: "100%",
        height: "100%",
        // backgroundColor: "white",
        // borderRadius: "10px",
        gap: "15px",
      }}
    >
      {/* TODAYS PLAN */}
      <Box
        sx={{
          ...RowFlex,
          width: "100%",
          height: "20%",
          backgroundColor: "white",
          borderRadius: "15px",
          justifyContent: "space-between",
        }}
      >
        {/* section-1 */}
        <Box
          sx={{
            ...RowFlex,
            width: "40%",
            height: "20%",
            backgroundColor: "white",
            borderRadius: "15px",
            justifyContent: "flex-start",
            marginLeft: "50px",
          }}
        >
          <Box sx={{ ...ColFlex, alignItems: "flex-start", gap: "5px" }}>
            <Typography variant="h4" fontWeight={700}>
              Today's Plan
            </Typography>
            <Typography color={"GrayText"} variant="body1">
              It’s{" "}
              <span style={{ fontWeight: 600 }}>
                Tuesday, 19th of March - 2024
              </span>
            </Typography>
          </Box>
        </Box>
        {/* section-2 */}
        <Box
          sx={{
            ...RowFlex,
            width: "60%",
            height: "20%",
            backgroundColor: "white",
            borderRadius: "15px",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ ...ColFlex }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {allRoutesStatus === "success" ? allRoutes?.length : 0}
            </Typography>
            <Typography
              sx={{
                width: "50%",
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: "15px",
              }}
              variant="subtitle2"
            >
              Routes Assigned
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {allCabStatus === "success" ? allCabs?.length : 0}
            </Typography>
            <Typography
              sx={{
                width: "50%",
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: "15px",
              }}
              variant="subtitle2"
            >
              Available Cabs
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {rosteredPassengersStatus === "success"
                ? rosteredPassengers?.length
                : 0}
            </Typography>
            <Typography
              sx={{
                width: "50%",
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: "15px",
              }}
              variant="subtitle2"
            >
              TMs Rostered
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {pendingPassengersStatus === "success"
                ? pendingPassengers?.length
                : 0}
            </Typography>
            <Typography
              sx={{
                width: "50%",
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: "15px",
              }}
              variant="subtitle2"
            >
              TMs Pending
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* MAP */}
      <Box
        sx={{
          width: "100%",
          height: "80%",
          backgroundColor: "white",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <MapComponent />
      </Box>
    </Box>
  );
}

export default AdminDashboard;
