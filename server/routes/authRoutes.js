const express = require("express");
const {
  signUp,
  login,
  validateToken,
} = require("../controllers/authController");
const { upload } = require("../middleware/imageProcessing");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);

router.route("/validate-token").post(validateToken);

module.exports = router;
