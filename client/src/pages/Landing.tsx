import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../animations/transitions";
import useAxios from "../api/useAxios";
import SnackbarContext from "../context/SnackbarContext";
import UserDataContext from "../context/UserDataContext";
import { SnackBarContextTypes } from "../types/SnackbarTypes";
import { UserTypes } from "../types/UserTypes";
import { ColFlex, PageFlex } from "./../style_extensions/Flex";

type UserContextTypes = {
  userData?: UserTypes;
  setUserData?: (userData: UserTypes) => void | any;
};

function Landing() {
  const [screenClicked, setScreenClicked] = useState(false);

  const navigate = useNavigate();
  const { setOpenSnack }: SnackBarContextTypes = useContext(SnackbarContext);
  const { setUserData }: UserContextTypes = useContext(UserDataContext);

  const loginMF = (loginData: any) => {
    return useAxios.post("auth/login", loginData);
  };

  const { mutate: loginUser, status } = useMutation({
    mutationFn: loginMF,
    onSuccess: (data: any) => {
      setOpenSnack({
        open: true,
        message: data.data.message,
        severity: "success",
      });
      const user: UserTypes = data.data.user;
      setUserData?.(data.data.user);
      navigate(`/${user?.role}`);
    },
    onError: (err) => {
      setOpenSnack({
        open: true,
        message: err.message,
        severity: "warning",
      });
    },
  });

  function HandleLogin(e: FormEvent) {
    e.preventDefault();
    const currentTarget = e.currentTarget as HTMLFormElement;
    const loginData: any = {
      email: currentTarget.email.value,
      password: currentTarget.password.value,
    };
    loginUser(loginData);
  }

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      setScreenClicked(!screenClicked);
      return clearTimeout(timeout);
    }, 1.5 * 1000);
  }, []);

  return (
    <Box sx={{ ...PageFlex, overflow: "hidden" }}>
      <Box
        onClick={() => setScreenClicked(!screenClicked)}
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
          transition: "all 1s cubic-bezier(0.45, 0, 0.1, 1)",
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
          transition: "all 1s cubic-bezier(0.45, 0, 0.1, 1)",
          //   transitionTimingFunction:"cubic-bezier(0.42, 0, 0.58, 1)",
          backgroundColor: "primary.main",
        }}
      />
      {/* FORM */}
      {screenClicked && (
        <FadeIn delay={0.5} duration={0.75}>
          <Box
            component={"form"}
            sx={{
              ...ColFlex,
              gap: "30px",
              width: "100%",
              px: "15%",
              pt: { xs: "40%", md: "30%", lg: "10%" },
              display: screenClicked ? "flex" : "none",
              marginTop: "50px",
            }}
            onSubmit={HandleLogin}
          >
            {/* HEADER */}
            <Box sx={{ ...ColFlex }}>
              <Typography variant="h4" fontWeight={500}>
                LOGIN
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
              sx={{ width: "75%", fontWeight: 600 }}
              disabled={status === "pending"}
              type="submit"
              color="primary"
              variant="contained"
            >
              LOGIN
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
              SIGNUP
            </Button>
          </Box>
        </FadeIn>
      )}
    </Box>
  );
}

export default Landing;
