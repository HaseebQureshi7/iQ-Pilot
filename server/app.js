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

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
