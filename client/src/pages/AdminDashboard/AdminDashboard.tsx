import { Box, Typography } from "@mui/material";
import { ColFlex, RowFlex } from "./../../style_extensions/Flex";
import MapComponent from "../../components/Map";

function AdminDashboard() {
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
            justifyContent:"flex-start",
            marginLeft:"50px"
          }}
        >
          <Box sx={{ ...ColFlex, alignItems: "flex-start" }}>
            <Typography variant="h4" fontWeight={700}>Today's Plan</Typography>
            <Typography fontWeight={600} color={"GrayText"} variant="body1">
              It’s Tuesday, 19th of March - 2024
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
              7
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
              16
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
              237
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
              TMs Roastered
            </Typography>
          </Box>
          <Box sx={{ ...ColFlex }}>
            <Typography sx={{ fontWeight: 600 }} variant="h4">
              44
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
