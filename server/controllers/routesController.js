const Route = require("../models/routeModel");
const { catchAsync } = require("../util/catchAsync.js");

exports.getRoute = async function (req, res, next) {
  const { id } = req.params;
  const route = await Route.findById({ _id: id });
  res.status(200).json({ message: "Routes Found", route });
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

exports.updateRoute = async function (req, res, next) {
  const { id } = req.params;
  const user = await Route.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({ msg: "No user found!" });
  }
  res.status(200).json({ msg: "User Updated!", user });
};

exports.deleteRoute = catchAsync(async function (req, res, next) {
  const { id } = req.params;
  await Route.findByIdAndDelete({ _id: id });
  res.status(204).json({ message: "Route Deleted!" });
});

exports.getAllRoutes = catchAsync(async function (req, res, next) {
  const allRoutes = await Route.find({});
  res.status(200).json({
    message: "All Routes Found",
    count: allRoutes.length,
    allRoutes,
  });
});
