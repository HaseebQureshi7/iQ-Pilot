const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController.js");

// Attendance routes
router.route("/").post(controller.createAttendance);

router
  .get("/employees", controller.getAllEmployees)
  .get("/present-employees", controller.getPresentEmployees)
  .get("/absent-employees", controller.getAbsentEmployees);

module.exports = router;
