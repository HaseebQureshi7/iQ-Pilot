const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const AppError = require("./util/AppError.js");
const globalErrorMiddleware = require("./controllers/errorController.js");
const userRouter = require("./routes/userRoutes.js");
const routeRouter = require("./routes/routeRoutes.js");
const updateRouter = require("./routes/updateRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const attendanceRoutes = require("./routes/attendanceRoutes");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  // Set no-cache headers for all responses
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});
app.use(express.static(path.resolve(__dirname, "static/profilePictures")));
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    credentials: true,
    exposedHeaders: "Set-Cookie",
    origin: ["http://localhost:5173", "https://ipilot.vercel.app"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/route", routeRouter);
app.use("/api/v1/update", updateRouter);
app.use("/api/v1/attendance", attendanceRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `This request to page ${req.originalUrl} does'nt exist`,
    404
  );
  next(err);
});

app.use(globalErrorMiddleware);

module.exports = app;
