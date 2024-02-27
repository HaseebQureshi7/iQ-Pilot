import { Avatar, Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ColFlex, RowFlex } from "../../style_extensions/Flex";
import RouteTypes from "../../types/RouteTypes";
import useAxios from "../../api/useAxios";
import { UserTypes } from "../../types/UserTypes";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowBack,
  Close,
  Done,
  DoneAll,
  Route,
  TaskAlt,
} from "@mui/icons-material";
import AttendanceTypes from "../../types/attendanceTypes";

function RouteCompleted() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.state as RouteTypes;

  const getAllDriverRoutes = () => {
    return useAxios.get(`attendance/route-attendance/${route?._id}`);
  };

  const { data: attendanceData, status: attendanceDataStatus } = useQuery({
    queryFn: getAllDriverRoutes,
    queryKey: ["Route Attendance"],
    select: (data: any) => {
      return data.data.passengers as Array<UserTypes>;
    },
  });

  // console.log(attendanceData);

  return (
    <Box
      sx={{
        ...ColFlex,
        width: "100%",
        // minHeight: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        pb: "50px",
      }}
    >
      {/* ROUTE STATS */}
      <Box
        sx={{
          ...RowFlex,
          width: "100%",
          justifyContent: "space-between",
          p: "30px",
          // backgroundColor: "text.primary",
          // color: "white",
        }}
      >
        <Box sx={{ ...ColFlex }}>
          <Typography variant="h4" fontWeight={600}>
            {route?.totalDistance}
          </Typography>
          <Typography
            sx={{ color: "text.secondary" }}
            variant="body2"
            fontWeight={500}
          >
            Kilometers
          </Typography>
        </Box>
        <Box sx={{ ...ColFlex }}>
          <Typography variant="h4" fontWeight={600}>
            {route?.estimatedTime}
          </Typography>
          <Typography
            sx={{ color: "text.secondary" }}
            variant="body2"
            fontWeight={500}
          >
            Minutes
          </Typography>
        </Box>
        <Box sx={{ ...ColFlex }}>
          <Typography variant="h4" fontWeight={600}>
            {route?.fuelConsumed}L
          </Typography>
          <Typography
            sx={{ color: "text.secondary" }}
            variant="body2"
            fontWeight={500}
          >
            Petrol
          </Typography>
        </Box>
      </Box>

      {/* PASSENGER BOX */}
      <Box
        sx={{
          ...ColFlex,
          width: "95%",
          margin: "auto",
          my: "15px",
          padding: "15px",
          gap: "40px",
          color: "white",
          backgroundColor: "text.primary",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{ ...RowFlex, width: "100%", justifyContent: "space-between" }}
        >
          <Box sx={{ ...RowFlex, gap: "10px" }}>
            <TaskAlt sx={{ width: "40px", height: "40px" }} />
            {/* <Typography variant="h5">Completed</Typography> */}
          </Box>
          <Box
            sx={{
              ...RowFlex,
              gap: "10px",
              backgroundColor: "primary.main",
              borderRadius: "15px",
              padding: "5px 10px",
            }}
          >
            <DoneAll />
            <Typography variant="h5">
              {route?.passengers?.length + "/" + attendanceData?.length} Picked
            </Typography>
          </Box>
        </Box>
        {/* PASSENGERS */}
        <Box sx={{ ...ColFlex, width: "100%", gap: "15px" }}>
          {attendanceData?.length &&
            attendanceData.map((attendance: AttendanceTypes) => {
              return (
                // Passenger
                <Box
                  key={attendance?._id}
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
                    <Avatar sx={{ width: "30px", height: "30px" }} />
                    <Box>
                      <Typography variant="body1">
                        {attendance?.ofEmployee?.fName +
                          " " +
                          attendance?.ofEmployee?.lName}
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
                        {attendance?.ofEmployee?.address}
                      </Typography>
                    </Box>
                  </Box>
                  {attendance?.isPresent ? <Done /> : <Close />}
                </Box>
              );
            })}
        </Box>
      </Box>
      {/* BACK TO DASH */}
      <Button
        onClick={() => navigate("/driver")}
        sx={{ backgroundColor: "primary.dark", color: "white", px: 10 }}
        size="large"
        startIcon={<ArrowBack />}
      >
        Back To Dashboard
      </Button>
    </Box>
  );
}

export default RouteCompleted;