const Route = require("../models/routeModel");
const { catchAsync } = require("../util/catchAsync.js");

exports.getRoute = async function (req, res, next) {
  res.status(200).json({ msg: "This route defined!!" });
};

exports.createRoute = catchAsync(async function (req, res, next) {
  const { driver, passengers, shiftTime, typeOfRoute } = req.body;
  const newRoute = await Route.create({
    driver,
    passengers,
    shiftTime,
    typeOfRoute,
  });
  res
    .status(201)
    .json({ status: "Success", message: "Route Created!", newRoute });
});

exports.deleteRoute = catchAsync(async function (req, res, next) {
  res.status(200).json({ msg: "This route defined!!" });
});

exports.updateRoute = catchAsync(async function (req, res, next) {
  res.status(200).json({ msg: "This route defined!!" });
});

exports.getAllRoutes = catchAsync(async function (req, res, next) {
  const allRoutes = await Route.find({});
  res.status(200).json({
    status: "Success",
    results: allRoutes.length,
    data: { allRoutes },
  });
});
