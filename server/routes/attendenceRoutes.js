const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");

router
  .route("/")
  .post(controller.createAttendance)
  .get(controller.getAllAttendances);

router
  .route("/:id")
  .get(controller.getAttendanceById)
  .patch(controller.updateAttendance)
  .delete(controller.deleteAttendance);

module.exports = router;
