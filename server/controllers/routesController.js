const Route = require("../models/routeModel");
const User = require("../models/userModel.js");
const AppError = require("../util/AppError.js");
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

exports.getAllNonActiveRoutes = catchAsync(async function (req, res, next) {
  const nonActiveroutes = await Route.find({ routeStatus: "notStarted" });
  res.status(200).json({
    message: "All Non Active Routes Found",
    count: nonActiveroutes.length,
    nonActiveroutes,
  });
});

exports.getRosteredPassenger = catchAsync(async function (req, res, next) {
  const aggregateData = await Route.aggregate([
    {
      $unwind: "$passengers",
    },
    {
      $group: {
        _id: "$passengers",
      },
    },
  ]);

  const passengersIDS = aggregateData.map((passenger) => passenger._id);

  const passengers = await User.find({ _id: { $in: passengersIDS } }).select(
    "-cabDetails"
  );
  res.status(200).json({
    message: "Passenger Roastered!",
    totalRoastered: passengers.length,
    roasterd: passengers,
  });
});

exports.pendingPassengers = catchAsync(async function (req, res, next) {
  const aggregateData = await Route.aggregate([
    {
      $unwind: "$passengers",
    },
    {
      $group: {
        _id: "$passengers",
      },
    },
  ]);

  const passengersIDS = aggregateData.map((passenger) => passenger._id);

  const pendingPassengers = await User.find({
    _id: { $nin: passengersIDS },
    role: { $eq: "employee" },
  }).select("-cabDetails");
  res.status(200).json({
    message: "Pending Passengers!",
    totalNonRoastered: pendingPassengers.length,
    pendingPassengers,
  });
});

exports.getRouteByDriver = catchAsync(async function (req, res, next) {
  const { did } = req.params;
  const routes = await Route.find({ driver: did });
  if (!routes)
    return next(new AppError("No routes assigned to the driver"), 404);
  res.status(200).json({ message: "Routes Found!", routes });
});

// exports.getEmployeeRoute = catchAsync(async function (req, res, next) {
//   const { eid } = req.params;
//   const routes = await Route.find({ routeStatus: "notStarted",{$in:{}} });
//   if (!routes)
//     return next(new AppError("No routes assigned to the driver"), 404);
//   res.status(200).json({ message: "Routes Found!", routes });
// });
