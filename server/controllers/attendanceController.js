const Attendance = require("../models/attendanceModel");

exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.send(attendances);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateAttendance = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["ofEmployee", "ofRoute", "isPresent", "Driver"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!attendance) {
      return res.status(404).send();
    }

    res.send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).send();
    }

    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};
