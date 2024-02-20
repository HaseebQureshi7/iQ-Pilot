const User = require("../models/userModel.js");

exports.getAllUsers = async function (req, res) {
  res.status(200).json({ msg: "This route defined!!" });
};

exports.getUser = async function (req, res) {
  res.status(200).json({ msg: "This route defined!!" });
};

exports.deleteUser = async function (req, res) {
  res.status(200).json({ msg: "This route defined!!" });
};

exports.updateUser = async function (req, res) {
  res.status(200).json({ msg: "This route defined!!" });
};
