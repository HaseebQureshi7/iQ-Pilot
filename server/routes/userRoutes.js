const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  getAllEmployees,
  getAllDrivers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/employees").get(getAllEmployees);
router.route("/drivers").get(getAllDrivers);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
