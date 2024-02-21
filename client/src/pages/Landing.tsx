import { Box, Button, TextField, Typography } from "@mui/material";
import { ColFlex, PageFlex } from "./../style_extensions/Flex";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [screenClicked, setScreenClicked] = useState(false);

  const navigate = useNavigate()

  function HandleLogin(e: FormEvent) {
    e.preventDefault();
    const currentTarget = e.currentTarget as HTMLFormElement;
    const loginData: any = {
      email: currentTarget.email.value,
      password: currentTarget.password.value,
    };

    console.log(loginData);
  }

  return (
    <Box sx={{ ...PageFlex }}>
      <Box
        sx={{
          width: screenClicked ? "65px" : "50px",
          aspectRatio: 1,
          position: "absolute",
          transformOrigin: "center center",
          zIndex: 999,
          top: screenClicked ? "15%" : "50%",
          left: "50%",
          transform: "translate(-50%)",
          rotate: screenClicked ? "45deg" : "0deg",
          transition: "all 1s ease-out",
        }}
        component={"img"}
        src={screenClicked ? "/images/logo-blue.png" : "/images/logo.png"}
      />
      <Box
        onClick={() => setScreenClicked(!screenClicked)}
        className="blue-box"
        sx={{
          ...ColFlex,
          width: "100vw",
          height: !screenClicked ? "100vh" : "0vh",
          transition: "all 1s ease-out",
          backgroundColor: "primary.main",
        }}
      />
      {/* FORM */}
      <Box
        component={"form"}
        sx={{
          ...ColFlex,
          gap: "30px",
          width: "100%",
          px: "15%",
          pt:{xs:"40%",md:"30%",lg:"10%"},
          display: screenClicked ? "flex" : "none",
          marginTop: "50px",
        }}
        onSubmit={HandleLogin}
      >
        {/* HEADER */}
        <Box sx={{ ...ColFlex }}>
          <Typography variant="h4" fontWeight={600}>
            LOGIN
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Hey there 👋, Welcome back.
          </Typography>
        </Box>
        <TextField
          required
          fullWidth
          name="email"
          label="email"
          type="email"
          placeholder="Enter your email"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="password"
          type="password"
          placeholder="Enter your password"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          sx={{ width: "75%" }}
          type="submit"
          color="primary"
          variant="contained"
        >
          Login
        </Button>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          OR
        </Typography>
        <Button
          sx={{ width: "75%" }}
          color="secondary"
          variant="outlined"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
}

export default Landing;
