const User = require("../models/userModel.js");
const AppError = require("../util/AppError.js");
const { catchAsync } = require("../util/catchAsync.js");

exports.getAllUsers = catchAsync(async function (req, res) {
  const users = await User.find({});
  if (!users) {
    return res.status(404).json({ message: "No users found!" });
  }
  res
    .status(200)
    .json({ message: "All Users Found", count: users.length, users });
});

exports.getUser = catchAsync(async function (req, res) {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "No user found!" });
  }
  res.status(200).json({ message: "User Found", user });
});

exports.deleteUser = catchAsync(async function (req, res) {
  const { id } = req.params;
  await User.findByIdAndDelete({ _id: id });
  res.status(204).json({ message: "User Deleted!" });
});

exports.updateUser = catchAsync(async function (req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({ message: "No user found!" });
  }
  res.status(200).json({ message: "User Updated!", user });
});

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await User.find({ role: "employee" });

  if (!employees) {
    return next(new AppError("No Employees Found", 404));
  }

  res.status(200).json({
    messages: "Employees Found",
    count: employees.length,
    employees,
  });
});

exports.getAllDrivers = catchAsync(async (req, res) => {
  const drivers = await User.find({ role: "driver" });

  if (!drivers) {
    return next(new AppError("No drivers Found", 404));
  }

  res.status(200).json({
    messages: "Drivers Found",
    count: drivers.length,
    drivers,
  });
});
