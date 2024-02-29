import { Box, Typography } from "@mui/material";
import { ColFlex, RowFlex } from "./../../style_extensions/Flex";
import MapComponent from "../../components/Map";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../api/useAxios";
import { io } from "socket.io-client";
import baseURL from "../../utils/baseURL";
import { useEffect, useState } from "react";

const socket = io(baseURL);

function AdminDashboard() {
  const [activeDrivers, setActiveDrivers] = useState<any>([]);

  // function extractLocations(input: any) {
  //   input.map((item: any) => {
  //     // Access the first element of the inner array and then access its 'location' property
  //     item.map((data: any) =>
  //       setActiveDrivers((prevState: any) => [...prevState, data.location])
  //     );
  //   });
  //   // return locations;
  // }

  const extractDriverData = (rawData: any) => {
    const mapTest = new Map(rawData);
    // console.log(mapTest)

    const mapValues = Array.from(mapTest.values());

    console.log(mapValues);
    setActiveDrivers(mapValues);
  };

  useEffect(() => {
    console.log(activeDrivers);
  }, [activeDrivers]);

  useEffect(() => {
    socket.on("live-drivers", (data) => {
      console.log("Live Drivers ------->  ", data);
      const locations = data;
      extractDriverData(locations);
    });
  }, [socket]);

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

  // ALL EMPLOYEES
  const getAllEmployees = () => {
    return useAxios.get("users/employees");
  };

  const { data: allEmployees, status: allEmployeesStatus } = useQuery({
    queryFn: getAllEmployees,
    queryKey: ["All Employees"],
    select: (data) => {
      return data.data.employees;
    },
  });

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
          <Box sx={{ ...ColFlex, gap: "5px" }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {allRoutesStatus === "success" ? allRoutes?.length : 0}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: "15px",
                fontWeight: 600,
              }}
              variant="subtitle2"
              color={"GrayText"}
            >
              Routes Assigned
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex, gap: "5px" }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {allCabStatus === "success" ? allCabs?.length : 0}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: "0.8rem",
                lineHeight: "15px",
                fontWeight: 600,
              }}
              color={"GrayText"}
              variant="subtitle2"
            >
              Available Cabs
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex, gap: "5px" }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {rosteredPassengersStatus === "success"
                ? rosteredPassengers?.length
                : 0}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: "0.8rem",
                lineHeight: "15px",
                fontWeight: 600,
              }}
              variant="subtitle2"
              color={"GrayText"}
            >
              Rostered TMs
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex, gap: "5px" }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              {pendingPassengersStatus === "success"
                ? pendingPassengers?.length
                : 0}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                // color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: "15px",
                fontWeight: 600,
              }}
              color={"GrayText"}
              variant="subtitle2"
            >
              Pending TMs
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
        <MapComponent
          employees={
            allEmployeesStatus === "success" &&
            allEmployees?.length > 1 &&
            allEmployees
          }
          activeDrivers={activeDrivers}
        />
      </Box>
    </Box>
  );
}

export default AdminDashboard;
