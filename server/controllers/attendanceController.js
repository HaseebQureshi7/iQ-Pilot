const Attendance = require("../models/attendanceModel.js");
const { catchAsync } = require("../util/catchAsync.js");
const AppError = require("../util/AppError.js");

// Creating attendance
const createAttendance = catchAsync(async (req, res) => {
  const attendanceData = req.body;
  const attendance = await Attendance.create(attendanceData);
  res.status(201).json({ attendance, message: "success" });
  return next(new AppError("Error creating  employees", 500));
});

// Getting all employees
const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await Attendance.find().populate();
  res.json(employees);
  if (!employees) return next(new AppError("No employees found", 404));
});

// Getting present employees
const getPresentEmployees = catchAsync(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const presentEmployees = await Attendance.find({
    isPresent: true,
    createdAt: { $gte: today },
  })
    .populate()
    .exec();

  if (!presentEmployees || presentEmployees.length === 0) {
    return next(new AppError("No present employees found for today", 404));
  }
  res.status(200).json({ presentEmployees, message: "success" });
});

// Getting absent employees
const getAbsentEmployees = catchAsync(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const absentEmployees = await Attendance.find({
    isPresent: false,
    createdAt: { $gte: today },
  })
    .populate()
    .exec();

  if (!absentEmployees || absentEmployees.length === 0) {
    return next(new AppError("No absent employees found for today", 404));
  }

  res.status(200).json({ absentEmployees, message: "success" });
});

module.exports = {
  createAttendance,
  getAllEmployees,
  getPresentEmployees,
  getAbsentEmployees,
};
