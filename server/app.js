const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const AppError = require("./util/AppError.js");
const globalErrorMiddleware = require("./controllers/errorController.js");
const userRouter = require("./routes/userRoutes.js");
const routeRouter = require("./routes/routeRoutes.js");
const attendenceRouter = require("./routes/attendenceRoutes.js");
const updateRouter = require("./routes/updateRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/route", routeRouter);
app.use("/api/v1/attendence", attendenceRouter);
app.use("/api/v1/update", updateRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `This request to page ${req.originalUrl} does'nt exist`,
    404
  );
  next(err);
});

app.use(globalErrorMiddleware);

module.exports = app;
