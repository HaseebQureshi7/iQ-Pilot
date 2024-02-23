import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { PageFlex, ColFlex, RowFlex } from "./../../style_extensions/Flex";
import MapComponent from "../../components/Map";
import RouteTypes from "../../types/RouteTypes";
import ConvertTo12HourFormat from "../../utils/12HourFormat";
import { Add, Cancel, Route, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { UserTypes } from "../../types/UserTypes";
import { useQueryClient } from "@tanstack/react-query";

function AddPassengers() {
  const location = useLocation();
  const navigate = useNavigate();

  const qc = useQueryClient();

  const employees: Array<UserTypes> = (
    qc.getQueryData(["All Employees"]) as any
  )?.data?.employees;

  const [searchField, setSearchField] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<Array<UserTypes>>(
    []
  );

  const [department, setDepartment] = useState("");

  // Function to handle changes in the department selection
  const handleChangeDepartment = (event: any) => {
    setDepartment(event.target.value);
  };

  const SearchEmployees = (e: any) => {
    setSearchField(e.target.value);
    //  INTEGRATION MISSING  -----> Department Sort due to no field of department on the BE
    const filteredEmps = employees.filter(
      (emp: UserTypes) =>
        emp.fName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        emp.lName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredEmps);
  };

  useEffect(() => {
    console.log(filteredEmployees);
  }, [filteredEmployees]);

  const routeState = location?.state as RouteTypes;

  if (!routeState) {
    navigate(-1);
  }
  return (
    <Box
      sx={{
        ...PageFlex,
        flexDirection: "row",
        gap: "15px",
        p: "15px",
        height: "100vh",
        backgroundColor: "#D9D9D9",
      }}
    >
      {/* LS */}
      <Box
        sx={{
          ...ColFlex,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          //   flex: 3.5,
          width: "35%",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "15px",
          p: "15px",
          gap: "20px",
        }}
      >
        {/* L-1 */}
        <Box
          sx={{ ...RowFlex, width: "100%", justifyContent: "space-between" }}
        >
          <Box
            sx={{ width: "100px", aspectRatio: 2.6863 }}
            component={"img"}
            src={
              routeState?.typeOfRoute === "pickup"
                ? "/images/pickup-dark.png"
                : "/images/drop-dark.png"
            }
          />
          <Typography variant="body2" fontWeight={600} color={"GrayText"}>
            Shift time -{" "}
            <span
              style={{ fontWeight: 600, fontSize: "1.75rem", color: "#212A3B" }}
            >
              {routeState?.shiftTime !== undefined &&
                ConvertTo12HourFormat(routeState?.shiftTime)}
            </span>
          </Typography>
        </Box>
        {/* L -2 */}
        <Box sx={{ ...ColFlex, width: "100%", gap: "10px" }}>
          <TextField
            variant="outlined"
            size="small"
            value={searchField}
            onChange={SearchEmployees}
            placeholder="Search Employees"
            InputProps={{
              startAdornment: (
                <IconButton aria-label="search">
                  <Search />
                </IconButton>
              ),
              style: {},
            }}
            fullWidth
          />
          {/* filter and clear */}
          <Box
            sx={{
              ...RowFlex,
              width: "100%",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Button
              sx={{
                width: "40%",
                fontWeight: 600,
                ml: "auto",
                backgroundColor: "text.primary",
                color: "white",
              }}
              onClick={() => setSearchField("")}
              color="primary"
              variant="contained"
              endIcon={<Cancel />}
            >
              Clear
            </Button>
            <FormControl fullWidth>
              <InputLabel
                sx={{ lineHeight: "10px", fontSize: "0.8rem" }}
                id="department-label"
              >
                Department
              </InputLabel>
              <Select
                size="small"
                labelId="department-label"
                id="department-select"
                value={department}
                onChange={handleChangeDepartment}
                label="Department"
              >
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"PD"}>PD</MenuItem>
                <MenuItem value={"BD"}>BD</MenuItem>
                <MenuItem value={"SES2"}>SES2</MenuItem>
                <MenuItem value={"HR"}>HR</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* L -3 */}
        <Box sx={{ ...ColFlex, width: "100%", gap: "10px", maxHeight: "30%" }}>
          {filteredEmployees.length >= 1 &&
            searchField?.length > 0 &&
            filteredEmployees.slice(0, 4).map((employee) => {
              return (
                <Box sx={{ ...RowFlex, width: "100%" }}>
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
                        {employee.fName + " " + employee.lName}
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
                        {employee.address}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ...RowFlex, width: "20%" }}>
                    <Add
                      sx={{
                        backgroundColor: "primary.main",
                        borderRadius: "100px",
                        p: 0.5,
                        width: "40px",
                        height: "40px",
                        color: "white",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
        </Box>
        {/* L -4 */}
        <Box
          sx={{
            ...ColFlex,
            width: "100%",
            gap: "10px",
            marginTop: "auto",
            border: "2px solid #212A3B",
            p: "5px",
            borderRadius: "15px",
          }}
        >
          {/* EMP */}
          <Box
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
                <Typography variant="body1">name</Typography>
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
                  address
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...RowFlex, width: "20%" }}>
              <Add
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "100px",
                  p: 0.5,
                  width: "40px",
                  height: "40px",
                  color: "white",
                }}
              />
            </Box>
          </Box>
          {/* EMP */}
          <Box
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
                <Typography variant="body1">name</Typography>
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
                  address
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...RowFlex, width: "20%" }}>
              <Add
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "100px",
                  p: 0.5,
                  width: "40px",
                  height: "40px",
                  color: "white",
                }}
              />
            </Box>
          </Box>
          {/* EMP */}
          <Box
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
                <Typography variant="body1">name</Typography>
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
                  address
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...RowFlex, width: "20%" }}>
              <Add
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "100px",
                  p: 0.5,
                  width: "40px",
                  height: "40px",
                  color: "white",
                }}
              />
            </Box>
          </Box>
          {/* EMP */}
          <Box
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
                <Typography variant="body1">name</Typography>
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
                  address
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...RowFlex, width: "20%" }}>
              <Add
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "100px",
                  p: 0.5,
                  width: "40px",
                  height: "40px",
                  color: "white",
                }}
              />
            </Box>
          </Box>
          {/* EMP */}
          <Box
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
                <Typography variant="body1">name</Typography>
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
                  address
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...RowFlex, width: "20%" }}>
              <Add
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "100px",
                  p: 0.5,
                  width: "40px",
                  height: "40px",
                  color: "white",
                }}
              />
            </Box>
          </Box>
          {/* EMP */}
          <Box
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
                <Typography variant="body1">name</Typography>
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
                  address
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...RowFlex, width: "20%" }}>
              <Add
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "100px",
                  p: 0.5,
                  width: "40px",
                  height: "40px",
                  color: "white",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* RS */}
      <Box
        sx={{
          ...ColFlex,
          //   flex: 6.5,
          width: "65%",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <MapComponent height="100%" />
      </Box>
    </Box>
  );
}

export default AddPassengers;
