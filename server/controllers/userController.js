const User = require("../models/userModel.js");
const { catchAsync } = require("../util/catchAsync.js");

exports.getAllUsers = catchAsync(async function (req, res) {
  const users = await User.find({});
  if (!users) {
    return res.status(404).json({ msg: "No users found!" });
  }
  res
    .status(200)
    .json({ msg: "All Users Found", results: users.length, users });
});

exports.getUser = async function (req, res) {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    return res.status(404).json({ msg: "No user found!" });
  }
  res.status(200).json({ msg: "User Found", user });
};

exports.deleteUser = async function (req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  res.status(204).json({ msg: "User Deleted!" });
};

exports.updateUser = async function (req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({ msg: "No user found!" });
  }
  res.status(200).json({ msg: "User Updated!", user });
};
