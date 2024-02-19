const express = require("express");
const dotenv = require("dotenv").config;
const cors = require("cors")

const userRouter = require("./routes/userRoutes.js");
const routeRouter = require("./routes/routeRoutes.js");
const attendenceRouter = require("./routes/attendenceRoutes.js");
const updateRouter = require("./routes/updateRoutes.js");



const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/users", userRouter);
app.use("/api/v1/route", routeRouter);
app.use("/api/v1/attendence", attendenceRouter);
app.use("/api/v1/update", updateRouter);

module.exports = app;
