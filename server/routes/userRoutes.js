const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
